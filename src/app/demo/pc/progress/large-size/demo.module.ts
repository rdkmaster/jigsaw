import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProgressModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {ProgressLargeSizeComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ProgressLargeSizeComponent],
    exports: [ProgressLargeSizeComponent],
    imports: [JigsawProgressModule, CommonModule, JigsawNumericInputModule, DemoTemplateModule]
})
export class ProgressLargeSizeModule {

}
