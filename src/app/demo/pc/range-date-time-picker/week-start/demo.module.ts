import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeWeekStartComponent} from "./demo.component";

@NgModule({
    declarations: [RangeDateTimeWeekStartComponent],
    exports: [RangeDateTimeWeekStartComponent],
    imports: [ CommonModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawRangeDateTimePickerModule]
})
export class RangeDateTimeWeekStartModule {

}
