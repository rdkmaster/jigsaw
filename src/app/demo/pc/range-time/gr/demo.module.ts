import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeGrComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeGrComponent],
    exports: [RangeTimeGrComponent],
    imports: [JigsawRangeTimeModule, CommonModule, JigsawDemoDescriptionModule, JigsawButtonBarModule]
})
export class RangeTimeGrModule {

}
