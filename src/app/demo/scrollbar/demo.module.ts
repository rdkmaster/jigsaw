import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JigsawScrollBarModule} from "jigsaw/component/scrollbar/scrollbar";
import {ScrollbarBasicDemoComponent} from "./basic/basic";
import {ScrollbarUserdefineDemoComponent} from "./user-define/user-define";
import {ScrollbarSetOptionsDemoComponent} from "./setOptions/setOptions";

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
    declarations: [
        ScrollbarBasicDemoComponent,ScrollbarUserdefineDemoComponent,ScrollbarSetOptionsDemoComponent
    ],
    imports: [
        RouterModule.forChild(scrollbarDemoRoutes), JigsawScrollBarModule
    ],
    exports: [
        ScrollbarBasicDemoComponent,ScrollbarUserdefineDemoComponent,ScrollbarSetOptionsDemoComponent
    ],
    providers: []
})
export class ScrollbarDemoModule { }
