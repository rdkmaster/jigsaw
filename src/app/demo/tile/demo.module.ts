import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TileSelectFullDemoModule} from "./full/app.module";
import {TileSelectLabelFieldDemoModule} from "./label-field/app.module";
import {TileSelectMultiSelectDemoModule} from "./multiple-select/app.module";
import {TileSelectSelectedItemsDemoModule} from "./selected-items/app.module";
import {TileSelectItemsChangeDemoModule} from "./selected-items-change/app.module";
import {TileSelectOptionWidthDemoModule} from "./tile-option-width/app.module";
import {TileSelectTrackItemByDemoModule} from "./track-item-by/app.module";

import {TileSelectFullDemoComponent} from "./full/app.component";
import {TileSelectTrackItemByDemoComponent} from "./track-item-by/app.component";
import {TileSelectSelectedItemsComponent} from "./selected-items/app.component";
import {TileSelectMultipleSelectDemoComponent} from "./multiple-select/app.component";
import {TileSelectOptionWidthComponent} from "./tile-option-width/app.component";
import {TileSelectLabelFieldComponent} from "./label-field/app.component";
import {TileSelecItemsChangeComponent} from "./selected-items-change/app.component";


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
