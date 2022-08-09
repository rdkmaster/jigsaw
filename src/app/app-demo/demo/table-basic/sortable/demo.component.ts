import {Component, ViewChild} from "@angular/core";
import {
     TableData, ColumnDefine,
    DataSortInfo, SortAs, SortOrder,
    JigsawTable
} from "jigsaw/public_api";
import {TableBasicTextService} from "../doc.service";

@Component({
    selector: 'table-basic-sortable',
    templateUrl: './demo.component.html'
})
export class TableBasicSetHeaderSortDemoComponent {
    @ViewChild(JigsawTable) table: JigsawTable;

    tableDataFromObject: TableData;

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

    constructor(public text: TableBasicTextService) {
        // new TableData(data, field, header)这种形式无法默认排序，必须使用fromObject创建数据
        this.tableDataFromObject = new TableData();
        this.tableDataFromObject.sortInfo = new DataSortInfo(SortAs.string, SortOrder.asc, 'name');
        this.tableDataFromObject.fromObject(this.tableJsonLong);
    }

    columns: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable: true,
                sortAs: SortAs.number,
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
}
