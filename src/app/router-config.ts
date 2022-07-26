import { ExampleDemoComponent } from './demo/pc/example/demo.component';
import {HeaderDemoComponent} from "./demo/pc/header/demo.component";

export const routerConfigPC = [
    { path: "pc/example", component: ExampleDemoComponent },
    {
        path: "pc/header", component: HeaderDemoComponent
    }
];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
