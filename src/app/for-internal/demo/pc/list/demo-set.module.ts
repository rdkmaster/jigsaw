import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFullDemoModule} from "./full/demo.module";

import {ListFullDemoComponent} from "./full/demo.component";
import { ListTrackItemByDemoComponent } from "./track-item-by/demo.component";
import { ListTrackItemByDemoModule } from "./track-item-by/demo.module";
import { ListOptionsDemoModule } from "./options/demo.module";
import { ListOptionsDemoComponent } from "./options/demo.component";
import { ListMaxSelectionLimitDemoComponent } from "./max-selection-limit/demo.component";
import { ListMaxSelectionLimitDemoModule } from "./max-selection-limit/demo.module";

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
    {
        path: 'max-selection-limit', component: ListMaxSelectionLimitDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ListFullDemoModule,
        ListTrackItemByDemoModule,
        ListOptionsDemoModule,
        ListMaxSelectionLimitDemoModule
    ]
})
export class ListDemoModule{

}
