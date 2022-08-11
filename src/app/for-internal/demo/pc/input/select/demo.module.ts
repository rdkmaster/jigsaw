import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawCheckBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputSelectDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputSelectDemoComponent],
    exports: [InputSelectDemoComponent],
    imports: [JigsawInputModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule]
})
export class InputSelectDemoModule {

}
