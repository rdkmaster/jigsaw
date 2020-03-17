import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawButtonBarModule} from "jigsaw/pc-components/list-and-tile/button-bar";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeGrComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeGrComponent],
    exports: [RangeTimeGrComponent],
    imports: [JigsawRangeTimeModule, CommonModule, JigsawDemoDescriptionModule, JigsawButtonBarModule]
})
export class RangeTimeGrModule {

}
