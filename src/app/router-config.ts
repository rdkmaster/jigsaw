import { ExampleDemoComponent } from './demo/pc/example/demo.component';
import {AlertDemoComponent} from "./demo/pc/alert/demo.component";
import {HeaderDemoComponent} from "./demo/pc/header/demo.component";
import {CheckBoxDemoComponent} from "./demo/pc/checkbox/demo.componet";
import {RadioGroupDemoComponent} from "./demo/pc/radio/demo.component";

export const routerConfigPC = [
    { path: "pc/example", component: ExampleDemoComponent },
    { path: "pc/alert", component: AlertDemoComponent},
    {path: "pc/header", component: HeaderDemoComponent},
    {path: "pc/checkbox", component: CheckBoxDemoComponent},
    {path: "pc/radio-group", component: RadioGroupDemoComponent}
];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
