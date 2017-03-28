import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TileselectBasicDemoComponent} from "./basic/basic";
import {CommonModule} from '@angular/common';//todo 使用ng-for时需要引用
import { RdkTileSelectModule } from "../../../../component/tile-select/tile-select";
import { TileselectTrackitembyDemoComponent } from "./trackitemby/trackitemby"
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
    },
    {
        path:'**', //fallback router must in the last
        component: TileselectBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        TileselectBasicDemoComponent,TileselectTrackitembyDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), RdkTileSelectModule,CommonModule
    ],
    exports: [
        TileselectBasicDemoComponent,TileselectTrackitembyDemoComponent
    ],
    providers: []
})
export class TileSelectDemoModule { }
