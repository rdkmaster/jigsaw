import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoadingDemoComponent } from "./basic/basic";
import {LoadingSetclassDemoComponent } from "./setclass/setclass";
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
        path: 'setclass', component: LoadingSetclassDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: LoadingDemoComponent
    }
];

@NgModule({
    declarations: [
        LoadingDemoComponent,LoadingServiceComponent,LoadingSetclassDemoComponent
    ],
    imports: [
        RouterModule.forChild(loadingDemoRoutes)
    ],
    exports: [
        LoadingDemoComponent,LoadingServiceComponent,LoadingSetclassDemoComponent
    ],
    providers: [LoadingService],
    entryComponents:[LoadingServiceComponent]
})
export class LoadingDemoModule {
}
