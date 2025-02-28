import { _decorator, BoxCollider2D, Component, EventTouch, Node, Vec3 } from 'cc';
import { Shape } from './Shape';
import { CHECK_IF_SHAPE_CAN_BE_PLACED, GameEvents } from './GameEvents';
const { ccclass, property } = _decorator;

@ccclass('ShapeSquare')
export class ShapeSquare extends Component {

    private shape: Shape = null;

    protected start(): void {
        this.shape = this.node.parent.getComponent(Shape);
    }
    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    DeactivateShape(){
        this.getComponent(BoxCollider2D).enabled = false;
        this.node.active = false;
    }
    ActivateShape(){
        this.getComponent(BoxCollider2D).enabled = true;
        this.node.active = true;
    }

    onTouchStart(event: EventTouch) {
        this.shape.node.scale = this.shape.shapeSelectedScale;
    }

    onTouchMove(event: EventTouch) {
        if (this.shape.shapeDraggable) {
            let delta = event.getDelta();
            this.shape.node.position = this.shape.node.position.add(new Vec3(delta.x, delta.y, 0));
        }
    }

    onTouchEnd(event: EventTouch) {
        this.shape.node.scale = new Vec3 (this.shape.shapeStartScale.x, this.shape.shapeStartScale.y, 1);
        GameEvents.emit(CHECK_IF_SHAPE_CAN_BE_PLACED);
    }
}


