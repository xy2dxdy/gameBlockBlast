import { _decorator, Component, instantiate, Node, Prefab, randomRange, randomRangeInt } from 'cc';
import { ShapeData } from './ShapeData';
import { Shape } from './Shape';
import { GameEvents, REQUEST_NEW_SHAPES } from './GameEvents';
const { ccclass, property } = _decorator;

@ccclass('ShapeStorage')
export class ShapeStorage extends Component {
    @property([Prefab])
    prefabShapeData: Prefab[] = [];
    @property([Shape])
    shapeList: Shape[] = [];

    private shapeData: ShapeData[] = [];

    onEnable() {
        GameEvents.on(REQUEST_NEW_SHAPES, this.RequestNewShapes, this);
    }
    onDisable(){
        GameEvents.off(REQUEST_NEW_SHAPES, this.RequestNewShapes, this);
    }
    start(){
        this.prefabShapeData.forEach(element => {
            this.shapeData.push(instantiate(element).getComponent(ShapeData));
            
        });
        this.shapeList.forEach(element => {
            let shapeIndex = randomRangeInt(0, this.shapeData.length);
            element.CreateShape(this.shapeData[shapeIndex]);
            element.adjustChildrenToCenterOfParent(element.node);
        });
                
        
    }

    GetCurrentSelectedShape(): Shape{
        for (const shape of this.shapeList) {
            if(shape.IsOnStartPosition() == false && shape.IsAnyOfShapeSquareActive()){
                return shape;
            }
        }
        console.error("There is no shape selected!");
        return null;
    }
    RequestNewShapes(){
        this.shapeList.forEach(shape => {
            let shapeIndex: number = randomRangeInt(0, this.shapeData.length);
            shape.RequestNewShape(this.shapeData[shapeIndex]);
        });
    }

    
}


