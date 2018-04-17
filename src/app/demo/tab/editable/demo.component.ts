import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {LineBarGraphData} from "jigsaw/core/data/graph-data";
import {JigsawTab} from "../../../../jigsaw/component/tabs/tab";
import {JigsawInput} from "../../../../jigsaw/component/input/input";
import {IDynamicInstantiatable} from "../../../../jigsaw/component/common";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TabsEditableDemoComponent {
    editable: boolean = true;
    tableData: TableData;
    lineBarGraphData: LineBarGraphData;
    removeMessage: string;

    constructor(http: HttpClient) {
        this.lineBarGraphData = new LineBarGraphData();
        this.lineBarGraphData.http = http;
        this.lineBarGraphData.fromAjax('mock-data/marketing');
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    handleRemove(index) {
        this.removeMessage = `删除了第 ${index + 1} 个tab`
    }

    handleAdd(tab: JigsawTab) {
        console.log(tab);
        tab.addTab('New tab', OneDemoComponent, new Date() + ' 添加了一个tab');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo主要展示可编辑的tab';
    description: string = '';
    tags: string[] = [
        'JigsawTab.editable',
    ];
}

@Component({
    template: '{{initData}}'
})
export class OneDemoComponent implements IDynamicInstantiatable {
    initData: string;
}
