import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputPasswordComponent} from "./demo.component";

@NgModule({
    declarations: [InputPasswordComponent],
    exports: [InputPasswordComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputPasswordModule {
}
