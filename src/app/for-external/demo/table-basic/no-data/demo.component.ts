import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { TableData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-basic-no-data',
    templateUrl: './demo.component.html'
})
export class TableBasicNoDataDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-basic/no-data";

    public tableData: TableData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData(
            [],
            ["name", "position", "salary", "title1", "enroll-date", "office", "extn", "title2", "title3"],
            ["姓名", "职位", "薪资", "很长很长很长很长很长很长很长的用于测试的标题", "入职日期", "部门", "其他", "很长很长很长很长很长很长很长的用于测试的标题", "很长很长很长很长很长很长很长的用于测试的标题"]);
    }
}
