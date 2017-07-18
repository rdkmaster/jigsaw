/**
 * Created by 10177553 on 2017/3/29.
 */
import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl:"withInput.html"
})
export class JigsawTabsWithInputComponent implements OnInit {

    selectedIndex = 0;

    tableData: TableData;

    tabDatas = [{title:"111",key:"XXX",content:"content 111"},{title:"222",key:"YYY",content:"content 222"}];

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
        this.tableData.onAjaxComplete(() => {
            console.log(this.tableData);
        });

        this.tabDatas.forEach(tabData =>{
            this[tabData.key] = new TableData();
            this[tabData.key].http = http;
        })
    }

    getTableData(){
        this.tabDatas.forEach(tabData =>{
            console.log(this[tabData.key]);
            this[tabData.key].fromAjax('mock-data/table/data.json');
        });
    }

    ngOnInit() { }

}
