import { _decorator, Component, Node, UI, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridSquare')
export class GridSquare extends Component {
    
    @property(Sprite)
    normalImage: Sprite = null;

    start() {

    }

}


