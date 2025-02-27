import { _decorator, Component, instantiate, Node, Prefab, Rect, Sprite, UITransform, Vec2, Vec3 } from 'cc';
import { GridSquare } from './GridSquare';
import { GameEvents, CHECK_IF_SHAPE_CAN_BE_PLACED, MOVE_SHAPE_TO_START_POSITION, REQUEST_NEW_SHAPES, SET_SHAPE_INACTIVE, triggerAddScore, GAME_OVER, triggerGameOver } from './GameEvents';
import { ShapeStorage } from './ShapeStorage';
import { Shape } from './Shape';
import { LineIndicator } from './LineIndicator';

const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {
    @property(ShapeStorage)
    shapeStorage: ShapeStorage;
    @property
    columns: number = 8;
    @property
    rows: number = 8;

    @property(Prefab)
    gridSquare: Prefab = null;

    @property
    startPosition: Vec2 = new Vec2(0, 0);
    @property
    squareScale: number = 0.5;

    private offset: Vec2 = new Vec2(0, 0);
    private gridSquares: GridSquare[] = [];
    private lineIndicator: LineIndicator;

    onEnable() {
        GameEvents.on(CHECK_IF_SHAPE_CAN_BE_PLACED, this.onCheckIfShapeCanBePlaced, this);
    }
    onDisable(){
        GameEvents.off(CHECK_IF_SHAPE_CAN_BE_PLACED, this.onCheckIfShapeCanBePlaced, this);
    }
    start(){
        this.CreateGrid();
        this.lineIndicator = this.getComponent(LineIndicator);
        console.log(this.lineIndicator);
    }

    CreateGrid(){
        this.SpawnGridSquares();
        this.SetGridSquarePosition();
    }

    SpawnGridSquares(){
        let squareIndex: number = 0;
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col <this.columns; col++){
                this.gridSquares.push(instantiate(this.gridSquare).getComponent(GridSquare));
                this.gridSquares[this.gridSquares.length - 1].node.setParent(this.node);
                this.gridSquares[this.gridSquares.length -1].node.scale = new Vec3(this.squareScale, this.squareScale, this.squareScale);
                this.gridSquares[this.gridSquares.length - 1].SquareIndex = squareIndex;
                squareIndex++;
            }
        }

    }
    SetGridSquarePosition(){
        let column_number: number = 0;
        let row_number: number = 0;

        let square = this.gridSquares[0].node.getComponent(UITransform);
        this.offset.x = square.width * this.gridSquares[0].node.scale.x;
        this.offset.y = square.height * this.gridSquares[0].node.scale.y;
        this.gridSquares.forEach(square => {
            if(column_number + 1 > this.columns){
                column_number = 0;
                row_number++;
            }
            let pos_x_offset = this.offset.x * column_number;
            let pos_y_offset = this.offset.y * row_number;

            square.node.getComponent(UITransform).anchorX = this.startPosition.x + pos_x_offset;
            square.node.getComponent(UITransform).anchorX = this.startPosition.y - pos_y_offset;
            square.node.position = new Vec3(this.startPosition.x + pos_x_offset, this.startPosition.y - pos_y_offset, 0);
            column_number++;
        });

    }

    onCheckIfShapeCanBePlaced(){
        let squareIndexes: number[] = [];
        this.gridSquares.forEach(square => {
            let gridSquare = square;
            if(gridSquare.Selected && !gridSquare.SquareOccupied){
                squareIndexes.push(gridSquare.SquareIndex);
                gridSquare.Selected = false;
                //gridSquare.ActivateSquare();
            }
        });

        let currentSelectedShape: Shape = this.shapeStorage.GetCurrentSelectedShape();
        if(currentSelectedShape == null) return;

        if(currentSelectedShape.TotalSquareNumber == squareIndexes.length){
            squareIndexes.forEach(squareIndex => {
                this.gridSquares[squareIndex].PlaceShapeOnBoard(currentSelectedShape.squareShapeImage.getComponent(Sprite).spriteFrame);
            });

            let shapeLeft: number = 0;
            this.shapeStorage.shapeList.forEach(shape => {
                if(shape.IsAnyOfShapeSquareActive() && shape.IsOnStartPosition()){
                    shapeLeft++;
                }
            });
            if(shapeLeft == 0){
                GameEvents.emit(REQUEST_NEW_SHAPES);
            }else{
                GameEvents.emit(SET_SHAPE_INACTIVE);
            }
            this.CheckIfAnyLineIsCompleted();
        } else{
            GameEvents.emit(MOVE_SHAPE_TO_START_POSITION);
        }
    }
    CheckIfAnyLineIsCompleted(){
        let lines: number[][] = [];
        this.lineIndicator.column_indexes.forEach(column => {
            lines.push(this.lineIndicator.GetVerticalLines(column));
        });
        for(let row = 0; row < 8; row++){
            let data: number[] = [];
            for(let col = 0; col < 8; col++){
                data.push(this.lineIndicator.line_data[row][col]);
            }
            lines.push(data);
        }
        let completedLines: number = this.CheckIfSquareAreCompleted(lines);
 
        let totalScore: number = 10 * completedLines;
        triggerAddScore(totalScore);
        this.CheckIsPlayerLost();
    }
    CheckIfSquareAreCompleted(data: number[][]): number{
        let completedLines: number[][] = [];
        let linesCompleted = 0;

        data.forEach(line => {
            let lineCompleted = true;
            line.forEach(squareIndex => {
                let comp = this.gridSquares[squareIndex].getComponent(GridSquare);
                if(comp.SquareOccupied == false){
                    lineCompleted = false;
                }
            });
            if(lineCompleted){
                completedLines.push(line);
            }
        });
        completedLines.forEach(line => {
            let completed = false;
            line.forEach(squareIndex => {
                let comp:GridSquare = this.gridSquares[squareIndex];
                comp.Deactivate();
                completed = true;
            });
            line.forEach(squareIndex => {
                let comp:GridSquare = this.gridSquares[squareIndex];
                comp.ClearOccupied();
            });
            if(completed){
                linesCompleted++;
            }
        });
        return linesCompleted;
    }
    private CheckIsPlayerLost(){
        let validShapes: number = 0;

        for(let index = 0; index < this.shapeStorage.shapeList.length; index++){
            let isShapeActive: boolean = this.shapeStorage.shapeList[index].IsAnyOfShapeSquareActive();
            if(this.CheckIfShapeCanBePlacedOnGrid(this.shapeStorage.shapeList[index]) && isShapeActive){
                this.shapeStorage.shapeList[index]?.ActivateShape();
                validShapes++;
            }
        }
        if(validShapes == 0){
            triggerGameOver(false);
            console.log("GAME OVER");
        }
    }
    private CheckIfShapeCanBePlacedOnGrid(currentShape: Shape): boolean{
        let currentShapeData = currentShape.shapeData;
        let shapeColumns: number = currentShapeData.columns;
        let shapeRows: number = currentShapeData.rows;
       // console.log(shapeColumns + " " + shapeRows);

        let originalShapeFilledUpSquares: number[] = [];
        let squareIndex: number = 0;

        for(let rowIndex = 0; rowIndex < shapeRows; rowIndex++){
            for(let columnIndex = 0; columnIndex < shapeColumns; columnIndex++){
                //console.log(currentShapeData.board);
                if(currentShapeData.board[rowIndex].column[columnIndex]){
                    originalShapeFilledUpSquares.push(squareIndex);
                }
                squareIndex++;
            }
        }
        //console.log(currentShape.TotalSquareNumber);
       // console.log(originalShapeFilledUpSquares.length);
        if(currentShape.TotalSquareNumber != originalShapeFilledUpSquares.length){
            console.error("Number of filled up squares are not the same at the original shape have");
        }

        let squareList = this.GetAllSquareCombination(shapeColumns, shapeRows);
        let canBePlaced:boolean = false;

        squareList.forEach(number => {
            let shapeCanBePlacedOnBoard: boolean = true;
            originalShapeFilledUpSquares.forEach(squareIndexToCheck => {
                let comp = this.gridSquares[number[squareIndexToCheck]].getComponent(GridSquare);
                if(comp.SquareOccupied){
                    shapeCanBePlacedOnBoard = false;
                }
            });
            if(shapeCanBePlacedOnBoard){
                canBePlaced = true;
            }
        });
        return canBePlaced; 
    }

    GetAllSquareCombination(columns: number, rows: number): number[][]{
        let squareList: number[][] = [];
        let lastColumnIndex: number = 0;
        let lastRowIndex: number = 0;

        let safeIndex = 0;

        while(lastRowIndex + (rows - 1) < 8){
            let rowData: number[] = [];
            for(let row = lastRowIndex; row < lastRowIndex + rows; row++){
                for(let column = lastColumnIndex; column < lastColumnIndex + columns; column++){
                    rowData.push(this.lineIndicator.line_data[row][column]);
                }
            }
            squareList.push(rowData);
            lastColumnIndex++;
            if(lastColumnIndex + (columns - 1) >= 8){
                lastRowIndex++;
                lastColumnIndex = 0;
            }
            safeIndex++;
            if(safeIndex > 100){
                break;
            }
        }
        return squareList;
    }


}


