import { _decorator, Component, instantiate, Node, Prefab, Sprite, UITransform, Vec2, Vec3 } from 'cc';
import { ShapeData } from './ShapeData';
const { ccclass, property } = _decorator;

@ccclass('Shape')
export class Shape extends Component {
    @property(Prefab)
    prefabSquareShapeImage: Prefab = null;
    @property(Prefab)
    prefabShapeData: Prefab = null;

    private squareShapeImage: Node = null;
    private shapeData: ShapeData = null;
    private currentShape: Node[] = [];

    start(){
        this.squareShapeImage = instantiate(this.prefabSquareShapeImage);
        this.shapeData = instantiate(this.prefabShapeData).getComponent(ShapeData);
        this.RequestNewShape(this.shapeData);
    }

    RequestNewShape(shapeData: ShapeData){
        this.CreateShape(shapeData);
    }

    CreateShape(shapeData: ShapeData){
        this.shapeData = shapeData;
        let totalSquareNumber: number = this.getNumberOfSquares(shapeData);
        while(this.currentShape.length < totalSquareNumber){
            this.currentShape.push(instantiate(this.squareShapeImage) as Node);
            this.currentShape[this.currentShape.length - 1].setParent(this.node);
        }
        
        this.currentShape.forEach(square => {
            square.position = new Vec3(0, 0, 0);
        });
        let squareUI = this.squareShapeImage.getComponent(UITransform);
        let moveDistance = new Vec2(squareUI.width * this.squareShapeImage.scale.x, squareUI.height * this.squareShapeImage.scale.y);
        
        let currentIndexInList: number = 0;
        for(let row = 0; row < shapeData.rows; row++){
            for(let col = 0; col < shapeData.columns; col++){
                if(shapeData.board[row].column[col]){
                    console.log("true");
                    this.currentShape[currentIndexInList].position = new Vec3(this.getXPositionForShapeSquare(shapeData, col, moveDistance), this.getYPositionForShapeSquare(shapeData, row, moveDistance), 0);
                    
                    currentIndexInList++;
                }
            }
        }
        
    }
    getNumberOfSquares(shapeData: ShapeData){
        let num: number = 0;
        shapeData.board.forEach(data => {
            data.column.forEach(active => {
                if(active){
                    num++;
                }
            });
        });
        return num;
    }

    getYPositionForShapeSquare(shapeData: ShapeData, row: number, moveDistance: Vec2){
        let shiftOnY: number = 0;
        if(shapeData.rows > 1){
            if(shapeData.rows % 2 != 0){
                let middleSquareIndex = (shapeData.rows - 1) / 2;
                let multiplier = (shapeData.rows - 1) / 2;
                if(row < middleSquareIndex){
                    shiftOnY = moveDistance.y * 1;
                    shiftOnY *= multiplier;
                } else{
                    if(row > middleSquareIndex){
                        shiftOnY = moveDistance.y * -1;
                        shiftOnY *= multiplier;
                    }
                }
            } else{
                let middleSquareIndex2 = (shapeData.rows == 2) ? 1 : (shapeData.rows / 2);
                let middleSquareIndex1 = (shapeData.rows == 2) ? 0 : shapeData.rows - 1;
                let multiplier = shapeData.rows / 2;
                if(row == middleSquareIndex2 || row == middleSquareIndex1){
                    if(row == middleSquareIndex2){
                        shiftOnY = (moveDistance.y / 2) * -1;
                    }
                    if(row == middleSquareIndex1){
                        shiftOnY = moveDistance.y / 2;
                    }
                }
                if(row < middleSquareIndex2 && row < middleSquareIndex1){
                    shiftOnY = moveDistance.y * 1;
                    shiftOnY *= multiplier;
                } else{
                    if(row > middleSquareIndex1 && row > middleSquareIndex2){
                        shiftOnY = moveDistance.y * -1;
                        shiftOnY *= multiplier;
                    }
                }
            }
        }
        return shiftOnY;
    }

    getXPositionForShapeSquare(shapeData: ShapeData, column: number, moveDistance: Vec2){
        let shiftOnX: number = 0.0;
        if(shapeData.columns > 1){
            if(shapeData.columns % 2 != 0){
                let middleSquareIndex = (shapeData.columns - 1) / 2;
                let multiplier = (shapeData.columns - 1) / 2;
                if(column < middleSquareIndex){
                    shiftOnX = moveDistance.x * -1;
                    shiftOnX *= multiplier;
                }else{
                    if(column > middleSquareIndex){
                        shiftOnX = moveDistance.x*1;
                        shiftOnX *= multiplier;
                    }
                }

            }else{
                let middleSquareIndex2 = (shapeData.columns == 2) ? 1 : (shapeData.columns / 2);
                let middleSquareIndex1 = (shapeData.columns == 2) ? 0 : shapeData.columns - 1;
                let multiplier = shapeData.columns / 2;

                if(column == middleSquareIndex1 || column == middleSquareIndex2){
                    if(column == middleSquareIndex2){
                        shiftOnX = moveDistance.x / 2;
                    }
                    if(column == middleSquareIndex1){
                        shiftOnX = (moveDistance.x / 2) * -1;
                    }
                }
                if(column < middleSquareIndex1 && column < middleSquareIndex2){
                    shiftOnX = moveDistance.x * -1;
                    shiftOnX *= multiplier;
                } else{
                    if(column > middleSquareIndex1 && column > middleSquareIndex2){
                        shiftOnX = moveDistance.x * 1;
                        shiftOnX *= multiplier;
                    }
                }
            }
        }
        return shiftOnX;
    }
}


