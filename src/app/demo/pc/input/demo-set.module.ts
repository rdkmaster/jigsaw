import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {InputValueChangeDemoModule} from "./value-change/demo.module";
import {InputClearableDemoModule} from "./clearable/demo.module";
import {InputFocusDemoModule} from "./focus/demo.module";
import {InputPrefixIconDemoModule} from "./icons/demo.module";
import {InputFullModule} from "./full/demo.module";
import {InputDisabledModule} from "./disabled/demo.module";
import {InputValidModule} from "./valid/demo.module";
import {InputSelectDemoModule} from "./select/demo.module";

import {InputFullComponent} from "./full/demo.component";
import {InputValueChangeDemoComponent} from "./value-change/demo.component";
import {InputClearableDemoComponent} from "./clearable/demo.component";
import {InputFocusDemoComponent} from "./focus/demo.component";
import {InputPrefixIconDemoComponent} from "./icons/demo.component";
import {InputDisabledComponent} from "./disabled/demo.component";
import {InputValidComponent} from "./valid/demo.component";
import {InputSelectDemoComponent} from "./select/demo.component";
import {InputPrefixSuffixDemoModule} from "./prefix-suffix/demo.module";
import {InputPrefixSuffixDemoComponent} from "./prefix-suffix/demo.component";
import {InputAllComponent} from "./all/demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {InputBasicModule} from "./basic/demo.module";
import {InputPasswordModule} from "./password/demo.module";
import {TableAutoSaveDemoModule} from "./ignore-blur-on-clear/demo.module";

export const routerConfig = [
    {
        path: 'all', component: InputAllComponent
    },
    {
        path: 'full', component: InputFullComponent
    },
    {
        path: 'value-change', component: InputValueChangeDemoComponent
    },
    {
        path: 'clearable', component: InputClearableDemoComponent
    },
    {
        path: 'focus', component: InputFocusDemoComponent
    },
    {
        path: 'icons', component: InputPrefixIconDemoComponent
    },
    {
        path: 'disabled', component: InputDisabledComponent
    },
    {
        path: 'valid', component: InputValidComponent
    },
    {
        path: 'select', component: InputSelectDemoComponent
    },
    {
        path: 'prefix-suffix', component: InputPrefixSuffixDemoComponent
    },
    {
        desc: 'ignore-blur-on-clear', url: '/pc/table/auto-save', path: ''
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        InputValueChangeDemoModule,
        InputClearableDemoModule,
        InputFocusDemoModule,
        InputPrefixIconDemoModule,
        InputFullModule,
        InputDisabledModule,
        InputValidModule,
        InputSelectDemoModule,
        InputPrefixSuffixDemoModule,
        JigsawMarkdownModule,
        InputBasicModule,
        InputPasswordModule,
        TableAutoSaveDemoModule
    ],
    declarations: [InputAllComponent]
})
export class InputDemoModule {
}
