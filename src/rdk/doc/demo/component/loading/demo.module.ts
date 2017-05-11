import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DefinedLoadingDemoComponent } from "./userDefined/userDefined";
import {LoadingService } from "../../../../service/loading.service"
import {RdkBarLoading, RdkLoading} from "../../../../component/loading/loading";
import {LoadingDemoComponent} from "./basic/loading";
import {PopupService} from "../../../../service/popup.service";
import {DefinedLoading} from "./userDefined/definedLoading/definedLoading";
import {BarLoadingDemoComponent} from "./barLoading/loading";
const loadingDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: LoadingDemoComponent
    },
    {
        path: 'barLoading', component: BarLoadingDemoComponent
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
        LoadingDemoComponent, BarLoadingDemoComponent,DefinedLoadingDemoComponent, RdkLoading, RdkBarLoading, DefinedLoading
    ],
    imports: [
        RouterModule.forChild(loadingDemoRoutes)
    ],
    providers: [LoadingService, PopupService],
    entryComponents:[RdkLoading, RdkBarLoading, DefinedLoading]
})
export class LoadingDemoModule {
}
