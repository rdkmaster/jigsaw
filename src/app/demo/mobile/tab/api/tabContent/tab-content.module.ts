import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawMobileButtonModule, JigsawMobileInputModule} from "jigsaw/mobile_public_api";
import {TabContentComponent, TabContentDefine} from "./tabContent";

const routes = [
    {
        path: '', component: TabContentComponent, outlet: 'tab-page'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        JigsawMobileButtonModule, JigsawMobileInputModule
    ],
    declarations: [
        TabContentComponent, TabContentDefine
    ],
    entryComponents: [TabContentDefine, TabContentComponent]
})
export class TabMobileContentModule {
}
