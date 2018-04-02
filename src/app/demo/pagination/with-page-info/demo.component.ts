import {Component} from "@angular/core";
import {PageableTableData} from "jigsaw/core/data/table-data";
import {PagingInfo} from "jigsaw/core/data/component-data";

@Component({
    templateUrl: './demo.component.html'
})
export class WithPagingInfoDemoComponent {
    pageInfo = new PagingInfo();
    actions = 0;

    constructor() {
        this.pageInfo.totalRecord = 200;
        this.pageInfo.subscribe(() => {
            this.actions++;
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawPagination',
        'PageableTableData'
    ];
}

