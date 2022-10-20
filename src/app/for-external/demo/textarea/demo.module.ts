import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { TextareaAllComponent } from "./demo.component";
import { JigsawTextareaModule } from "jigsaw/public_api";
import { TextareaBasicDemoComponent } from "./basic/demo.component";
import { TextareaClearableDemoComponent } from "./clearable/demo.component";
import { TextareaMaxLengthDemoComponent } from "./max-length/demo.component";
import { TextareaResizeDemoComponent } from "./resize/demo.component";
import { TextareaSelectDemoComponent } from "./select/demo.component";


@NgModule({
    declarations: [
        TextareaAllComponent,
        TextareaBasicDemoComponent,
        TextareaClearableDemoComponent,
        TextareaMaxLengthDemoComponent,
        TextareaResizeDemoComponent,
        TextareaSelectDemoComponent

    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawTextareaModule
    ]
})
export class TextareaDemoModule {
}
