
import {Injectable} from "@angular/core";

export type CheckboxState = {
    row: number,
    checked: boolean|number
}

/*
 * checkbox renderer service
 * */
@Injectable()
export class TableCheckboxService{
    public checkboxStates: CheckboxState[] = [];
    public checkboxSelectAll: (() => void)[] = [];
    public checkboxUnSelectAll: (() => void)[] = [];
    public headState: boolean|number;

    public headCheckboxSelect: (() => void)[] = [];
    public headCheckboxUnSelect: (() => void)[] = [];
    public headCheckboxIndeterminate: (() => void)[] = [];

    headListen(selectListener, unSelectListener, IndeterminateListener){
        this.headCheckboxSelect.push(selectListener);
        this.headCheckboxUnSelect.push(unSelectListener);
        this.headCheckboxIndeterminate.push(IndeterminateListener);

        if(this._resetFlag){
            this._resetFlag = false;
        }
    }

    headSelect(){
        this.headCheckboxSelect.forEach(checkboxSelect => checkboxSelect());
    }

    headUnSelect(){
        this.headCheckboxUnSelect.forEach(checkboxUnSelect => checkboxUnSelect());
    }

    headIndeterminate(){
        this.headCheckboxIndeterminate.forEach(checkboxIndeterminate => checkboxIndeterminate());
    }

    listen(selectListener, unSelectListener){
        this.checkboxSelectAll.push(selectListener);
        this.checkboxUnSelectAll.push(unSelectListener);

        if(this._resetFlag){
            this._resetFlag = false;
        }
    }

    selectAll(){
        this.checkboxSelectAll.forEach(checkboxSelect => checkboxSelect());
    }

    unSelectAll(){
        this.checkboxUnSelectAll.forEach(checkboxUnSelect => checkboxUnSelect());
    }

    private _resetFlag: boolean;
    reset(){
        if(!this._resetFlag){
            this.checkboxStates = [];
            this.checkboxSelectAll = [];
            this.checkboxUnSelectAll = [];

            this.headState = 0;
            this.headCheckboxSelect = [];
            this.headCheckboxUnSelect = [];
            this.headCheckboxIndeterminate = [];

            this._resetFlag = true;
        }
    }

}
