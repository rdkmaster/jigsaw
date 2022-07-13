import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProgressModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {ProgressBasicComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [ProgressBasicComponent],
    exports: [ProgressBasicComponent],
    imports: [JigsawProgressModule, CommonModule, JigsawNumericInputModule, DemoTemplateModule, JigsawHeaderModule]
})
export class ProgressBasicModule {

}
