import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ScrollbarBasicDemoComponent} from "./basic/app.component";
import {ScrollbarBasicDemoModule} from "./basic/app.module";

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
        path:'**', //fallback router must in the last
        component: ScrollbarBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(scrollbarDemoRoutes),
        ScrollbarBasicDemoModule,
    ]
})
export class ScrollbarDemoModule { }
