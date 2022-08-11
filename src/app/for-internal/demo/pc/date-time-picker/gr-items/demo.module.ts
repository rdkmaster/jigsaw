import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DateTimePickerGrItemDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DateTimePickerGrItemDemoComponent],
    exports: [ DateTimePickerGrItemDemoComponent ],
    imports: [CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule]
})
export class DateTimePickerGrItemDemoModule{

}
