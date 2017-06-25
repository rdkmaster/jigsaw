import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {DefinedLoadingDemoComponent } from "./userDefined/userDefined";
import {LoadingDemoComponent} from "./basic/loading";
import {DefinedLoading} from "./userDefined/definedLoading/definedLoading";
import {BallLoadingDemoComponent} from "./ballLoading/loading";
import {DomInnerDemoComponent} from "./domInner/domInner";
import {ColorfulLoadingDemoComponent} from "./color/color";
import {RdkBlock, RdkBlockModule} from "../../../rdk/component/block/block";
import {RdkBallLoading, RdkLoading, RdkLoadingModule} from "../../../rdk/component/loading/loading";
import {RdkButtonModule} from "../../../rdk/component/button/button";
import {LoadingService} from "../../../rdk/service/loading.service";
import {PopupService} from "../../../rdk/service/popup.service";

const loadingDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: LoadingDemoComponent
    },
    {
        path: 'ballLoading', component: BallLoadingDemoComponent
    },
    {
        path: 'userDefined', component: DefinedLoadingDemoComponent
    },
    {
        path: 'domInner', component: DomInnerDemoComponent
    },
    {
        path: 'color', component: ColorfulLoadingDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: LoadingDemoComponent
    }
];

@NgModule({
    declarations: [
        LoadingDemoComponent,
        BallLoadingDemoComponent,
        DefinedLoadingDemoComponent,
        DomInnerDemoComponent,
        DefinedLoading,
        ColorfulLoadingDemoComponent,
    ],
    imports: [
        CommonModule,
        RdkBlockModule,
        RdkLoadingModule,
        RdkButtonModule,
        RouterModule.forChild(loadingDemoRoutes)
    ],
    providers: [LoadingService, PopupService],
    entryComponents:[RdkBlock, RdkLoading, RdkBallLoading, DefinedLoading]
})
export class LoadingDemoModule {
}
