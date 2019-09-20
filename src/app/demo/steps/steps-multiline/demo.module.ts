import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "jigsaw/component/steps/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {StepsMultilineComponent} from './demo.component';
import {JigsawStepsMultilineModule} from "jigsaw/component/steps/steps-multiline";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawStepsModule, JigsawStepsMultilineModule, PerfectScrollbarModule,JigsawButtonModule
    ],
    declarations: [StepsMultilineComponent],
    exports: [StepsMultilineComponent]
})
export class StepsMultilineModule {
}
