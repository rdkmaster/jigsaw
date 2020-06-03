import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawMobileButtonModule, JigsawMobileInputModule, JigsawMobileTabsModule} from "jigsaw/mobile_public_api";
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
