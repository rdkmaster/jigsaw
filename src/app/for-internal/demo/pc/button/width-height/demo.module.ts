import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ButtonWidthHeightDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonWidthHeightDemoComponent],
    exports: [ButtonWidthHeightDemoComponent],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonWidthHeightDemoModule {

}
