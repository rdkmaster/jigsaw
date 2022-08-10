import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {RangeDateTimeGrComponent} from "./demo.component";

@NgModule({
    declarations: [RangeDateTimeGrComponent],
    exports: [RangeDateTimeGrComponent],
    imports: [ CommonModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawRangeDateTimePickerModule]
})
export class RangeDateTimeGrModule {

}
