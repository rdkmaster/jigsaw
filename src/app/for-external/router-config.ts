
import { AlertDemoComponent } from "./demo/alert/demo.component";
import { AdjustFontColorAllDemoComponent } from './demo/adjust-font-color/demo.component';

export const routerConfigPC = [
    { path: "pc/alert", component: AlertDemoComponent },
    { path: "pc/adjust-font-color", component: AdjustFontColorAllDemoComponent }
];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
