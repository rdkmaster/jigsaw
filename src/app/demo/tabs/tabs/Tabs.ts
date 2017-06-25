/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {RdkTab} from "../../../../rdk/component/tabs/tab";

@Component({
    templateUrl:"Tabs.html"
})
export class RdkTabsComponent implements AfterViewInit{

    @ViewChild('myTab') myTab : RdkTab;

    ngAfterViewInit(){
        console.log(this.myTab.length);
    }

}
