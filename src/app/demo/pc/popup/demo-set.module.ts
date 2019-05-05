import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupServiceIntroduceComponent} from "./introduce/demo.component";
import {PopupServiceIntroduceModule} from "./introduce/demo.module";
import {PopupZIndexDemoComponent} from "./z-index/demo.component";
import {PopupZIndexDemoModule} from "./z-index/demo.module";

export const routerConfig:any = [
    {
        path: 'introduce', component: PopupServiceIntroduceComponent
    },
    {
        path: 'z-index', component: PopupZIndexDemoComponent
    },
    {
        desc: 'alert', url: '/alert/popup', path: ''
    },
    {
        desc: 'dialog', url: '/dialog/buttons', path: ''
    },
    {
        desc: 'combo-select', url: '/combo-select/full', path: ''
    },
    {
        desc: 'select', url: '/select/full', path: ''
    },
    {
        desc: 'loading', url: '/loading/full', path: ''
    },
    {
        desc: 'tooltip', url: '/tooltip/inline', path: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), PopupServiceIntroduceModule, PopupZIndexDemoModule
    ],
})
export class PopupServiceModule {
}
