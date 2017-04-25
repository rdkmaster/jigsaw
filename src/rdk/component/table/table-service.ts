
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

    /*public headCheckboxSelect: () => void;
    public headCheckboxUnSelect: () => void;
    public headCheckboxIndeterminate: () => void;
    headListen(selectListener: () => void, unSelectListener: () => void, IndeterminateListener: () => void){
        this.headCheckboxSelect = selectListener;
        this.headCheckboxUnSelect = unSelectListener;
        this.headCheckboxIndeterminate = IndeterminateListener;
    }

    headSelect(){
        this.headCheckboxSelect();
    }

    headUnSelect(){
        this.headCheckboxUnSelect();
    }

    headIndeterminate(){
        this.headCheckboxIndeterminate();
    }
*/
    public headCheckboxSelect: (() => void)[] = [];
    public headCheckboxUnSelect: (() => void)[] = [];
    public headCheckboxIndeterminate: (() => void)[] = [];

    headListen(selectListener, unSelectListener, IndeterminateListener){
        this.headCheckboxSelect.push(selectListener);
        this.headCheckboxUnSelect.push(unSelectListener);
        this.headCheckboxIndeterminate.push(IndeterminateListener);
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
    }

    selectAll(){
        this.checkboxSelectAll.forEach(checkboxSelect => checkboxSelect());
    }

    unSelectAll(){
        this.checkboxUnSelectAll.forEach(checkboxUnSelect => checkboxUnSelect());
    }

}
