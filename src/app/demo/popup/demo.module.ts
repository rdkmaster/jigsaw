import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupServiceIntroduceComponent} from "./introduce/app.component";
import {PopupServiceIntroduceModule} from "./introduce/app.module";

export const routerConfig = [
    {
        path: 'introduce', component: PopupServiceIntroduceComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), PopupServiceIntroduceModule
    ],
})
export class PopupServiceModule {
}
