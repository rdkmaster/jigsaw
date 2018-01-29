import {Component, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableTableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        jigsaw-pagination .jigsaw-select-option-list{
            top: 0;
            transform: translateY(-100%);
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class TablePageableDemoComponent {
    pageable: PageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries', params: {aa: 11, bb: 22}
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.fromAjax();
    }

    columnDefines: ColumnDefine[] = [
        {
            target: 0,
            header: {
                sortable: true
            }
        }
    ];

    getCurrentPage() {
        if (this.pageable.busy) {
            return;
        }
        this.pageable.changePage(this.pageable.pagingInfo);
    }

    getPageSize() {
        if (this.pageable.busy) {
            return;
        }
        this.pageable.changePage(this.pageable.pagingInfo);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

