import { _decorator, Component, Node, UI, Sprite, Collider2D, Contact2DType, IPhysics2DContact, Prefab, BoxCollider2D as BoxCollider2D, PolygonCollider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridSquare')
export class GridSquare extends Component {
    
    @property(Sprite)
    normalImage: Sprite = null;
    @property(Sprite)
    hooverImage: Sprite = null;
    @property(Sprite)
    activeImage: Sprite = null;

    Selected: Boolean;
    SquareIndex : number;
    SquareOccupied: Boolean;
D
    start() {
        this.Selected = false;
        this.SquareOccupied = false;
        let collider = this.getComponent(BoxCollider2D);
        
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    public CanWeUseThisSquare(): boolean {
            return this.hooverImage.node.active;
    }

    public ActivateSquare(): void{
        this.hooverImage.node.active = false;
        this.activeImage.node.active = true;
        this.Selected = true;
        this.SquareOccupied = true;
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        this.hooverImage.node.active = true;


    }

    onEndContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        this.hooverImage.node.active = false;

    }

}


