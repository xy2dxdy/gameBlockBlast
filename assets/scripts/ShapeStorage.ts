import { _decorator, Component, instantiate, Node, Prefab, randomRange, randomRangeInt } from 'cc';
import { ShapeData } from './ShapeData';
import { Shape } from './Shape';
const { ccclass, property } = _decorator;

@ccclass('ShapeStorage')
export class ShapeStorage extends Component {
    @property([Prefab])
    prefabShapeData: Prefab[] = [];
    @property([Shape])
    shapeList: Shape[] = [];

    private shapeData: ShapeData[] = [];

    start(){
        this.prefabShapeData.forEach(element => {
            this.shapeData.push(instantiate(element).getComponent(ShapeData));
            
        });
        this.shapeList.forEach(element => {
            let shapeIndex = randomRangeInt(0, this.shapeData.length);
            element.CreateShape(this.shapeData[shapeIndex]);
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

    
}


