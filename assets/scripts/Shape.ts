import { _decorator, Canvas, Component, EventMouse, EventTouch, instantiate, Node, Prefab, Sprite, UITransform, Vec2, Vec3 } from 'cc';
import { ShapeData } from './ShapeData';
const { ccclass, property } = _decorator;

@ccclass('Shape')
export class Shape extends Component {
    @property(Prefab)
    prefabSquareShapeImage: Prefab = null;
    @property(Vec3)
    shapeSelectedScale: Vec3 = null;



    private squareShapeImage: Node = null;
    private shapeData: ShapeData = null;
    private currentShape: Node[] = [];

    shapeStartScale: Vec2 = null;
    canvas: Canvas = null;
    shapeDraggable: Boolean = true;


    onLoad(){
        this.squareShapeImage = instantiate(this.prefabSquareShapeImage) as Node;
        this.shapeStartScale = this.node.scale.toVec2();
        console.log(this.shapeStartScale);
        this.canvas = this.node.getParent().getComponent(Canvas);
        this.shapeDraggable = true;

        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);

    }

    RequestNewShape(shapeData: ShapeData){
        this.CreateShape(shapeData);
    }



    CreateShape(shapeData: ShapeData){
        this.shapeData = shapeData;
        let totalSquareNumber: number = this.getNumberOfSquares(shapeData);
        while(this.currentShape.length < totalSquareNumber){
            this.currentShape.push(instantiate(this.squareShapeImage));
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
                    this.currentShape[currentIndexInList].position = new Vec3(this.getXPositionForShapeSquare(shapeData, col, moveDistance), this.getYPositionForShapeSquare(shapeData, row, moveDistance));
                    
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
        let shiftOnY: number = 0.0;
        if(shapeData.rows > 1){
            let startYPos: number;
            if(shapeData.rows % 2 != 0){
                startYPos = (shapeData.rows / 2)*moveDistance.y;
            }else{
                startYPos = ((shapeData.rows / 2) - 1) * moveDistance.y + moveDistance.y / 2;
            }
            shiftOnY = startYPos - row*moveDistance.y;
        }
        return shiftOnY;
    }

    getXPositionForShapeSquare(shapeData: ShapeData, column: number, moveDistance: Vec2){
        let shiftOnX: number = 0.0;
        if(shapeData.columns > 1){
            let startXPos: number;
            if(shapeData.columns % 2 != 0){
                startXPos = (shapeData.columns / 2) * moveDistance.x * -1;
            } else{
                startXPos = ((shapeData.columns / 2) - 1) * moveDistance.x / 2;
            }
            shiftOnX = startXPos + column * moveDistance.x;
        }
        return shiftOnX;
    }

    onTouchStart(event: EventTouch) {
        console.log("start");
        this.node.scale = this.shapeSelectedScale;
    }

    onTouchMove(event: EventTouch) {
        let pos: Vec2;
        let delta = event.getDelta();
        this.node.position = this.node.position.add(new Vec3(delta.x, delta.y, 0));
    }

    onTouchEnd(event: EventTouch) {
        console.log("end");
        console.log(this.node.scale);
        console.log(this.shapeStartScale);
        this.node.scale = new Vec3 (this.shapeStartScale.x, this.shapeStartScale.y, 1);
    }
}


