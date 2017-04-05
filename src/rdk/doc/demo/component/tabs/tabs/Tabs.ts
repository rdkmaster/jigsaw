/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RdkTabs} from "../../../../../component/tabs/tabs";

@Component({
    templateUrl:"Tabs.html"
})
export class RdkTabsComponent implements OnInit{

    @ViewChild('myTab') myTab : RdkTabs

    ngOnInit(){
        console.log(this.myTab);
        this.myTab.tabs.forEach(
            (tabPane)=>{console.log(tabPane.label)}
        );
    }

}
