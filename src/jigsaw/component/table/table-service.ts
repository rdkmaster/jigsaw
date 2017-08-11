import {Injectable} from "@angular/core";
import {CheckBoxStatus} from "../checkbox/typings";

export type TableCheckboxInfo = {
    row: number,
    checked: boolean | number
}

/*
 * checkbox renderer service
 * */
@Injectable()
export class TableCheckboxService {
    public checkboxStates: TableCheckboxInfo[] = [];
    public checkboxSelectAll: (() => void)[] = [];
    public checkboxUnSelectAll: (() => void)[] = [];
    public headState: CheckBoxStatus;

    public headCheckboxSelect: (() => void)[] = [];
    public headCheckboxUnSelect: (() => void)[] = [];
    public headCheckboxIndeterminate: (() => void)[] = [];

    public headListen(selectListener, unSelectListener, indeterminateListener) {
        this.headCheckboxSelect.push(selectListener);
        this.headCheckboxUnSelect.push(unSelectListener);
        this.headCheckboxIndeterminate.push(indeterminateListener);
    }

    public headSelect() {
        this.headCheckboxSelect.forEach(checkboxSelect => checkboxSelect());
    }

    public headUnSelect() {
        this.headCheckboxUnSelect.forEach(checkboxUnSelect => checkboxUnSelect());
    }

    public headIndeterminate() {
        this.headCheckboxIndeterminate.forEach(checkboxIndeterminate => checkboxIndeterminate());
    }

    public listen(selectListener, unSelectListener) {
        this.checkboxSelectAll.push(selectListener);
        this.checkboxUnSelectAll.push(unSelectListener);
    }

    public selectAll() {
        this.checkboxSelectAll.forEach(checkboxSelect => checkboxSelect());
    }

    public unSelectAll() {
        this.checkboxUnSelectAll.forEach(checkboxUnSelect => checkboxUnSelect());
    }

    public reset() {
        this.checkboxStates = [];
        this.checkboxSelectAll = [];
        this.checkboxUnSelectAll = [];

        this.headState = CheckBoxStatus.unchecked;
        this.headCheckboxSelect = [];
        this.headCheckboxUnSelect = [];
        this.headCheckboxIndeterminate = [];
    }

}
