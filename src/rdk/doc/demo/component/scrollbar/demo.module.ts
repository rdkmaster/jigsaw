import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ScrollbarBasicDemoComponent} from "./basic/basic";
import {ScrollbarUserdefineDemoComponent} from "./user-define/user-define";
import {RdkScrollBarModule} from "../../../../component/scrollbar/scrollbar";

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
        path:'**', //fallback router must in the last
        component: ScrollbarBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        ScrollbarBasicDemoComponent,ScrollbarUserdefineDemoComponent
    ],
    imports: [
        RouterModule.forChild(scrollbarDemoRoutes), RdkScrollBarModule
    ],
    exports: [
        ScrollbarBasicDemoComponent,ScrollbarUserdefineDemoComponent
    ],
    providers: []
})
export class ScrollbarDemoModule { }
