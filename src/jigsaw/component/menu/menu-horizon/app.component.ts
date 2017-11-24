import {
    NgModule, Component, EventEmitter, Input, Output, ContentChildren, Directive, QueryList,
    ElementRef, ViewChild, AfterContentInit, Renderer2, AfterViewChecked, ChangeDetectorRef, forwardRef
} from "@angular/core";
import {Router, RouterModule} from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {AbstractJigsawComponent} from "jigsaw/component/common";

@Component({
    selector: 'menu-horizon',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class MenuHorizon extends AbstractJigsawComponent {
    @Input()
    public data: any;

    count = 1;
    labels = [];
    visible: any[] = [[], [], [], []];
    selectedItems1: string;
    handleSelect(selectedItems, index, main) {
        this.count = index;
        this.selectedItems1 = selectedItems.map(item => item.label).toString();
        if (index > 0) {
            for (let j in this.visible[index]) {
                this.visible[index][j] = false;
            }
        }
        if (index > 1) {
            for(let r in this.visible[index - 1]){
                this.visible[index - 1][r] = false;
            }
            this.visible[index - 1][main] = true;
        }
        if (this.visible.length >= index) {
            for (let q = index; q < this.visible.length; q++) {
                for (let m in this.visible[q]) {
                    this.visible[q][m] = false;
                }
            }
        }
        this.visible[index][this.selectedItems1] = true;
    }
    /**
     * 目录赋值
     */
    showVerticalMenu() {
        this.labels = this.data;
        this.visible[0][0] = true;
    }

}

@NgModule({
    imports: [RouterModule, JigsawListModule, CommonModule, JigsawCheckBoxModule, JigsawComboSelectModule, JigsawButtonModule],
    declarations: [MenuHorizon],
    exports: [MenuHorizon]
})

export class MenuHorizonModule {
}
