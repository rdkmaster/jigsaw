import { ExampleDemoComponent } from './demo/pc/example/demo.component';
import {AlertDemoComponent} from "./demo/pc/alert/demo.component";
import {HeaderDemoComponent} from "./demo/pc/header/demo.component";
import {BreadcrumbAllComponent} from "./demo/pc/breadcrumb/demo.component";
import {BreadcrumbRouterList} from "./demo/pc/breadcrumb/router/list/list";
import {BreadcrumbRouterDetail} from "./demo/pc/breadcrumb/router/detail/detail";
import {BreadcrumbRouterBuy} from "./demo/pc/breadcrumb/router/buy/buy";
import {ButtonAllComponent} from "./demo/pc/button/demo.component";
import {CheckBoxDemoComponent} from "./demo/pc/checkbox/demo.componet";
import {RadioGroupDemoComponent} from "./demo/pc/radio/demo.component";

export const routerConfigPC = [
    { path: "pc/example", component: ExampleDemoComponent },
    { path: "pc/alert", component: AlertDemoComponent},
    {
        path: "pc/breadcrumb", component: BreadcrumbAllComponent,
        children: [
            {
                path: 'list/:typeId', component: BreadcrumbRouterList
            },
            {
                path: 'detail/:id', component: BreadcrumbRouterDetail
            },
            {
                path: 'buy/:id', component: BreadcrumbRouterBuy
            }
        ]
    },
    {path: "pc/button", component: ButtonAllComponent},
    {path: "pc/header", component: HeaderDemoComponent},
    {path: "pc/checkbox", component: CheckBoxDemoComponent},
    {path: "pc/radio-group", component: RadioGroupDemoComponent}
];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
