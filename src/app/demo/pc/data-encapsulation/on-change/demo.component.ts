import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, PageableArray, LocalPageableArray} from "jigsaw/common/core/data/array-collection";
import {IPageable, SortAs, SortOrder} from "jigsaw/common/core/data/component-data";
import {GeneralCollection} from "jigsaw/common/core/data/general-collection";
import {PageableTableData, TableData} from "jigsaw/common/core/data/table-data";


@Component({
    templateUrl: './demo.component.html', styles: ['a {padding-right: 24px} h3 {margin: 24px 0 12px 0}']
})
export class OnChangeDemoComponent {
    sortAsString: SortAs = SortAs.string;
    orderByDesc: SortOrder = SortOrder.desc;
    onChangeCount: number = 0;
    rawTableData = {
        header: [ 'Column1', 'Column2', 'Column3' ],
        field: [ 'field1', 'field2', 'field3' ],
        data: [
            [ 'cell11', 'cell12', 'cell13' ],
            [ 'cell21', 'cell22', 'cell23' ],
            [ 'cell31', 'cell32', 'cell33' ]
        ]
    };

    ac: ArrayCollection<any> = new ArrayCollection();
    pa: PageableArray;
    lpa: LocalPageableArray<any>;
    gc: GeneralCollection<any> = new GeneralCollection();
    td: TableData = new TableData();
    ptd: PageableTableData;

    constructor(http: HttpClient) {
        this.ac.http = http;
        this.ac.onChange(this.onChange.bind(this));

        this.lpa = new LocalPageableArray([1,2,3,4,5,6]);
        this.lpa.http = http;
        this.lpa.onChange(this.onChange.bind(this));
        this.lpa.fromAjax('mock-data/core-members');

        this.gc.http = http;
        this.gc.onChange(this.onChange.bind(this));

        this.td.http = http;
        this.td.onChange(this.onChange.bind(this));

        this.ptd = new PageableTableData(http, 'mock-data/countries');
        this.ptd.onChange(this.onChange.bind(this));
        this.ptd.fromAjax();
    }

    onChange() {
        this.onChangeCount++;
    }

    changePage(data: IPageable) {
        data.changePage(1, data.pagingInfo.pageSize == 10 ? 5 : 10);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
