import {NgModule, Component} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'rdk-demo-list', templateUrl: 'demo-list.html',
    styles: ['li {display: inline-block; margin-right: 12px;}']
})
export class DemoListComponent {

}

const demoListRoutes=[
    {
        path:'', component: DemoListComponent
    },
    {
        path:'button',
        loadChildren:'./component/button/button-demo.module#ButtonDemoModule'
    },
    {
        path:'checkbox',
        loadChildren:'./component/checkbox/checkbox-demo.module#CheckBoxDemoModule'
    },
    {
        path:'table',
        loadChildren:'./component/table/table-demo.module#TableDemoModule'
    },
    {
        path:'popup',
        loadChildren:'./component/popup/popup-demo.module#PopupDemoModule'
    },
    {
        path:'input',
        loadChildren:'./component/input/input-demo.module#InputDemoModule'
    },
    {
        path:'scrollbar',
        loadChildren:'./component/scrollbar/scrollbar-demo.module#ScrollbarDemoModule'
    },
    {
        path:'select',
        loadChildren:'./component/select/select-demo.module#SelectDemoModule'
    },
    {
        path:'graph',
        loadChildren:'./component/graph/graph-demo.module#GraphDemoModule'
    },
    {
        path:'**', //fallback router must in the last
        component: DemoListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(demoListRoutes)
    ],
    exports: [],
    declarations: [
        DemoListComponent
    ],
    providers: [],
})
export class DemoListModule { }
