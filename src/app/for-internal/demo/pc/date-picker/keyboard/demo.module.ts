import { NgModule } from "@angular/core";
import { JigsawButtonBarModule, JigsawButtonModule, JigsawDatePickerModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { DatePickerKeyboardDemoComponent } from "./demo.component";

@NgModule({
    declarations: [DatePickerKeyboardDemoComponent],
    exports: [DatePickerKeyboardDemoComponent],
    imports: [JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule]
})
export class DatePickerKeyboardDemoModule {

}
