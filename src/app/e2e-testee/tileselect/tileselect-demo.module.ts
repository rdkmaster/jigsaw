import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TileselectBasicDemoComponent} from "./basic/basic";
import {CommonModule} from '@angular/common';//todo 使用ng-for时需要引用
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TileselectTrackitembyDemoComponent } from "./trackitemby/trackitemby"
import {TileselectSelectedItemsComponent} from "./selectedItems/selectedItems";
import {TileselectMultipleSelectDemoComponent} from "./multipleSelect/multipleSelect";
import {TileselectOptionWidthComponent} from "./tileOptionWidth/tileOptionWidth";
import {TileselectSearchableComponent} from "./searchable/searchable";
import {TileselectLabelFieldComponent} from "./labelField/labelField";
import {TileselecItemsChangeComponent} from "./selectedItemsChange/selectedItemsChange";
const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: TileselectBasicDemoComponent
    },
    {
        path:'trackitemby', component: TileselectTrackitembyDemoComponent
    },{
        path:'SelectedItems', component: TileselectSelectedItemsComponent
    },{
        path:'MultipleSelect', component: TileselectMultipleSelectDemoComponent
    },{
        path:'tileOptionWidth', component: TileselectOptionWidthComponent
    },{
        path:'searchable', component: TileselectSearchableComponent
    },{
        path:'labelField', component: TileselectLabelFieldComponent
    },{
        path:'ItemsChange', component: TileselecItemsChangeComponent
    },
    {
        path:'**', //fallback router must in the last
        component: TileselectBasicDemoComponent
    }
];



@NgModule({
    declarations: [
        TileselectBasicDemoComponent,TileselectTrackitembyDemoComponent,TileselectSelectedItemsComponent
        ,TileselectMultipleSelectDemoComponent,TileselectOptionWidthComponent,TileselectSearchableComponent
        ,TileselectLabelFieldComponent,TileselecItemsChangeComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), JigsawTileSelectModule,CommonModule
    ],
    exports: [
        TileselectBasicDemoComponent,TileselectTrackitembyDemoComponent
    ],
    providers: []
})
export class TileSelectDemoModule { }
