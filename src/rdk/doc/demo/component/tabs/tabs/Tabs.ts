/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RdkTab} from "../../../../../component/tabs/tab";

@Component({
    templateUrl:"Tabs.html"
})
export class RdkTabsComponent implements OnInit{

    @ViewChild('myTab') myTab : RdkTab

    ngOnInit(){
        console.log(this.myTab);
        this.myTab.tabs.forEach(
            (tabPane)=>{console.log(tabPane.label)}
        );
    }

}
