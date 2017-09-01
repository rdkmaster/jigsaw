import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListBasicDemoModule} from "./basic/app.module";
import {ListBasicDemoComponent} from "./basic/app.component";

const routeConfig = [
    {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full'
    },
    {
        path: 'basic',
        component: ListBasicDemoComponent
    },
    {
        path: '**',
        component: ListBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routeConfig),
        ListBasicDemoModule
    ]
})
export class ListDemoModule{

}
