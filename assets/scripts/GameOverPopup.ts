import { _decorator, Component, Node } from 'cc';
import { GAME_OVER, GameEvents } from './GameEvents';
const { ccclass, property } = _decorator;

@ccclass('GameOverPopup')
export class GameOverPopup extends Component {
    @property(Node)
    gameOverPopup: Node;

    protected start(): void {
        this.gameOverPopup.active = false;
    }

    protected onEnable(): void {
        GameEvents.on(GAME_OVER, this.onGameOver, this);
    }
    protected onDisable(): void {
        GameEvents.off(GAME_OVER, this.onGameOver, this);
    }

    private onGameOver(score: boolean){
        this.gameOverPopup.active = true;
    }
}


