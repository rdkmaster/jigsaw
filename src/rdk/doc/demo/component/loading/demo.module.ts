import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoadingDemoComponent } from "./basic/basic";
import {LoadingSetclassDemoComponent } from "./setclass/setclass";
import {LoadingService } from "../../../../service/loading.service"
import { LoadingServiceComponent } from "../../../../service/loading.service"
import {PopupService} from "../../../../service/popup.service";
import {RdkLoading, RdkLoadingModule} from "../../../../component/loading/loading";
import {Loading2DemoComponent} from "./loading2/loading";
const loadingDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: LoadingDemoComponent
    },
    {
        path: 'setclass', component: LoadingSetclassDemoComponent
    },
    {
        path: 'loading2', component: Loading2DemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: LoadingDemoComponent
    }
];

@NgModule({
    declarations: [
        LoadingDemoComponent,LoadingServiceComponent,LoadingSetclassDemoComponent, Loading2DemoComponent
    ],
    imports: [
        RouterModule.forChild(loadingDemoRoutes), RdkLoadingModule
    ],
    providers: [LoadingService, PopupService],
    entryComponents:[LoadingServiceComponent, RdkLoading]
})
export class LoadingDemoModule {
}
