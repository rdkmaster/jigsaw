import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWidthHeightDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonWidthHeightDemoComponent],
    exports: [ButtonWidthHeightDemoComponent],
    imports: [JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonWidthHeightDemoModule {

}
