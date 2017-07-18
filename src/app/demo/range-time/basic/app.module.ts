import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {RangeTimeBasicDemoComponent} from "./app.component";
@NgModule({
    declarations: [RangeTimeBasicDemoComponent],
    imports: [JigsawRangeTimeModule, CommonModule]
})
export class RangeTimeBasicDemoModule{

}
