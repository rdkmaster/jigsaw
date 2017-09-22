import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {RangeTimeFullComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "../../../../jigsaw/component/radio/radio";

@NgModule({
    declarations: [RangeTimeFullComponent],
    bootstrap: [RangeTimeFullComponent],
    imports: [JigsawRangeTimeModule, JigsawRadioModule, CommonModule]
})
export class RangeTimeFullModule {

}
