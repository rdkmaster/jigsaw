import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListLiteBasicDemoComponent} from "./basic/demo.component";
import {ListLiteBasicDemoModule} from "./basic/demo.module";
import {ListLiteOptionCountDemoModule} from "./option-count/demo.module";
import {ListLiteOptionCountDemoComponent} from "./option-count/demo.component";
import {ListLitePresetValueDemoComponent} from "./preset-value/demo.component";
import {ListLitePresetValueDemoModule} from "./preset-value/demo.module";
import {ListLiteSearchableDemoComponent} from "./searchable/demo.component";
import {ListLiteSearchableDemoModule} from "./searchable/demo.module";
import {ListLiteFullDemoComponent} from "./full/demo.component";
import {ListLiteFullDemoModule} from "./full/demo.module";
import {ListLiteLineEllipsisDemoComponent} from "./line-ellipsis/demo.component";
import {ListLiteLineEllipsisDemoModule} from "./line-ellipsis/demo.module";
import {ListMobileDemoModule} from "../list/demo-set.module";

export const routerConfig = [
    {
        path: 'full', component: ListLiteFullDemoComponent
    },
    {
        path: 'basic', component: ListLiteBasicDemoComponent
    },
    {
        path: 'option-count', component: ListLiteOptionCountDemoComponent
    },
    {
        path: 'preset-value', component: ListLitePresetValueDemoComponent
    },
    {
        path: 'searchable', component: ListLiteSearchableDemoComponent
    },
    {
        path: 'line-ellipsis', component: ListLiteLineEllipsisDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ListLiteBasicDemoModule,
        ListLiteOptionCountDemoModule,
        ListLitePresetValueDemoModule,
        ListLiteSearchableDemoModule,
        ListLiteFullDemoModule,
        ListLiteLineEllipsisDemoModule
    ]
})
export class ListLiteMobileDemoModule{

}
