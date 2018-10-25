import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputPasswordComponent} from "./demo.component";

@NgModule({
    declarations: [InputPasswordComponent],
    exports: [InputPasswordComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputPasswordModule {
}
