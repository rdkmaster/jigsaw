import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFullDemoModule} from "./full/demo.module";

import {ListFullDemoComponent} from "./full/demo.component";

export const routerConfig = [
    {
        path: 'full', component: ListFullDemoComponent, recommended: true
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ListFullDemoModule
    ]
})
export class ListDemoModule{

}
