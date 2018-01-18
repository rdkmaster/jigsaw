import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TileSelectFullDemoModule} from "./full/demo.module";
import {TileSelectLabelFieldDemoModule} from "./label-field/demo.module";
import {TileSelectMultiSelectDemoModule} from "./multiple-select/demo.module";
import {TileSelectSelectedItemsDemoModule} from "./selected-items/demo.module";
import {TileSelectItemsChangeDemoModule} from "./selected-items-change/demo.module";
import {TileSelectOptionWidthDemoModule} from "./tile-option-width/demo.module";
import {TileSelectTrackItemByDemoModule} from "./track-item-by/demo.module";

import {TileSelectFullDemoComponent} from "./full/demo.component";
import {TileSelectTrackItemByDemoComponent} from "./track-item-by/demo.component";
import {TileSelectSelectedItemsComponent} from "./selected-items/demo.component";
import {TileSelectMultipleSelectDemoComponent} from "./multiple-select/demo.component";
import {TileSelectOptionWidthComponent} from "./tile-option-width/demo.component";
import {TileSelectLabelFieldComponent} from "./label-field/demo.component";
import {TileSelecItemsChangeComponent} from "./selected-items-change/demo.component";


export const routerConfig = [
    {
        path: 'full', component: TileSelectFullDemoComponent, recommended: true
    },
    {
        path: 'track-item-by', component: TileSelectTrackItemByDemoComponent
    },
    {
        path: 'selected-items', component: TileSelectSelectedItemsComponent
    },
    {
        path: 'multiple-select', component: TileSelectMultipleSelectDemoComponent
    },
    {
        path: 'tile-option-width', component: TileSelectOptionWidthComponent
    },
    {
        path: 'label-field', component: TileSelectLabelFieldComponent
    },
    {
        path: 'selected-items-change', component: TileSelecItemsChangeComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TileSelectFullDemoModule, TileSelectLabelFieldDemoModule, TileSelectMultiSelectDemoModule,
        TileSelectSelectedItemsDemoModule, TileSelectItemsChangeDemoModule,
        TileSelectOptionWidthDemoModule, TileSelectTrackItemByDemoModule
    ]
})
export class TileSelectDemoModule { }
