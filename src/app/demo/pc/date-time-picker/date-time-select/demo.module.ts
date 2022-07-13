import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawButtonBarModule,
    JigsawDateTimeSelectModule,
    JigsawRadioModule,
    JigsawSelectModule,
    JigsawSwitchModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimeSelectDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [DateTimeSelectDemoComponent],
    exports: [ DateTimeSelectDemoComponent ],
    imports: [
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawDateTimeSelectModule,
        JigsawButtonBarModule,
        JigsawRadioModule,
        JigsawSwitchModule,
        JigsawSelectModule,
        JigsawHeaderModule,
        DemoTemplateModule]
})
export class DateTimeSelectDemoModule{

}
