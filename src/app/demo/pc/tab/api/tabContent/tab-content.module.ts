import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { JigsawButtonModule } from "jigsaw/pc-components/button/button";
import { JigsawInputModule } from "jigsaw/pc-components/input/input";
import { TabContentComponent, TabContentDefine } from "./tabContent";

const routes=[
    {
        path:'', component: TabContentComponent, outlet: 'tab-page'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        JigsawButtonModule, JigsawInputModule
    ],
    declarations: [
        TabContentComponent, TabContentDefine
    ],
    entryComponents: [ TabContentDefine, TabContentComponent ]
})
export class TabContentModule { }
