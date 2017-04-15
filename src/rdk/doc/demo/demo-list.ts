import {NgModule, Component} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'rdk-demo-list', templateUrl: 'demo-list.html',
    styles: ['li {display: inline-block; margin-right: 12px;}']
})
export class DemoListComponent {

}

// 请按照组件的字符序排列
const demoListRoutes=[
    {
        path:'', component: DemoListComponent
    },
    {
        path:'array-collection',
        loadChildren:'./component/array-collection/demo.module#ArrayCollectionDemoModule'
    },
    {
        path:'button',
        loadChildren:'./component/button/demo.module#ButtonDemoModule'
    },
    {
        path:'checkbox',
        loadChildren:'./component/checkbox/demo.module#CheckBoxDemoModule'
    },
    {
        path:'input',
        loadChildren:'./component/input/demo.module#InputDemoModule'
    },
    {
        path:'popup',
        loadChildren:'./component/popup/demo.module#PopupDemoModule'
    },
    {
        path:'scrollbar',
        loadChildren:'./component/scrollbar/demo.module#ScrollbarDemoModule'
    },
    {
        path:'select',
        loadChildren:'./component/select/demo.module#SelectDemoModule'
    },
    {
        path:'table',
        loadChildren:'./component/table/demo.module#TableDemoModule'
    },
    {
        path:'switch',
        loadChildren:'./component/switch/switch-demo.module#SwitchDemoModule'
    },
    {
        path:'time',
        loadChildren:'./component/time/time-demo.module#TimeDemoModule'
    },
    {
        path:'radio',
        loadChildren:'./component/radio/radio-demo.module#RadioDemoModule'
    },
    {
        path:'tileselect',
        loadChildren:'./component/tileselect/tileselect-demo.module#TileSelectDemoModule'
    },
    {
        path:'graph',
        loadChildren:'./component/graph/graph-demo.module#GraphDemoModule'
    },
    {
        path:'pagination',
        loadChildren:'./component/pagination/pagination-demo.module#PaginationDemoModule'
    },
    {
        path:'tag',
        loadChildren:'./component/tag/tag-demo.module#TagDemoModule'
    },
    {
        path:'tabs',
        loadChildren:'./component/tabs/tabs-demo.module#TabsDemoModule'
    },
    {
        path:'dropdown',
        loadChildren:'./component/dropdown/dropdown-demo.module#DropDownDemoModule'
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
