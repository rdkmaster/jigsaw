import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule, JigsawCheckBoxModule, JigsawRadioLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ButtonInstancesDemoComponent} from "./demo.component";


@NgModule({
    declarations: [ButtonInstancesDemoComponent],
    exports: [ ButtonInstancesDemoComponent ],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawCheckBoxModule, JigsawRadioLiteModule]
})
export class ButtonInstancesDemoModule{

}
