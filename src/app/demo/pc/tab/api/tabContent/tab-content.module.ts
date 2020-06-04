import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import {JigsawButtonModule, JigsawInputModule} from "jigsaw/public_api";
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
