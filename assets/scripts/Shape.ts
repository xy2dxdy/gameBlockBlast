import { _decorator, Canvas, Collider2D, Component, EventMouse, EventTouch, instantiate, Node, Prefab, Sprite, UITransform, Vec2, Vec3 } from 'cc';
import { ShapeData } from './ShapeData';
import { GameEvents, CHECK_IF_SHAPE_CAN_BE_PLACED, MOVE_SHAPE_TO_START_POSITION } from './GameEvents';
import { ShapeSquare } from './ShapeSquare';
const { ccclass, property } = _decorator;

@ccclass('Shape')
export class Shape extends Component {
    @property(Prefab)
    prefabSquareShapeImage: Prefab = null;
    @property(Vec3)
    shapeSelectedScale: Vec3 = null;
    @property(Vec3)
    offset: Vec3 = new Vec3(0, 700, 0);


    private squareShapeImage: Node = null;
    private shapeData: ShapeData = null;
    private currentShape: Node[] = [];
    TotalSquareNumber: number;

    shapeStartScale: Vec2 = null;
    canvas: Canvas = null;
    shapeDraggable: Boolean = true;
    @property(Vec3)
    startPosition: Vec3 = null;
    shapeActive: boolean = true;


    

    onLoad(){
        this.squareShapeImage = instantiate(this.prefabSquareShapeImage) as Node;
        this.shapeStartScale = this.node.scale.toVec2();
        console.log(this.shapeStartScale);
        this.canvas = this.node.getParent().getComponent(Canvas);
        this.shapeDraggable = true;
        this.startPosition = new Vec3(this.node.position);
        this.shapeActive = true;

        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);


    }
    onEnable() {
        GameEvents.on(MOVE_SHAPE_TO_START_POSITION, this.moveShapeToStartPosition, this);
    }
    onDisable(){
        GameEvents.off(MOVE_SHAPE_TO_START_POSITION, this.moveShapeToStartPosition, this);
    }
    IsOnStartPosition(): boolean{
        return this.node.position.equals(this.startPosition);
    }
    IsAnyOfShapeSquareActive(): boolean{
        for (const square of this.currentShape) {
            if(square.active){
                return true;
            }   
        }
        return false;
    }

    DeactivateShape(){
        if(this.shapeActive){
            this.currentShape.forEach(square => {
                square.getComponent(ShapeSquare).DeactivateShape();
            });
        }
        this.shapeActive = false;
    }

    ActivateShape(){
        if(!this.shapeActive){
            this.currentShape.forEach(square => {
                square.getComponent(ShapeSquare).ActivateShape();
            });
        }
        this.shapeActive = true;
    }

    RequestNewShape(shapeData: ShapeData){
        this.node.setPosition(this.startPosition);
        this.CreateShape(shapeData);
    }



    CreateShape(shapeData: ShapeData){
        this.shapeData = shapeData;
        this.TotalSquareNumber = this.getNumberOfSquares(shapeData);
        while(this.currentShape.length < this.TotalSquareNumber){
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
        if (this.shapeDraggable) {
            let delta = event.getDelta();
            this.node.position = this.node.position.add(new Vec3(delta.x, delta.y, 0));
        }
    }

    onTouchEnd(event: EventTouch) {
        this.node.scale = new Vec3 (this.shapeStartScale.x, this.shapeStartScale.y, 1);
        GameEvents.emit(CHECK_IF_SHAPE_CAN_BE_PLACED);
    }
    moveShapeToStartPosition(){
        this.node.position = new Vec3(this.startPosition);
    }
}


