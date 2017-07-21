import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";
import { TabContentComponent, TabContentDefine } from "./tabContent";

const routes=[
    {
        path:'', component: TabContentComponent, outlet: 'tabPage'
    }
];

@NgModule({
    imports: [
        JigsawButtonModule, JigsawInputModule
    ],
    declarations: [
        TabContentComponent, TabContentDefine
    ],
    entryComponents: [ TabContentDefine, TabContentComponent ]
})
export class TabContentModule { }
