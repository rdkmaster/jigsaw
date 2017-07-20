import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ScrollbarBasicDemoComponent} from "./basic/app.component";
import {ScrollbarUserdefineDemoComponent} from "./user-define/app.component";
import {ScrollbarSetOptionsDemoComponent} from "./setOptions/app.component";
import {ScrollbarBasicDemoModule} from "./basic/app.module";
import {ScrollbarSetOptionsDemoModule} from "./setOptions/app.module";
import {ScrollbarUserdefineDemoModule} from "./user-define/app.module";

const scrollbarDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: ScrollbarBasicDemoComponent
    },
    {
        path:'user-define', component: ScrollbarUserdefineDemoComponent
    },
    {
        path:'setOptions', component: ScrollbarSetOptionsDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: ScrollbarBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(scrollbarDemoRoutes),
        ScrollbarBasicDemoModule,
        ScrollbarUserdefineDemoModule,
        ScrollbarSetOptionsDemoModule
    ]
})
export class ScrollbarDemoModule { }
