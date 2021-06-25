import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JigsawNumericStepBasicDemoModule} from "./basic/demo.module";
import {JigsawNumericStepBasicDemoComponent} from "./basic/demo.component";
import {JigsawNumericStepOverLengthDemoComponent} from "./over-length/demo.component";
import {JigsawNumericStepOverLengthDemoModule} from "./over-length/demo.module";
import {JigsawNumericStepGotoDemoComponent} from "./goto-step/demo.component";
import {JigsawNumericStepGotoDemoModule} from "./goto-step/demo.module";
import {JigsawNumericStepContextDemoComponent} from "./context/demo.component";
import {JigsawNumericStepContextDemoModule} from "./context/demo.module";

export const routerConfig = [
    {path: "basic", component: JigsawNumericStepBasicDemoComponent},
    {path: "over-length", component: JigsawNumericStepOverLengthDemoComponent},
    {path: "context", component: JigsawNumericStepContextDemoComponent},
    {path: "goto-step", component: JigsawNumericStepGotoDemoComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        JigsawNumericStepBasicDemoModule,
        JigsawNumericStepOverLengthDemoModule,
        JigsawNumericStepContextDemoModule,
        JigsawNumericStepGotoDemoModule
    ]
})
export class NumericStepsDemoModule {
}
