import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Row')
export class Row{
    @property(Boolean)
    column: Boolean[] = [];
    private size: number = 0;
    Row(size: number){
        this.CreateRow(size);
    }
    CreateRow(size: number){
        this.size = size;
        this.column = new Boolean[size];
        this.ClearRow();
    }
    ClearRow(){
        for(let i = 0; i < this.size; i++){
            this.column[i] = false;
        }
    }
}


