import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DefinedLoadingDemoComponent } from "./userDefined/app.component";
import {LoadingBasicDemoComponent} from "./basic/app.component";
import {BallLoadingDemoComponent} from "./ballLoading/app.component";
import {DomInnerDemoComponent} from "./domInner/app.component";
import {ColorfulLoadingDemoComponent} from "./color/app.component";
import {BallLoadingDemoModule} from "./ballLoading/app.module";
import {DefinedLoadingDemoModule} from "./userDefined/app.module";
import {DomInnerDemoModule} from "./domInner/app.module";
import {ColorfulLoadingDemoModule} from "./color/app.module";
import {LoadingBasicDemoModule} from "./basic/app.module";

const loadingDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: LoadingBasicDemoComponent
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
        component: LoadingBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(loadingDemoRoutes),
        LoadingBasicDemoModule,
        BallLoadingDemoModule,
        DefinedLoadingDemoModule,
        DomInnerDemoModule,
        ColorfulLoadingDemoModule,
    ]
})
export class LoadingDemoModule {
}
