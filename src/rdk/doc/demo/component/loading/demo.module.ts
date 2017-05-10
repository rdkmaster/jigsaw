import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DefinedLoadingDemoComponent } from "./userDefined/userDefined";
import {LoadingService } from "../../../../service/loading.service"
import {RdkLoading} from "../../../../component/loading/loading";
import {LoadingDemoComponent} from "./basic/loading";
import {PopupService} from "../../../../service/popup.service";
import {DefinedLoading} from "./userDefined/definedLoading/definedLoading";
const loadingDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: LoadingDemoComponent
    },
    {
        path: 'userDefined', component: DefinedLoadingDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: LoadingDemoComponent
    }
];

@NgModule({
    declarations: [
        LoadingDemoComponent,DefinedLoadingDemoComponent, RdkLoading, DefinedLoading
    ],
    imports: [
        RouterModule.forChild(loadingDemoRoutes)
    ],
    providers: [LoadingService, PopupService],
    entryComponents:[RdkLoading, DefinedLoading]
})
export class LoadingDemoModule {
}
