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

    collider: BoxCollider2D;
    private colliders: BoxCollider2D[] = [];
D
    start() {
        this.Selected = false;
        this.SquareOccupied = false;
        this.collider = this.getComponent(BoxCollider2D);
        this.animation = this.activeImage.getComponent(Animation);
        
        if (this.animation) {
            this.animation.on(Animation.EventType.FINISHED, this.onAnimationFinished, this);
        }

        this.colliders = this.node.scene.getComponentsInChildren(BoxCollider2D);
    }
    update(deltaTime: number) {
        if (this.collider) {
            const worldBoundingBox = this.collider.worldAABB;
            let isColliding = false;

            const colliders = this.node.scene.getComponentsInChildren(BoxCollider2D);

            for (const col of colliders) {
                if (col !== this.collider && worldBoundingBox.intersects(col.worldAABB)) {
                    isColliding = true;
                    break;
                }
            }

            if (!this.SquareOccupied && isColliding) {
                this.Selected = true;
                this.hooverImage.node.active = true;
            } else {
                this.Selected = false;
                this.hooverImage.node.active = false;
            }
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

    onAnimationFinished() {
        this.activeImage.node.active = false;
        this.activeImage.node.scale = new Vec3(1, 1, 1);
    }

}


