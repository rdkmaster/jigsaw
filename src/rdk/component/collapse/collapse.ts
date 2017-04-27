import {NgModule, Component, ViewEncapsulation, QueryList, Input, ContentChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RdkPanel} from "./collapse-panel";
import {AbstractRDKComponent} from "../core";

@Component({
    selector: 'rdk-collapse',
    templateUrl: 'collapse.html',
    styleUrls: ['collapse.scss'],
    host: {
        '[style.width]': 'width',
        '[style.display]':'display'
    },
    encapsulation: ViewEncapsulation.None
})
export class RdkCollapse extends AbstractRDKComponent{
    display = "block";

    @ContentChildren(RdkPanel) _rdkPanel: QueryList<RdkPanel>;

    public closeAllPanel() {
        if(!this._rdkPanel|| this._rdkPanel.length === 0) return;

        this._rdkPanel.forEach(item => {
            if(item["isActive"]) {
                item["isActive"] = false;
            }
        });
    }

    @Input()
    public mode: string| CollapseModule = 'default';  // accordion
}

export enum CollapseModule {
    default, accordion
}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkCollapse, RdkPanel],
    exports: [RdkCollapse, RdkPanel]
})
export class RdkCollapseModule { }
