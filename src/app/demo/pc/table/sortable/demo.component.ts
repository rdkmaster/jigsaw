import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData, PageableTableData, TableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {DataSortInfo, SortAs, SortOrder} from "jigsaw/common/core/data/component-data";
import {JigsawTable} from "jigsaw/pc-components/table/table";


@Component({
    templateUrl: './demo.component.html'
})
export class TableSetHeaderSortDemoComponent {
    @ViewChild(JigsawTable, {static: false}) table: JigsawTable;

    tableDataFromAjax: TableData;
    tableDataFromObject: TableData;
    localPageable: LocalPageableTableData;
    pageable: PageableTableData;

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
        this.tableDataFromAjax = new TableData();
        this.tableDataFromAjax.http = http;
        this.tableDataFromAjax.fromAjax('mock-data/hr-list');

        this.localPageable = new LocalPageableTableData();
        this.localPageable.http = http;
        this.localPageable.pagingInfo.pageSize = 10;
        this.localPageable.fromAjax('mock-data/hr-list');

        this.tableDataFromObject = new TableData();
        setTimeout(() => {
            this.tableDataFromObject.fromObject(this.tableJsonLong)
        });

        this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries', body: {aa: 11, bb: 22}, method: 'post'
        });
        /*this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries', params: {aa: 11, bb: 22}
        });*/
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.pagingInfo.pageSize = 5;
        this.pageable.sortInfo = new DataSortInfo(SortAs.string, 'desc', 'enName');
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
        if(this.tableDataFromAjax.data.length < 10) {
            this.tableDataFromAjax.fromAjax('mock-data/hr-list');
        } else {
            this.tableDataFromAjax.fromAjax('mock-data/hr-list-short');
        }
    }

    changeData2() {
        if(this.tableDataFromObject.data.length < 5) {
            this.tableDataFromObject.fromObject(this.tableJsonLong);
        } else {
            this.tableDataFromObject.fromObject(this.tableJsonShort);
        }
    }

    changeData3() {
        if(this.localPageable.pagingInfo.totalRecord < 10) {
            this.localPageable.fromAjax('mock-data/hr-list');
        } else {
            this.localPageable.fromAjax('mock-data/hr-list-short');
        }
    }

    onSearch($event) {
        console.log($event);
        this.localPageable.filter($event, ['name']);
    }

    columnsForPageable: ColumnDefine[] = [
        {
            target: 0,
            header: {
                sortable: true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.desc
            }
        }
    ];

    onSearchForPageable(reg) {
        // 这里需要特别注意，filter函数的执行是在服务端，而非在浏览器！
        // 这里context变量是filter的执行上下文（即filter函数里的this所指向的对象），它将会一起传输给服务端，
        // 因此这里需要注意控制context的值里只包含有用的数据，以加快前后端通信速度
        const filter = function(item) {
            return item[0].match(new RegExp(this.reg, 'g'));
        };
        const context = {reg};

        this.pageable.filter(filter, context);
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



