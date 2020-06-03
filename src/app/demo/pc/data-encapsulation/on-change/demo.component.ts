import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    ArrayCollection, PageableArray, LocalPageableArray, IPageable,
    SortAs, SortOrder, GeneralCollection,
    BigTableData, LocalPageableTableData, PageableTableData,
    TableData, GraphData
} from "jigsaw/public_api";

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
    btd: BigTableData;
    lpd: LocalPageableTableData;
    gd: GraphData;

    constructor(http: HttpClient) {
        this.ac.http = http;
        this.ac.onChange(this.onChange.bind(this));

        this.pa = new PageableArray(http, 'mock-data/countries');
        this.pa.onChange(this.onChange.bind(this));
        this.pa.fromAjax();

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

        this.btd = new BigTableData(http, 'mock-data/countries');
        this.btd.onChange(this.onChange.bind(this));
        this.btd.fromAjax();

        this.lpd = new LocalPageableTableData();
        this.lpd.http = http;
        this.lpd.onChange(this.onChange.bind(this));
        this.lpd.fromAjax('mock-data/countries');

        this.gd = new GraphData();
        this.gd.http = http;
        this.gd.onChange(this.onChange.bind(this));
        this.gd.fromAjax('mock-data/countries');
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
