import { NgModule } from "@angular/core";
import { CheckboxBasicComponent } from "./basic/demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { JigsawCheckBoxModule } from "jigsaw/public_api";
import { CheckBoxDemoComponent } from "./demo.componet";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { CheckboxMinimalistComponent } from "./minimalist/demo.component";
import { JigsawButtonBarModule } from "jigsaw/public_api";
import { CheckboxCheckAllComponent } from "./checkall/demo.component";
@NgModule({
    declarations: [
        CheckboxBasicComponent,
        CheckBoxDemoComponent,
        CheckboxMinimalistComponent,
        CheckboxCheckAllComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawCheckBoxModule,
        JigsawMarkdownModule,
        JigsawButtonBarModule
    ]
})
export class CheckBoxDemoModule {
}
