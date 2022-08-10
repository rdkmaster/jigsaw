import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ButtonPresetDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonPresetDemoComponent],
    exports: [ButtonPresetDemoComponent],
    imports: [JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonPresetDemoModule {

}
