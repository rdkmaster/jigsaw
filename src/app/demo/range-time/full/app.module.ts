import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeFullComponent} from "./app.component";

@NgModule({
    declarations: [RangeTimeFullComponent],
    exports: [RangeTimeFullComponent],
    imports: [JigsawRangeTimeModule, JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RangeTimeFullModule {

}
