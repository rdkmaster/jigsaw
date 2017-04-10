import {Injectable} from "@angular/core";

export type checkboxState = {
    row: number,
    checked: boolean
}

@Injectable()
export class TableRendererService{

    public checkboxStates: checkboxState[] = [];
    public checkboxSelectAll: (() => void)[] = [];
    public checkboxUnSelectAll: (() => void)[] = [];
    public headCheckboxState: any;
    public headCheckboxSelect: () => void;
    public headCheckboxUnSelect: () => void;

    headListen(selectListener, unSelectListener){
        this.headCheckboxSelect = selectListener;
        this.headCheckboxUnSelect = unSelectListener;
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
