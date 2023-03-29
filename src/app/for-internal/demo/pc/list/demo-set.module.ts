import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFullDemoModule} from "./full/demo.module";

import {ListFullDemoComponent} from "./full/demo.component";
import { ListTrackItemByDemoComponent } from "./track-item-by/demo.component";
import { ListTrackItemByDemoModule } from "./track-item-by/demo.module";

export const routerConfig = [
    {
        path: 'full', component: ListFullDemoComponent
    },
    {
        path: 'track-item-by', component: ListTrackItemByDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ListFullDemoModule,
        ListTrackItemByDemoModule
    ]
})
export class ListDemoModule{

}
