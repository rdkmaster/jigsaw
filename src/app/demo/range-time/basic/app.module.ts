import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeBasicDemoComponent} from "./app.component";

@NgModule({
    declarations: [RangeTimeBasicDemoComponent],
    exports: [RangeTimeBasicDemoComponent],
    imports: [JigsawRangeTimeModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RangeTimeBasicDemoModule{

}
