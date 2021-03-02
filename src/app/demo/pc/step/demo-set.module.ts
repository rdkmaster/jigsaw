import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawStepBasicDemoModule } from "./basic/demo.module";
import { JigsawStepBasicDemoComponent } from "./basic/demo.component";
import { JigsawStepOverLengthDemoComponent } from "./over-length/demo.component";
import { JigsawStepOverLengthDemoModule } from "./over-length/demo.module";
import { JigsawStepVerticalDemoModule } from "./vertical/demo.module";
import { JigsawStepVerticalDemoComponent } from './vertical/demo.component';

export const routerConfig = [
    { path: "basic", component: JigsawStepBasicDemoComponent },
    { path: "over-length", component: JigsawStepOverLengthDemoComponent },
    { path: "vertical", component: JigsawStepVerticalDemoComponent }
];
@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        JigsawStepBasicDemoModule,
        JigsawStepOverLengthDemoModule,
        JigsawStepVerticalDemoModule
    ]
})
export class StepDemoModule {}
