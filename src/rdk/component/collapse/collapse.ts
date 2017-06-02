import {
    NgModule, Component, ViewEncapsulation, QueryList, Input, ContentChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RdkCollapsePane} from "./collapse-pane";
import {AbstractRDKComponent} from "../core";

@Component({
    selector: 'rdk-collapse',
    templateUrl: 'collapse.html',
    styleUrls: ['collapse.scss'],
    host: {
        '[style.width]': 'width',
        'class':'collapseHost'
    },
    encapsulation: ViewEncapsulation.None
})
export class RdkCollapse extends AbstractRDKComponent{

    @ContentChildren(RdkCollapsePane) _rdkPanel: QueryList<RdkCollapsePane>;

    @Input()
    public mode: string| CollapseMode = 'default';  // accordion
}

export enum CollapseMode {
    default, accordion
}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkCollapse, RdkCollapsePane],
    exports: [RdkCollapse, RdkCollapsePane]
})
export class RdkCollapseModule { }
