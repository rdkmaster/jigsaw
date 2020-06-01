import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ProgressFullComponent} from "./demo.component";
import {CommonModule} from "@angular/common";
import {JigsawProgressModule} from "jigsaw/pc-components/progress/progress";
import {JigsawNumericInputModule} from "../../../../../jigsaw/pc-components/input/numeric-input";

@NgModule({
    declarations: [ProgressFullComponent],
    exports: [ProgressFullComponent],
    imports: [JigsawProgressModule, JigsawDemoDescriptionModule, CommonModule, JigsawNumericInputModule]
})
export class ProgressFullModule {

}
