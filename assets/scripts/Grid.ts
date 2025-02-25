import { _decorator, Component, instantiate, Node, Prefab, Rect, UITransform, Vec2, Vec3 } from 'cc';
import { GridSquare } from './GridSquare';
import { GameEvents, CHECK_IF_SHAPE_CAN_BE_PLACED } from './GameEvents';
import { ShapeStorage } from './ShapeStorage';

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
    private gridSquares: Node[] = [];
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
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col <this.columns; col++){
                this.gridSquares.push(instantiate(this.gridSquare));
                this.gridSquares[this.gridSquares.length - 1].setParent(this.node);
                this.gridSquares[this.gridSquares.length -1].scale = new Vec3(this.squareScale, this.squareScale, this.squareScale);
            }
        }

    }
    SetGridSquarePosition(){
        let column_number: number = 0;
        let row_number: number = 0;

        let square = this.gridSquares[0].getComponent(UITransform);
        this.offset.x = square.width * this.gridSquares[0].scale.x;
        this.offset.y = square.height * this.gridSquares[0].scale.y;
        this.gridSquares.forEach(square => {
            if(column_number + 1 > this.columns){
                column_number = 0;
                row_number++;
            }
            let pos_x_offset = this.offset.x * column_number;
            let pos_y_offset = this.offset.y * row_number;

            square.getComponent(UITransform).anchorX = this.startPosition.x + pos_x_offset;
            square.getComponent(UITransform).anchorX = this.startPosition.y - pos_y_offset;
            square.position = new Vec3(this.startPosition.x + pos_x_offset, this.startPosition.y - pos_y_offset, 0);
            column_number++;
        });

    }

    onCheckIfShapeCanBePlaced(){
        this.gridSquares.forEach(square => {
            let gridSquare = square.getComponent(GridSquare);
            if(gridSquare.CanWeUseThisSquare()){
                gridSquare.ActivateSquare();
            }
        });
        this.shapeStorage.GetCurrentSelectedShape().DeactivateShape();
    }
}


