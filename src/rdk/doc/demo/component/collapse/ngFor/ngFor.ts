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

    nes = [
        {id: 1, name: "网元系列1", content: "content of ne1"},
        {id: 2, name: "网元系列2", content: "content of ne2"},
        {id: 3, name: "网元系列3", content: "content of ne3"}
    ];

    @ViewChild("coll_ne") collapse: RdkCollapse;


    activePane: RdkCollapsePane;

    add() {
        this.nes.push({id: 4, name: "网元系列" + (this.nes.length+1), content: "content of ne"+ (this.nes.length+1)})
    }

    click() {
        let found: string;
        this.activePane = this.collapse.panes.find((pane) => pane.isActive == true);
        found = this.activePane ? this.activePane.title : 'no pane';
        alert(found + ' is activated!');
    }
}
