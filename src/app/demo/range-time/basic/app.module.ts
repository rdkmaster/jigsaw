import {NgModule} from "@angular/core";
import {RangeTimeBasicDemoComponent} from "./app.component";
import {JigsawRangeTimeModule} from "../../../../jigsaw/component/range-time/index";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [RangeTimeBasicDemoComponent],
    imports: [JigsawRangeTimeModule, CommonModule]
})
export class RangeTimeBasicDemoModule{

}
