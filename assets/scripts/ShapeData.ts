import { _decorator, Component, Node, Prefab } from 'cc';
import { Row } from './Row';

const { ccclass, property } = _decorator;



@ccclass('ShapeData')
export class ShapeData extends Component {
 
    @property
    columns: number = 0;
    @property
    rows: number = 0;
    @property([Row])
    board: Row[] = [];


    Clear(){
        for(let i = 0; i < this.rows; i++){
            this.board[i].ClearRow();
        }
    }

    CreateNewBoard(){
        this.board = new Row[this.rows];
        for(let i = 0; i < this.rows; i++){
            this.board[i] = new Row();
            this.board[i].Row(this.columns);
        }
    }
}


