import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './demo.component.html'
})
export class RefreshDemoComponent {
    data = new TableData([],
        ['f1', 'f2', 'f3', 'f4', 'f5'],
        ['Col1', 'Col2', 'Col3', 'Col4', 'Col5']);
    updated = false;

    constructor() {
        this.addRow();
        this.addRow();
        this.addRow();
        this.refresh();
    }

    refresh() {
        this.data.refresh();
        this.updated = false;
    }

    addRow() {
        const idx = this.data.data.length + 1;
        this.data.data.push([idx + '-1', idx + '-2', idx + '-3', idx + '-4', idx + '-5']);
        this.updated = true;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'IComponentData.refresh',
    ];
}
