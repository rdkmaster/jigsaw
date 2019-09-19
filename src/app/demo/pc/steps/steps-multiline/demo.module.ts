import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "jigsaw/pc-components/steps/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {StepsMultilineComponent} from './demo.component';
import {JigsawStepsMultilineModule} from "jigsaw/pc-components/steps/steps-multiline";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
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
