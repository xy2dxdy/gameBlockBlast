import { _decorator, Component, instantiate, Node, Prefab, Rect, UITransform, Vec2, Vec3 } from 'cc';
import { GridSquare } from './GridSquare';
import { GameEvents, CHECK_IF_SHAPE_CAN_BE_PLACED, MOVE_SHAPE_TO_START_POSITION, REQUEST_NEW_SHAPES, SET_SHAPE_INACTIVE } from './GameEvents';
import { ShapeStorage } from './ShapeStorage';
import { Shape } from './Shape';

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
    onEnable() {
        GameEvents.on(CHECK_IF_SHAPE_CAN_BE_PLACED, this.onCheckIfShapeCanBePlaced, this);
    }
    onDisable(){
        GameEvents.off(CHECK_IF_SHAPE_CAN_BE_PLACED, this.onCheckIfShapeCanBePlaced, this);
    }
    start(){
        this.CreateGrid();
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
                this.gridSquares[squareIndex].PlaceShapeOnBoard();
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
        } else{
            GameEvents.emit(MOVE_SHAPE_TO_START_POSITION);
        }
    }
}


