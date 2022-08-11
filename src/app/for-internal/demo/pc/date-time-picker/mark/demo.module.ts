import {NgModule} from "@angular/core";
import {JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DateTimePickerMarkDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DateTimePickerMarkDemoComponent],
    exports: [ DateTimePickerMarkDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawDateTimePickerModule]
})
export class DateTimePickerMarkDemoModule{

}
