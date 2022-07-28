import { ExampleDemoComponent } from './demo/pc/example/demo.component';
import {AlertDemoComponent} from "./demo/pc/alert/demo.component";
import {AutoCompleteInputDemoComponent} from "./demo/pc/auto-complete-input/demo.component";
import {HeaderDemoComponent} from "./demo/pc/header/demo.component";
import {BreadcrumbAllComponent} from "./demo/pc/breadcrumb/demo.component";
import {BreadcrumbRouterList} from "./demo/pc/breadcrumb/router/list/list";
import {BreadcrumbRouterDetail} from "./demo/pc/breadcrumb/router/detail/detail";
import {BreadcrumbRouterBuy} from "./demo/pc/breadcrumb/router/buy/buy";
import {BadgeAllComponent} from "./demo/pc/badge/demo.component";
import {ButtonAllComponent} from "./demo/pc/button/demo.component";
import {CheckBoxDemoComponent} from "./demo/pc/checkbox/demo.componet";
import {ButtonBarAllComponent} from "./demo/pc/button-bar/demo.component";
import {RadioGroupDemoComponent} from "./demo/pc/radio/demo.component";
import {FishBoneAllComponent} from "./demo/pc/fish-bone/demo.component";
import {CascadeAllComponent} from "./demo/pc/cascade/demo.component";
import {SwitchDemoComponent} from "./demo/pc/switch/demo.component";
import {AlphabeticalIndexDemoComponent} from "./demo/pc/alphabetical-index/demo.component";
import {RateDemoComponent} from "./demo/pc/rate/demo.component";

export const routerConfigPC = [
    { path: "pc/example", component: ExampleDemoComponent },
    { path: "pc/alert", component: AlertDemoComponent },
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
    { path: "pc/auto-complete-input", component: AutoCompleteInputDemoComponent},
    { path: "pc/badge", component: BadgeAllComponent},
    { path: "pc/button-bar", component: ButtonBarAllComponent },
    { path: "pc/button", component: ButtonAllComponent },
    { path: "pc/cascade", component: CascadeAllComponent},
    { path: "pc/fish-bone", component: FishBoneAllComponent},
    { path: "pc/header", component: HeaderDemoComponent },
    { path: "pc/checkbox", component: CheckBoxDemoComponent },
    {path: "pc/radio-group", component: RadioGroupDemoComponent},
    {path: "pc/switch", component: SwitchDemoComponent},
    {path: "pc/alphabetical-index", component: AlphabeticalIndexDemoComponent},
    {path: "pc/rate", component: RateDemoComponent}
];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
