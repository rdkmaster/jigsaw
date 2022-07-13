import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProgressModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {ProgressEstimationComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ProgressEstimationComponent],
    exports: [ProgressEstimationComponent],
    imports: [JigsawProgressModule, CommonModule, JigsawNumericInputModule, DemoTemplateModule]
})
export class ProgressEstimationModule {

}
