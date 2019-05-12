import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonPresetDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonPresetDemoComponent],
    exports: [ButtonPresetDemoComponent],
    imports: [JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonPresetDemoModule {

}
