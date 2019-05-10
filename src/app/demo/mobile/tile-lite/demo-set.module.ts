import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TileLiteBasicDemoComponent} from "./basic/demo.component";
import {TileLiteBasicDemoModule} from "./basic/demo.module";
import {ListMobileDemoModule} from "../list/demo-set.module";

export const routerConfig = [
    {
        path: 'basic', component: TileLiteBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TileLiteBasicDemoModule
    ]
})
export class TileLiteMobileDemoModule { }
