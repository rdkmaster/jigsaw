import { Component } from "@angular/core";
import { LocalPageableTableData } from "jigsaw/public_api";

@Component({
    templateUrl: 'table-in-tab.html'
})
export class TableInTabComponent {
    public pageable: LocalPageableTableData;

    constructor() {
        this.pageable = new LocalPageableTableData();
        this.pageable.fromObject({
            data: [
                ["Emily", "可以", "$15128", "2017/4/21", "HR II", 23],
                ["Shirley", "不可以", "$11845", "2017/4/25", "R&D Dept II", 42],
                ["Easton", "可以", "$17636", "2017/4/24", "Marketing I", 36],
                ["Emily", "可以", "$15128", "2017/4/21", "HR II", 65],
                ["Shirley", "可以", "$11845", "2017/4/25", "R&D Dept II", 71],
            ],
            field: ["name", "expandable", "salary", "enroll-date", "office", "progress"],
            header: ["姓名", "是否可以展开", "薪资", "入职日期", "部门", "工作进度"]
        })
    }
}