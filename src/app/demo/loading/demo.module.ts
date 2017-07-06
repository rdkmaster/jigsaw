import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {DefinedLoadingDemoComponent } from "./userDefined/userDefined";
import {LoadingDemoComponent} from "./basic/loading";
import {DefinedLoading} from "./userDefined/definedLoading/definedLoading";
import {BallLoadingDemoComponent} from "./ballLoading/loading";
import {DomInnerDemoComponent} from "./domInner/domInner";
import {ColorfulLoadingDemoComponent} from "./color/color";

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
        JigsawLoadingModule,
        JigsawButtonModule,
        JigsawInputModule,
        RouterModule.forChild(loadingDemoRoutes)
    ],
    providers: [LoadingService, PopupService],
    entryComponents:[DefinedLoading]
})
export class LoadingDemoModule {
}
