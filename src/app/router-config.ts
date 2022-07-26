import { ExampleDemoComponent } from './demo/pc/example/demo.component';

export const routerConfigPC = [
    { path: "pc/example", component: ExampleDemoComponent }
];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
