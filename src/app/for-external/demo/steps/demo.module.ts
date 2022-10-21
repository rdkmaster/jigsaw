import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { StepsAllComponent } from "./demo.component";
import {
    JigsawStepsModule,
    JigsawButtonModule,
} from "jigsaw/public_api";
import { JigsawStepHorizontalDemoComponent } from "./horizontal/demo.component";
import { JigsawStepVerticalDemoComponent } from "./vertical/demo.component";
import { JigsawStepStatusDemoComponent } from "./status/demo.component";
import { JigsawStepManyStepsDemoComponent } from "./many-steps/demo.component";
import { JigsawStepOverLengthDemoComponent } from "./over-length/demo.component";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
    declarations: [
        StepsAllComponent,
        JigsawStepHorizontalDemoComponent,
        JigsawStepVerticalDemoComponent,
        JigsawStepStatusDemoComponent,
        JigsawStepManyStepsDemoComponent,
        JigsawStepOverLengthDemoComponent

    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawMarkdownModule,
        JigsawStepsModule,
        JigsawButtonModule,
        PerfectScrollbarModule
    ]
})
export class StepsDemoModule {
}
