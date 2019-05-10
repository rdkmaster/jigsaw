import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {InputBasicDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [InputBasicDemoComponent],
    exports: [InputBasicDemoComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputBasicDemoModule {

}
