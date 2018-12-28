import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawSwitchModule} from "jigsaw/component/switch";
import {JigsawTabsModule} from "jigsaw/component/tabs/index";

import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TabHeadlessDemoComponent} from './demo.component';

/* #for-live-demo-only#
const routes = [{
    path: 'tab-page', component: DynamicTabDemoComponent
}];
*/
@NgModule({
    imports: [
        JigsawTabsModule, JigsawSwitchModule, JigsawDemoDescriptionModule,
        RouterModule/* #for-live-demo-only# .forRoot(routes) */
    ],
    declarations: [TabHeadlessDemoComponent],
    exports: [TabHeadlessDemoComponent]
})
export class TabHeadlessDemoModule {
}
