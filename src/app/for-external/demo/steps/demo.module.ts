import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import {StepsAllComponent} from "./demo.component";
import {
    JigsawStepsModule,
    JigsawButtonModule,
} from "jigsaw/public_api";
import {JigsawStepHorizontalDemoComponent} from "./horizontal/demo.component";
import {JigsawStepVerticalDemoComponent} from "./vertical/demo.component";
import {JigsawStepStatusDemoComponent} from "./status/demo.component";
import {JigsawStepManyStepsDemoComponent} from "./many-steps/demo.component";
import {JigsawStepOverLengthDemoComponent} from "./over-length/demo.component";
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

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
        JigsawMarkdownModule,
        JigsawStepsModule,
        JigsawButtonModule,
        PerfectScrollbarModule
    ]
})
export class StepsDemoModule {
}
