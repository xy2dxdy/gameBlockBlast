import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LineIndicator')
export class LineIndicator extends Component {
    public line_data: number[][] = [
        [0, 1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30, 31],
        [32, 33, 34, 35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44, 45, 46, 47],
        [48, 49, 50, 51, 52, 53, 54, 55],
        [56, 57, 58, 59, 60, 61, 62, 63]
    ];

    public column_indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

    private GetSquarePosition(squareIndex: number): [number, number]{
        let pos_row: number = 0;
        let pos_col: number = 0;
        for(let row = 0; row < 8; row++){
            for(let col = 0; col < 8; col++){
                if(this.line_data[row][col] == squareIndex){
                    pos_row = row;
                    pos_col = col;
                }
            }
        }
        return [pos_row, pos_col];
    }
    public GetVerticalLines(squareIndex: number): number[]{
        let line: number[] = [];
        let square_position_col = this.GetSquarePosition(squareIndex)[1];
        for(let index = 0; index < 8; index++){
            line.push(this.line_data[index][square_position_col]);
        }
        return line;
    }
}


