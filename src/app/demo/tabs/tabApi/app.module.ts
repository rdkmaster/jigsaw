import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawInputModule } from "jigsaw/component/input/input";
import { JigsawTabsModule } from "jigsaw/component/tabs/index";

import { DynamicTabDemoComponent }  from './app.component';
import { TabContentModule } from "./tabContent/tab-content.module";
import { TabContentDefine, TabContentComponent } from "./tabContent/tabContent";

/* #for-live-demo-only#
const routes = [{
    path: 'tabPage', component: DynamicTabDemoComponent
}];
*/
@NgModule({
    imports: [
        TabContentModule, JigsawTabsModule, JigsawButtonModule,
        JigsawInputModule, RouterModule/* #for-live-demo-only# .forRoot(routes) */
    ],
    declarations: [ DynamicTabDemoComponent ],
    bootstrap: [ DynamicTabDemoComponent ]
})
export class DynamicTabDemoModule {}
