
import {ButtonBasicDemoComponent} from "./basic/basic";
import {ButtonDisableDemoComponent} from "./disabled/disabled";

export const buttonDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: ButtonBasicDemoComponent
    },
    {
        path:'disable', component: ButtonDisableDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: ButtonBasicDemoComponent
    }
];
