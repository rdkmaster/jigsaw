import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TileSelectFullDemoModule} from "./full/app.module";
import {TileSelectLabelFieldDemoModule} from "./label-field/app.module";
import {TileSelectMultiSelectDemoModule} from "./multiple-select/app.module";
import {TileSelectSelectedItemsDemoModule} from "./selected-items/app.module";
import {TileSelectItemsChangeDemoModule} from "./selected-items-change/app.module";
import {TileSelectOptionWidthDemoModule} from "./tile-option-width/app.module";
import {TileSelectTrackItemByDemoModule} from "./track-item-by/app.module";

import {TileselectFullDemoComponent} from "./full/app.component";
import {TileselectTrackItemByDemoComponent} from "./track-item-by/app.component";
import {TileselectSelectedItemsComponent} from "./selected-items/app.component";
import {TileselectMultipleSelectDemoComponent} from "./multiple-select/app.component";
import {TileselectOptionWidthComponent} from "./tile-option-width/app.component";
import {TileselectLabelFieldComponent} from "./label-field/app.component";
import {TileselecItemsChangeComponent} from "./selected-items-change/app.component";


export const routerConfig = [
    {
        path: 'full', component: TileselectFullDemoComponent, recommended: true
    },
    {
        path: 'track-item-by', component: TileselectTrackItemByDemoComponent
    },
    {
        path: 'selected-items', component: TileselectSelectedItemsComponent
    },
    {
        path: 'multiple-select', component: TileselectMultipleSelectDemoComponent
    },
    {
        path: 'tile-option-width', component: TileselectOptionWidthComponent
    },
    {
        path: 'label-field', component: TileselectLabelFieldComponent
    },
    {
        path: 'selected-items-change', component: TileselecItemsChangeComponent
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
