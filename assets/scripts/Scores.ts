import { _decorator, Component, Node, RichText } from 'cc';
import { ADD_SCORE, GameEvents } from './GameEvents';
const { ccclass, property } = _decorator;

@ccclass('Scores')
export class Scores extends Component {
    @property(RichText)
    scoreText: RichText;

    private currentScores: number;

    protected start(): void {
        this.currentScores = 0;
    }
    protected onEnable(): void {
        GameEvents.on(ADD_SCORE, this.onAddScore, this);
    }
    protected onDisable(): void {
        GameEvents.off(ADD_SCORE, this.onAddScore, this);
    }
    onAddScore(score: number){
        this.currentScores += score;
        this.UpdateScoreText();
    }
    private UpdateScoreText(){
        this.scoreText.string = this.currentScores.toString();
    }
}


