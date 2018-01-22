import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawTabsModule} from "jigsaw/component/tabs/index";

import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DynamicTabDemoComponent} from './demo.component';
import {TabContentModule} from "./tabContent/tab-content.module";

/* #for-live-demo-only#
const routes = [{
    path: 'tab-page', component: DynamicTabDemoComponent
}];
*/
@NgModule({
    imports: [
        TabContentModule, JigsawTabsModule, JigsawButtonModule, JigsawDemoDescriptionModule,
        JigsawInputModule, RouterModule/* #for-live-demo-only# .forRoot(routes) */
    ],
    declarations: [DynamicTabDemoComponent],
    exports: [DynamicTabDemoComponent]
})
export class DynamicTabDemoModule {
}
