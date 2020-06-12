import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawRadioModule, JigsawRangeDateTimeSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeSelectComponent} from "./demo.component";

@NgModule({
    declarations: [RangeDateTimeSelectComponent],
    exports: [RangeDateTimeSelectComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawRangeDateTimeSelectModule, JigsawRadioModule]
})
export class RangeDateTimeSelectModule {

}
