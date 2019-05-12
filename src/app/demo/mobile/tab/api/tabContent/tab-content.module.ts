import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
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
