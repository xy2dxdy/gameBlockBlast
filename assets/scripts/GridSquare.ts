import { _decorator, Component, Node, UI, Sprite, Collider2D, Contact2DType, Animation, IPhysics2DContact, Prefab, BoxCollider2D as BoxCollider2D, PolygonCollider2D, SpriteFrame, AnimationComponent, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridSquare')
export class GridSquare extends Component {
    
    @property(Sprite)
    normalImage: Sprite = null;
    @property(Sprite)
    hooverImage: Sprite = null;
    @property(Sprite)
    activeImage: Sprite = null;

    private animation: Animation = null;

    Selected: Boolean;
    SquareIndex : number;
    SquareOccupied: Boolean;
D
    start() {
        this.Selected = false;
        this.SquareOccupied = false;
        let collider = this.getComponent(BoxCollider2D);
        this.animation = this.activeImage.getComponent(Animation);
        
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        if (this.animation) {
            this.animation.on(Animation.EventType.FINISHED, this.onAnimationFinished, this);
        }
    }

    PlaceShapeOnBoard(image: SpriteFrame){
        this.ActivateSquare(image);
    }

    public CanWeUseThisSquare(): boolean {
            return this.hooverImage.node.active;
    }

    public ActivateSquare(image: SpriteFrame): void{
        this.hooverImage.node.active = false;
        this.activeImage.spriteFrame = image;
        this.activeImage.node.active = true;
        this.Selected = true;
        this.SquareOccupied = true;
    }
    public Deactivate(): void{
        if (this.animation) {
            this.animation.play('ScaleAnimation');
        }
        
    }
    public ClearOccupied(){
        this.Selected = false;
        this.SquareOccupied = false;
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if(!this.SquareOccupied){
            this.Selected = true;
            this.hooverImage.node.active = true;
        }

    }

    onEndContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if(!this.SquareOccupied){
            this.Selected = false;
             this.hooverImage.node.active = false;
        }
    }
    onAnimationFinished() {
        this.activeImage.node.active = false;
        this.activeImage.node.scale = new Vec3(1, 1, 1);
    }

}


