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
