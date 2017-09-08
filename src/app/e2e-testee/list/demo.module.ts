import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFullDemoModule} from "../../live-demo/list/list-full/app.module";
import {ListFullDemoComponent} from "../../live-demo/list/list-full/app.component";

const routeConfig = [
    {
        path: 'list-full',
        component: ListFullDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: ListFullDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routeConfig),
        ListFullDemoModule
    ]
})
export class ListDemoModule{

}
