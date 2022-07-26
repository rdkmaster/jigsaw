import { ExampleDemoComponent } from './demo/pc/example/demo.component';
import {AlertDemoComponent} from "./demo/pc/alert/demo.component";

export const routerConfigPC = [
    { path: "pc/example", component: ExampleDemoComponent },
    { path: "pc/alert", component: AlertDemoComponent}
];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
