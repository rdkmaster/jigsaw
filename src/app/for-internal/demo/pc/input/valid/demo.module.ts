import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputValidComponent} from "./demo.component";

@NgModule({
    declarations: [InputValidComponent],
    exports: [InputValidComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputValidModule {
}
