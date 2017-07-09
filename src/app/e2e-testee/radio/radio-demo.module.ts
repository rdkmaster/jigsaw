import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';//todo 使用ng-for时需要引用
import { JigsawRadioModule } from "jigsaw/component/radio/radio";
import {RadioBasicDemoComponent} from "./basic/basic";
import {RadioLabelFieldDemoComponent} from "./labelField/labelField";
import {RadioTrackItemByDemoComponent} from "./trackItemBy/trackItemBy";

const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: RadioBasicDemoComponent
    },
    {
        path:'labelField', component:RadioLabelFieldDemoComponent
    },
    {
        path:'trackItemBy', component:RadioTrackItemByDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: RadioBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        RadioBasicDemoComponent,RadioLabelFieldDemoComponent,RadioTrackItemByDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), JigsawRadioModule,CommonModule
    ],
    exports: [
        RadioBasicDemoComponent
    ],
    providers: []
})
export class RadioDemoModule { }
