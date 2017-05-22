import {
    NgModule, Component, ViewEncapsulation, QueryList, Input, ContentChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RdkPanel} from "./collapse-panel";
import {AbstractRDKComponent} from "../core";
import {PortalHost} from "../../core/utils/portalHost";

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

    @ContentChildren(RdkPanel) _rdkPanel: QueryList<RdkPanel>;

    @Input()
    public mode: string| CollapseModule = 'default';  // accordion
}

export enum CollapseModule {
    default, accordion
}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkCollapse, RdkPanel,PortalHost],
    exports: [RdkCollapse, RdkPanel]
})
export class RdkCollapseModule { }
