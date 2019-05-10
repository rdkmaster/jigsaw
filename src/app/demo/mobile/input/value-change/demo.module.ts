import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputValueChangeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputValueChangeDemoComponent],
    exports: [InputValueChangeDemoComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputValueChangeDemoModule {

}
