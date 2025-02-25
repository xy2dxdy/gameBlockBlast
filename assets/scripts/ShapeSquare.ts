import { _decorator, BoxCollider2D, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShapeSquare')
export class ShapeSquare extends Component {
    start() {

    }

    DeactivateShape(){
        this.getComponent(BoxCollider2D).enabled = false;
        this.node.active = false;
    }
    ActivateShape(){
        this.getComponent(BoxCollider2D).enabled = true;
        this.node.active = true;
    }
}


