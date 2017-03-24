import {NgModule, Component} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'rdk-demo-list', templateUrl: 'demo-list.html'
})
export class DemoListComponent {

}

const demoListRoutes=[
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home', component: DemoListComponent
    },
    {
        path:'button',
        loadChildren:'./component/button/button-demo.module#ButtonDemoModule'
    },
    {
        path:'table',
        loadChildren:'./component/table/table-demo.module#TableDemoModule'
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
