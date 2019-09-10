import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "jigsaw/pc-components/steps/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {StepsLiteComponent} from './demo.component';
import {JigsawStepsLiteModule} from "jigsaw/pc-components/steps/steps-lite";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawStepsModule, JigsawStepsLiteModule, JigsawButtonModule
    ],
    declarations: [StepsLiteComponent],
    exports: [StepsLiteComponent]
})
export class StepsLiteModule {
}
