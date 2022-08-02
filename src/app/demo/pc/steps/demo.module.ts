import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo/demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import {StepsAllComponent} from "./demo.component";
import {JigsawStepsModule} from "jigsaw/public_api";
import {JigsawStepHorizontalDemoComponent} from "./horizontal/demo.component";
import {JigsawStepVerticalDemoComponent} from "./vertical/demo.component";
import {JigsawStepstatusDemoComponent} from "./status/demo.component";
import {JigsawStepManyStepsDemoComponent} from "./many-steps/demo.component";
import {JigsawStepOverLengthDemoComponent} from "./over-length/demo.component";
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

@NgModule({
    declarations: [
        StepsAllComponent,
        JigsawStepHorizontalDemoComponent,
        JigsawStepVerticalDemoComponent,
        JigsawStepstatusDemoComponent,
        JigsawStepManyStepsDemoComponent,
        JigsawStepOverLengthDemoComponent

    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawStepsModule,
        PerfectScrollbarModule
    ]
})
export class StepsDemoModule {
}
