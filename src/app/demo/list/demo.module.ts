import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFullDemoModule} from "./full/app.module";

import {ListFullDemoComponent} from "./full/app.component";

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
