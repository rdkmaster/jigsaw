import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagBasicDemoModule} from "./basic/app.module";

import {TagBasicDemoComponent} from "./basic/app.component";

export const routerConfig = [
    {
        path: 'basic', component: TagBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TagBasicDemoModule
    ]
})
export class TagDemoModule {
}
