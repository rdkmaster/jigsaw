import { Component } from "@angular/core";
import { TableData } from "jigsaw/public_api";
import { TableBasicTextService } from "../doc.service";

@Component({
    selector: 'table-basic-no-data',
    templateUrl: './demo.component.html'
})
export class TableBasicNoDataDemoComponent {
    public tableData: TableData;

    constructor(public doc: TableBasicTextService) {
        this.tableData = new TableData(
            [],
            ["name", "position", "salary", "title1", "enroll-date", "office", "extn", "title2", "title3"],
            ["姓名", "职位", "薪资", "很长很长很长很长很长很长很长的用于测试的标题", "入职日期", "部门", "其他", "很长很长很长很长很长很长很长的用于测试的标题", "很长很长很长很长很长很长很长的用于测试的标题"]);
    }
}
