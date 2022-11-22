import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawButtonModule, JigsawInputModule, JigsawTabsModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DynamicTabDemoComponent} from './demo.component';
import {TabContentModule} from "./tabContent/tab-content.module";
import { TableContentModule } from './tableContent/table-content.module';
import { TableInTabModule } from './tableInTabContent/table-in-tab.module';

/* #for-live-demo-only#
const routes = [{
    path: 'tab-page', component: DynamicTabDemoComponent
}];
*/
@NgModule({
    imports: [
        TabContentModule, JigsawTabsModule, JigsawButtonModule, JigsawDemoDescriptionModule,
        JigsawInputModule, TableContentModule, TableInTabModule, RouterModule/* #for-live-demo-only# .forRoot(routes) */
    ],
    declarations: [DynamicTabDemoComponent],
    exports: [DynamicTabDemoComponent]
})
export class DynamicTabDemoModule {
}
