import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileTabsModule} from "jigsaw/mobile-components/tabs/index";

import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DynamicTabDemoComponent} from './demo.component';
import {TabMobileContentModule} from "./tabContent/tab-content.module";

/* #for-live-demo-only#
const routes = [{
    path: 'tab-page', component: DynamicTabDemoComponent
}];
*/
@NgModule({
    imports: [
        TabMobileContentModule, JigsawMobileTabsModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule,
        JigsawMobileInputModule, RouterModule/* #for-live-demo-only# .forRoot(routes) */
    ],
    declarations: [DynamicTabDemoComponent],
    exports: [DynamicTabDemoComponent]
})
export class DynamicTabDemoModule {
}
