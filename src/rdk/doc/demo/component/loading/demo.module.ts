import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoadingDemoComponent } from "./basic/basic";
import {LoadingService } from "../../../../service/loading.service"
import { LoadingServiceComponent } from "../../../../service/loading.service"
const loadingDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: LoadingDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: LoadingDemoComponent
    }
];

@NgModule({
    declarations: [
        LoadingDemoComponent,LoadingServiceComponent
    ],
    imports: [
        RouterModule.forChild(loadingDemoRoutes)
    ],
    exports: [
        LoadingDemoComponent,LoadingServiceComponent
    ],
    providers: [LoadingService],
    entryComponents:[LoadingServiceComponent]
})
export class LoadingDemoModule {
}
