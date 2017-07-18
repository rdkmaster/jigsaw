import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {TabContentComponent} from "./tabContent";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";

const routes=[
    {
        path:'', component: TabContentComponent, outlet: 'tabPage'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        JigsawButtonModule,
        JigsawInputModule
    ],
    declarations: [
        TabContentComponent
    ]
})
export class TabContentModule { }
