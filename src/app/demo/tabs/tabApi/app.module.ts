import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawInputModule } from "jigsaw/component/input/input";
import { JigsawTabsModule } from "jigsaw/component/tabs/index";

import { DynamicTabDemoComponent }  from './app.component';
import { TabContentDefine } from "./tabContent/tabContent";

@NgModule({
    imports: [ JigsawTabsModule, JigsawButtonModule, JigsawInputModule, RouterModule ],
    declarations: [ DynamicTabDemoComponent, TabContentDefine ],
    bootstrap: [ DynamicTabDemoComponent ],
    entryComponents: [TabContentDefine]
})
export class DynamicTabDemoModule {}
