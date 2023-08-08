import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputShowBorderComponent} from "./demo.component";

@NgModule({
    declarations: [InputShowBorderComponent],
    exports: [InputShowBorderComponent],
    imports: [JigsawInputModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class InputShowBorderModule {
}
