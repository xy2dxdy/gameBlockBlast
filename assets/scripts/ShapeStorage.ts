import { _decorator, Component, instantiate, Node, Prefab, randomRange, randomRangeInt } from 'cc';
import { ShapeData } from './ShapeData';
import { Shape } from './Shape';
const { ccclass, property } = _decorator;

@ccclass('ShapeStorage')
export class ShapeStorage extends Component {
    @property([Prefab])
    prefabShapeData: Prefab[] = [];
    @property([Node])
    shapeList: Node[] = [];

    private shapeData: ShapeData[] = [];

    start(){
        this.prefabShapeData.forEach(element => {
            this.shapeData.push(instantiate(element).getComponent(ShapeData));
            
        });
        console.log(this.shapeData.length);
        this.shapeList.forEach(element => {
            let shapeIndex = randomRangeInt(0, this.shapeData.length);
            element.getComponent(Shape).CreateShape(this.shapeData[shapeIndex]);
        });
    }

    
}


