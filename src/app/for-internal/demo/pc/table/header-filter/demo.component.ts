import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ColumnDefine, DirectPageableTableData, HttpClientOptions, LocalPageableTableData, PageableTableData, TableData} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
})
export class TableSetHeaderFilterDemoComponent {
    public searchFields = [
        { label: "搜索列无限制", id: 1, value: null },
        { label: "搜索第一列（string）", id: 2, value: ['name'] },
        { label: "搜索前三列（string）", id: 3, value: ['name', 'gender', 'position'] },
        { label: "搜索第一列（index）", id: 4, value: [0] },
        { label: "搜索前三列（index）", id: 5, value: [0, 1, 2] },
    ];

    public selectedFields = this.searchFields[0];

    public tableData: TableData;
    public tableDataColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
                filterHistoryStorageSize: 0
            }
        }, {
            target: "position",
            header: {
                filterable: true
            }
        }, {
            target: "salary",
            header: {
                filterable: true,
                sortable: true
            }
        }, {
            target: "enroll-date",
            header: {
                filterable: true
            }
        }, {
            target: "office",
            header: {
                filterable: true
            }
        }, {
            target: "gender",
            header: {
                filterable: true
            }
        }
    ];
    public changeTableData() {
        this.tableData.fromObject({
            "field": [
                "name",
                "gender",
                "position",
                "salary",
                "enroll-date",
                "office",
                "desc"
            ],
            "header": [
                "姓名",
                "性别",
                "职位",
                "薪资",
                "入职日期",
                "部门",
                "描述"
            ],
            "data": [
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
                ]
            ]
        });
    }
    public onTableDataSearch(key: string) {
        console.log('filterKey === ', key, 'filterFiels === ', this.selectedFields.value);
        this.tableData.filter(key, this.selectedFields.value);
    }

    public onTableDataHeaderFilterChange($event) {
        console.log($event);
    }

    public localPageableSearchValue: string;
    public localPageable: LocalPageableTableData;
    public localPageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
        {
            target: "salary",
            header: {
                filterable: true,
                sortable: true
            },
        },
    ];

    public onLocalPageableSearch(key: string) {
        this.localPageableSearchValue = key;
        console.log('filterKey === ', key, 'filterFiels === ', this.selectedFields.value);
        this.localPageable.filter(key, this.selectedFields.value);
    }

    public onLocalPageableHeaderFilterChange($event) {
        console.log($event);
    }

    public changeLocalPageable() {
        if (this.localPageable.pagingInfo.totalRecord < 10) {
            this.localPageable.fromAjax("mock-data/hr-list");
        } else {
            this.localPageable.fromAjax("mock-data/hr-list-short");
        }
        this.localPageable.onRefresh(() => {
            this.localPageable.filter(this.localPageableSearchValue || '', null);
        })
    }

    public pageablePageableSearchValue: string;
    public pageable: PageableTableData;
    public pageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
    ];

    public onPageableSearch(key: string) {
        this.pageablePageableSearchValue = key;
        console.log('filterKey === ', key, 'filterFiels === ', this.selectedFields.value);
        this.pageable.filter(key, this.selectedFields.value);
    }

    public onPageableHeaderFilterChange($event) {
        console.log($event);
    }

    public changePageable() {
        this.pageable.fromAjax('mock-data/hr-list-short');
        const options: HttpClientOptions = {
            url: 'mock-data/hr-list-short',
            method: 'post'
        }
        this.pageable.updateDataSource(options);
    }

    public directPageableSearchValue: string;
    public directPageable: DemoDirectPageableTableData;
    public directPageableColumnDefines: ColumnDefine[] = [
        {
            target: "name",
            header: {
                filterable: true,
            },
        },
        {
            target: "gender",
            header: {
                filterable: true,
            },
        },
        {
            target: "position",
            header: {
                filterable: true,
            },
        },
    ];

    public onDirectPageableSearch(key: string) {
        this.directPageableSearchValue = key;
        console.log('filterKey === ', key, 'filterFields === ', this.selectedFields.value);
        this.directPageable.filter(key, this.selectedFields.value);
    }

    public onDirectPageableHeaderFilterChange($event) {
        console.log($event);
    }

    constructor(http: HttpClient) {
        this.localPageable = new LocalPageableTableData();
        this.localPageable.http = http;
        this.localPageable.pagingInfo.pageSize = 10;
        this.localPageable.fromAjax("mock-data/hr-list");

        this.pageable = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.pagingInfo.pageSize = 5;

        this.directPageable = new DemoDirectPageableTableData(http, {
            url: '/direct/pageable/table-data/simulation', method: 'post'
        });

        this.directPageable.onAjaxComplete(() => {
            console.log(this.directPageable);
        });
        this.directPageable.pagingInfo.pageSize = 5;

        this.tableData = new TableData(
            [
                [
                    "Michelle",
                    "",
                    "Developer",
                    0,
                    null,
                    undefined,
                    "蜜雪儿，紫菀花。"
                ],
                [
                    "Mignon",
                    "女",
                    "System Architect",
                    13218,
                    "2116/4/16",
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
            ["name", "gender", "position", "salary", "enroll-date", "office", "desc"],
            ["姓名", "性别", "职位", "薪资", "入职日期", "部门", "描述"]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}

class DemoDirectPageableTableData extends DirectPageableTableData {
    protected _ajax(): void {
        this.sourceRequestOptions.body = {
            filter: this.filterInfo.toJSON(),
            paging: this.pagingInfo,
            sortInfo: this.sortInfo,
            service: "/direct/pageable/table-data/simulation"
        }
        super._ajax();
    }
}
