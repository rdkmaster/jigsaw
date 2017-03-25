import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";

@Component({
  templateUrl: 'renderer.html'
})
export class TableRendererDemoComponent {
    tableData:TableData;
    constructor() {
        this.tableData = new TableData([[12, 12, 12, 12, 12,], [23, 23,23, 23, 23], [43, 43 , 43, 43, 43]],
            ['f1', 'f2', 'f3', 'f4', 'f5'], ['h1', 'h2', 'h3', 'h4', 'h5']);
    }
}

