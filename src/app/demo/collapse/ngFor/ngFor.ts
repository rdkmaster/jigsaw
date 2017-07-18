/**
 * Created by 10177553 on 2017/4/26.
 */
import {Component, ViewChild} from '@angular/core';
import {JigsawCollapse} from "jigsaw/component/collapse/collapse";
import {JigsawCollapsePane} from "jigsaw/component/collapse/collapse-pane";

@Component({
    templateUrl: './ngFor.html'
})
export class ngForDemoComponent {

    nes = [
        {id: 1, name: "NE1", content: "content of ne1"},
        {id: 2, name: "NE2", content: "content of ne2"},
        {id: 3, name: "NE3", content: "content of ne3"}
    ];

    @ViewChild("coll_ne") collapse: JigsawCollapse;


    activePane: JigsawCollapsePane;

    add() {
        this.nes.push({id: 4, name: "NE" + (this.nes.length+1), content: "content of ne"+ (this.nes.length+1)})
    }

    click() {
        let found: string;
        this.activePane = this.collapse.panes.find((pane) => pane.isActive == true);
        found = this.activePane ? this.activePane.title : 'no pane';
        alert(found + ' is activated!');
    }
}
