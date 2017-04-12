
import {Injectable} from "@angular/core";

export type CheckboxState = {
    row: number,
    checked: boolean
}

/*
 * checkbox renderer service
 * */
@Injectable()
export class TableCheckboxService{
    public checkboxStates: CheckboxState[] = [];
    public checkboxSelectAll: (() => void)[] = [];
    public checkboxUnSelectAll: (() => void)[] = [];
    public headState: string|number;
    public headCheckboxSelect: (() => void)[] = [];
    public headCheckboxUnSelect: (() => void)[] = [];

    headListen(selectListener, unSelectListener){
        this.headCheckboxSelect.push(selectListener);
        this.headCheckboxUnSelect.push(unSelectListener);
    }

    headSelect(){
        this.headCheckboxSelect.forEach(checkboxSelect => checkboxSelect());
    }

    headUnSelect(){
        this.headCheckboxUnSelect.forEach(checkboxUnSelect => checkboxUnSelect());
    }

    listen(selectListener, unSelectListener){
        this.checkboxSelectAll.push(selectListener);
        this.checkboxUnSelectAll.push(unSelectListener);
    }

    selectAll(){
        this.checkboxSelectAll.forEach(checkboxSelect => checkboxSelect());
    }

    unSelectAll(){
        this.checkboxUnSelectAll.forEach(checkboxUnSelect => checkboxUnSelect());
    }

}
