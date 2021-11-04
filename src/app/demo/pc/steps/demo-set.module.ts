import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JigsawStepBasicDemoModule} from "./basic/demo.module";
import {JigsawStepBasicDemoComponent} from "./basic/demo.component";
import {JigsawStepOverLengthDemoComponent} from "./over-length/demo.component";
import {JigsawStepOverLengthDemoModule} from "./over-length/demo.module";
import {JigsawStepGotoDemoComponent} from "./goto-step/demo.component";
import {JigsawStepGotoDemoModule} from "./goto-step/demo.module";
import {JigsawStepContextDemoComponent} from "./context/demo.component";
import {JigsawStepContextDemoModule} from "./context/demo.module";
import {JigsawStepEventsDemoModule} from "./events/demo.module";
import {JigsawStepEventsDemoComponent} from "./events/demo.component";
import {JigsawStepManyStepsDemoComponent} from "./many-steps/demo.component";
import {JigsawStepManyStepsDemoModule} from "./many-steps/demo.module";

export const routerConfig = [
    {path: "basic", component: JigsawStepBasicDemoComponent},
    {path: "over-length", component: JigsawStepOverLengthDemoComponent},
    {path: "context", component: JigsawStepContextDemoComponent},
    {path: "goto-step", component: JigsawStepGotoDemoComponent},
    {path: "events", component: JigsawStepEventsDemoComponent},
    {path: "many-steps", component: JigsawStepManyStepsDemoComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        JigsawStepBasicDemoModule,
        JigsawStepOverLengthDemoModule,
        JigsawStepContextDemoModule,
        JigsawStepGotoDemoModule,
        JigsawStepEventsDemoModule,
        JigsawStepManyStepsDemoModule,
    ]
})
export class StepsDemoModule {
}
