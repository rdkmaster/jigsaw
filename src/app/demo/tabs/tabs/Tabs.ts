/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {JigsawTab} from "jigsaw/component/tabs/tab";

@Component({
    templateUrl:"Tabs.html"
})
export class JigsawTabsComponent implements AfterViewInit{

    @ViewChild('myTab') myTab : JigsawTab;

    ngAfterViewInit(){
        console.log(this.myTab.length);
    }

}
