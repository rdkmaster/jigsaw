import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule, JigsawRadioModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeFullComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeFullComponent],
    exports: [RangeTimeFullComponent],
    imports: [JigsawRangeTimeModule, JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RangeTimeFullModule {

}
