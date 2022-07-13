import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProgressModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {ProgressStatusComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ProgressStatusComponent],
    exports: [ProgressStatusComponent],
    imports: [JigsawProgressModule, CommonModule, JigsawNumericInputModule, DemoTemplateModule]
})
export class ProgressStatusModule {

}
