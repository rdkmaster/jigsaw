
import {DemoListComponent} from "./demo-list.component";

export const demoListRoutes=[
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
        path:'**', //fallback router must in the last
        component: DemoListComponent
    }
];
