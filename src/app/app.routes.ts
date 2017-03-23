

export const appRoutes=[
    {
        path:'',
        redirectTo:'demo',
        pathMatch:'full'
    },
    {
        path:'demo',
        loadChildren:'../rdk/doc/demo/demo-list.module#DemoListModule'
    },
    {
        path:'**',//fallback router must in the last
        loadChildren:'../rdk/doc/demo/demo-list.module#DemoListModule'
    }
];
