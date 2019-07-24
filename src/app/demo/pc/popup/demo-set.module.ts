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
        desc: 'alert', url: '/pc/alert/popup', path: ''
    },
    {
        desc: 'dialog', url: '/pc/dialog/buttons', path: ''
    },
    {
        desc: 'combo-select', url: '/pc/combo-select/full', path: ''
    },
    {
        desc: 'select', url: '/pc/select/full', path: ''
    },
    {
        desc: 'loading', url: '/pc/loading/full', path: ''
    },
    {
        desc: 'tooltip', url: '/pc/tooltip/inline', path: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), PopupServiceIntroduceModule, PopupZIndexDemoModule
    ],
})
export class PopupServiceModule {
}
