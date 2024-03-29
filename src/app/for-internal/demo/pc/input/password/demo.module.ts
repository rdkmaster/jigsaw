import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputPasswordComponent} from "./demo.component";

@NgModule({
    declarations: [InputPasswordComponent],
    exports: [InputPasswordComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputPasswordModule {
}
