import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileCheckBoxModule} from "jigsaw/mobile-components/checkbox/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputSelectDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputSelectDemoComponent],
    exports: [InputSelectDemoComponent],
    imports: [JigsawMobileInputModule, JigsawMobileCheckBoxModule, JigsawDemoDescriptionModule]
})
export class InputSelectDemoModule {

}
