import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeBasicDemoComponent],
    exports: [RangeTimeBasicDemoComponent],
    imports: [JigsawRangeTimeModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RangeTimeBasicDemoModule{

}
