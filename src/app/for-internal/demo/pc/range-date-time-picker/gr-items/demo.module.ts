import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {RangeDateTimeGrItemsComponent} from "./demo.component";

@NgModule({
    declarations: [RangeDateTimeGrItemsComponent],
    exports: [RangeDateTimeGrItemsComponent],
    imports: [JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule, CommonModule]
})
export class RangeDateTimeGrItemsModule {

}
