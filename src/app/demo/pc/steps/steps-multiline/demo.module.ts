import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawStepsModule, JigsawStepsMultilineModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {StepsMultilineComponent} from './demo.component';

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawStepsModule, JigsawStepsMultilineModule, PerfectScrollbarModule,JigsawButtonModule
    ],
    declarations: [StepsMultilineComponent],
    exports: [StepsMultilineComponent]
})
export class StepsMultilineModule {
}
