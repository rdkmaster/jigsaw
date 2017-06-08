/**
 * Created by 10177553 on 2017/4/26.
 */
import {Component, QueryList, ViewChild} from '@angular/core';
import {RdkCollapsePane} from "../../../../../component/collapse/collapse-pane";
import {RdkCollapse} from "../../../../../component/collapse/collapse";

@Component({
    templateUrl: './ngFor.html'
})
export class ngForDemoComponent {

    nes = [{id:1,name:"网元系列1"},{id:2,name:"网元系列2"}];

    @ViewChild("coll_ne") coll_ne :RdkCollapse;


    activePane : RdkCollapsePane;
    click(){
        this.activePane = this.coll_ne._rdkPanel.find((pane) => pane.isActive == true)
        alert( this.activePane.title );
    }
}
