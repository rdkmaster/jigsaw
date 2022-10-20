import { NgModule } from "@angular/core";
import { ProgressDemoComponent } from "./demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawProgressModule, JigsawNumericInputModule, JigsawHeaderModule } from "jigsaw/public_api";
import { CommonModule } from "@angular/common";
import { ProgressBasicComponent } from "./basic/demo.component";
import { ProgressFunctionalComponent } from "./functional/demo.component";
import { ProgressTextTopComponent } from "./text-top/demo.component";
import { ProgressTextFollowComponent } from "./text-follow/demo.component";
import { CircleProgressDemoComponent } from "./circle-progress/demo.component";

@NgModule({
    declarations: [
        ProgressDemoComponent,
        ProgressBasicComponent,
        ProgressFunctionalComponent,
        ProgressTextTopComponent,
        ProgressTextFollowComponent,
        CircleProgressDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawProgressModule,
        CommonModule,
        JigsawNumericInputModule,
        JigsawHeaderModule
    ]
})
export class ProgressDemoModule {
}
