import {ChangeDetectorRef, Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeCrossSelectDemoComponent {

    constructor(private cd: ChangeDetectorRef) {
    }

    areas = require('mock-data/tree-data.json');
    selectedArea: any;

    onChange(selectedItems) {
        console.log(selectedItems);
        this.selectedArea = selectedItems[selectedItems.length - 1];
        this.cd.detectChanges();
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了如何实现在级联组件上跨分支多选条目';
    description: string = '';
}

