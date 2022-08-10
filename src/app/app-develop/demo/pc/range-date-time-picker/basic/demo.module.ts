import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {RangeDateTimeBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RangeDateTimeBasicDemoComponent],
    exports: [RangeDateTimeBasicDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule]
})
export class RangeDateTimeBasicDemoModule{

}
