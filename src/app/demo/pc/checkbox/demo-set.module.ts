import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CheckBoxFullModule} from "./full/demo.module";
import {CheckBoxFullComponent} from "./full/demo.component";
import {CheckboxAllComponent} from "./all/demo.component";
import {CheckBoxBasicDemoModule} from "./basic/demo.module";
import {CheckboxIndeterminateDemoModule} from "./indeterminate/demo.module";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {CheckboxMinimalistDemoModule} from "./minimalist/demo.module";
import {CheckboxDisabledDemoModule} from "./disabled/demo.module";

export const routerConfig = [
    {
        path: 'all', component: CheckboxAllComponent
    },
    {
        path: 'full', component: CheckBoxFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        JigsawMarkdownModule,
        CheckBoxFullModule,
        CheckBoxBasicDemoModule,
        CheckboxIndeterminateDemoModule,
        CheckboxMinimalistDemoModule,
        CheckboxDisabledDemoModule
    ],
    declarations: [CheckboxAllComponent]
})
export class CheckBoxDemoModule {
}
