import {NgModule} from "@angular/core";
import {JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DateTimePickerBasicDemoComponent],
    exports: [ DateTimePickerBasicDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawDateTimePickerModule, DemoTemplateModule]
})
export class DateTimePickerBasicDemoModule{

}
