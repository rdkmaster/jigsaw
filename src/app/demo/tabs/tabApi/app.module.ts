import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawInputModule } from "jigsaw/component/input/input";
import { JigsawTabsModule } from "jigsaw/component/tabs/index";

import { DynamicTabDemoComponent }  from './app.component';
import { TabContentModule } from "./tabContent/tab-content.module";
import { TabContentDefine, TabContentComponent } from "./tabContent/tabContent";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path:'', component: TabContentComponent, outlet: 'tabPage'
            }
        ]),
        TabContentModule, JigsawTabsModule, JigsawButtonModule, JigsawInputModule
    ],
    declarations: [ DynamicTabDemoComponent ],
    bootstrap: [ DynamicTabDemoComponent ]
})
export class DynamicTabDemoModule {}
