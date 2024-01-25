import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFullDemoModule} from "./full/demo.module";

import {ListFullDemoComponent} from "./full/demo.component";
import { ListTrackItemByDemoComponent } from "./track-item-by/demo.component";
import { ListTrackItemByDemoModule } from "./track-item-by/demo.module";
import { ListOptionsDemoModule } from "./options/demo.module";
import { ListOptionsDemoComponent } from "./options/demo.component";

export const routerConfig = [
    {
        path: 'full', component: ListFullDemoComponent
    },
    {
        path: 'track-item-by', component: ListTrackItemByDemoComponent
    },
    {
        path: 'options', component: ListOptionsDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ListFullDemoModule,
        ListTrackItemByDemoModule,
        ListOptionsDemoModule
    ]
})
export class ListDemoModule{

}
