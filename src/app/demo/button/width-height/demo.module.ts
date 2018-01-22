import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWidthHeightDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonWidthHeightDemoComponent],
    exports: [ButtonWidthHeightDemoComponent],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonWidthHeightDemoModule {

}
