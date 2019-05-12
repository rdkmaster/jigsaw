import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputValidComponent} from "./demo.component";

@NgModule({
    declarations: [InputValidComponent],
    exports: [InputValidComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputValidModule {
}
