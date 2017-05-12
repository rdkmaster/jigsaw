import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {DefinedLoadingDemoComponent } from "./userDefined/userDefined";
import {LoadingService } from "../../../../service/loading.service"
import {RdkBallLoading, RdkLoading} from "../../../../component/loading/loading";
import {LoadingDemoComponent} from "./basic/loading";
import {PopupService} from "../../../../service/popup.service";
import {DefinedLoading} from "./userDefined/definedLoading/definedLoading";
import {BallLoadingDemoComponent} from "./ballLoading/loading";
import {DomInnerDemoComponent} from "./domInner/domInner";
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
        RdkLoading,
        RdkBallLoading,
        DefinedLoading
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(loadingDemoRoutes)
    ],
    providers: [LoadingService, PopupService],
    entryComponents:[RdkLoading, RdkBallLoading, DefinedLoading]
})
export class LoadingDemoModule {
}
