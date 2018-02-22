import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupServiceIntroduceComponent} from "./introduce/demo.component";
import {PopupServiceIntroduceModule} from "./introduce/demo.module";

export const routerConfig:any = [
    {
        path: 'introduce', component: PopupServiceIntroduceComponent
    },
    {
        desc: 'alert', url: '/alert/popup'
    },
    {
        desc: 'dialog', url: '/dialog/buttons'
    },
    {
        desc: 'combo-select', url: '/combo-select/full'
    },
    {
        desc: 'select', url: '/select/full'
    },
    {
        desc: 'loading', url: '/loading/full'
    },
    {
        desc: 'tooltip', url: '/tooltip/inline'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), PopupServiceIntroduceModule
    ],
})
export class PopupServiceModule {
}
