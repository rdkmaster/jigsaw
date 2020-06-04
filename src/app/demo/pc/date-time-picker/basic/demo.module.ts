import {NgModule} from "@angular/core";
import {JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DateTimePickerBasicDemoComponent],
    exports: [ DateTimePickerBasicDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawDateTimePickerModule]
})
export class DateTimePickerBasicDemoModule{

}
