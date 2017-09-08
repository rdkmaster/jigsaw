import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {TileselectFullDemoComponent} from "../../live-demo/tile/tile-full/app.component";
import {TileSelectFullDemoModule} from "../../live-demo/tile/tile-full/app.module";

import {TileselectLabelFieldComponent} from "./labelField/app.component";
import {TileSelectLabelFieldDemoModule} from "./labelField/app.module";

import {TileselectMultipleSelectDemoComponent} from "./multipleSelect/app.component";
import {TileSelectMultiSelectDemoModule} from "./multipleSelect/app.module";

import {TileselectSelectedItemsComponent} from "./selectedItems/app.component";
import {TileSelectSelectedItemsDemoModule} from "./selectedItems/app.module";

import {TileselecItemsChangeComponent} from "./selectedItemsChange/app.component";
import {TileSelectItemsChangeDemoModule} from "./selectedItemsChange/app.module";

import {TileselectOptionWidthComponent} from "./tileOptionWidth/app.component";
import {TileSelectOptionWidthDemoModule} from "./tileOptionWidth/app.module";

import {TileselectTrackItemByDemoComponent} from "./trackitemby/app.component"
import {TileSelectTrackItemByDemoModule} from "./trackitemby/app.module"

const inputDemoRoutes=[
    {
        path:'tile-full', component: TileselectFullDemoComponent
    },
    {
        path:'trackitemby', component: TileselectTrackItemByDemoComponent
    },
    {
        path:'selectedItems', component: TileselectSelectedItemsComponent
    },
    {
        path:'multipleSelect', component: TileselectMultipleSelectDemoComponent
    },
    {
        path:'tileOptionWidth', component: TileselectOptionWidthComponent
    },
    {
        path:'labelField', component: TileselectLabelFieldComponent
    },
    {
        path:'selectedItemsChange', component: TileselecItemsChangeComponent
    },
    {
        path:'**', //fallback router must in the last
        component: TileselectFullDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(inputDemoRoutes),
        TileSelectFullDemoModule, TileSelectLabelFieldDemoModule, TileSelectMultiSelectDemoModule,
        TileSelectSelectedItemsDemoModule, TileSelectItemsChangeDemoModule,
        TileSelectOptionWidthDemoModule, TileSelectTrackItemByDemoModule
    ]
})
export class TileSelectDemoModule { }
