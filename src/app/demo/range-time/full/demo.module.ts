import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeFullComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeFullComponent],
    exports: [RangeTimeFullComponent],
    imports: [JigsawRangeTimeModule, JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RangeTimeFullModule {

}
