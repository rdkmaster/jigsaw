import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RateFullModule} from "./full/demo.module";
import {RateFullComponent} from "./full/demo.component";
import {ListMobileDemoModule} from "../list/demo-set.module";

export const routerConfig = [
    {
        path: 'full', component: RateFullComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        RateFullModule
    ]
})
export class RateMobileDemoModule {
}
