import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MenuFullDemoModule} from "../../live-demo/Menu/Menu-full/app.module";
import {MenuFullDemoComponent} from "../../live-demo/Menu/Menu-full/app.component";

const routeConfig = [
    {
        path: 'menu-full',
        component: MenuFullDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: MenuFullDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routeConfig),
        MenuFullDemoModule
    ]
})
export class MenuDemoModule {

}
