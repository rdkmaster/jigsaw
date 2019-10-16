import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData, TableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {SortAs, SortOrder} from "jigsaw/common/core/data/component-data";
import {JigsawTable} from "jigsaw/pc-components/table/table";


@Component({
    templateUrl: './demo.component.html'
})
export class TableSetHeaderSortDemoComponent {
    @ViewChild(JigsawTable, {static: false}) table: JigsawTable;

    tableData: TableData;
    tableData1: TableData;
    pageable: LocalPageableTableData;

    tableJsonLong = {
        data: [
            [
                "Michelle",
                "女",
                "Developer",
                19850,
                "2015/2/18",
                "Platform II",
                "蜜雪儿，紫菀花。"
            ],
            [
                "Mignon",
                "女",
                "System Architect",
                13208,
                "2016/4/16",
                "Platform III",
                "蜜妮安，细致而优雅。"
            ],
            [
                "Edwina",
                "女",
                "Test Engineer",
                19668,
                "2017/12/11",
                "Online Prod I",
                "艾德文娜，有价值的朋友;财产的获得者。"
            ],
            [
                "Bartley",
                "男",
                "System Architect",
                15041,
                "2015/1/6",
                "Platform II",
                "巴特莱，看管牧草地的人。"
            ],
            [
                "Alston",
                "男",
                "System Architect",
                12611,
                "2010/9/23",
                "Platform II",
                "奥斯顿，出身高贵的人。"
            ],
            [
                "Sigrid",
                "女",
                "Developer",
                17516,
                "2010/10/26",
                "Platform II",
                "西格莉德，最被喜爱的人;胜利的。"
            ]
        ],
        field: [
            "name",
            "gender",
            "position",
            "salary",
            "enroll-date",
            "office",
            "desc"
        ],
        header: [
            "姓名",
            "性别",
            "职位",
            "薪资",
            "入职日期",
            "部门",
            "描述"
        ]
    };

    tableJsonShort = {
        data: [
            [
                "Clementine",
                "女",
                "System Architect",
                18239,
                "2013/7/24",
                "Online Prod I",
                "克莱曼婷，温柔且仁慈的人。"
            ],
            [
                "Renata",
                "女",
                "Test Engineer",
                10684,
                "2014/5/21",
                "Online Prod I",
                "蕾娜塔，再生的;更新，恢复。"
            ],
            [
                "Abner",
                "男",
                "System Architect",
                13346,
                "2013/7/11",
                "Platform I",
                "艾布纳，睿智;有智慧。"
            ],
            [
                "Shirley",
                "女",
                "Developer",
                14750,
                "2013/5/13",
                "Offline Prod II",
                "雪丽，来自草地的。"
            ],
        ],
        field: [
            "name",
            "gender",
            "position",
            "salary",
            "enroll-date",
            "office",
            "desc"
        ],
        header: [
            "姓名",
            "性别",
            "职位",
            "薪资",
            "入职日期",
            "部门",
            "描述"
        ]
    };

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');

        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');

        this.tableData1 = new TableData();
        setTimeout(() => {
            this.tableData1.fromObject(this.tableJsonLong)
        })

    }

    columns: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable: true,
                sortAs: SortAs.number,
                defaultSortOrder: SortOrder.desc,
            }
        }, {
            target: 'name',
            header: {
                sortable: true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.asc,
            }
        }
    ];

    changeData1() {
        if(this.tableData.data.length < 10) {
            this.tableData.fromAjax('mock-data/hr-list');
        } else {
            this.tableData.fromAjax('mock-data/hr-list-short');
        }
    }

    changeData2() {
        if(this.tableData1.data.length < 5) {
            this.tableData1.fromObject(this.tableJsonLong);
        } else {
            this.tableData1.fromObject(this.tableJsonShort);
        }
    }

    changeData3() {
        if(this.pageable.pagingInfo.totalRecord < 10) {
            this.pageable.fromAjax('mock-data/hr-list');
        } else {
            this.pageable.fromAjax('mock-data/hr-list-short');
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'ColumnDefine.header',
        'TableHeader.sortable',
        'TableHeader.sortAs',
        'TableHeader.defaultSortOrder',
    ];
}



