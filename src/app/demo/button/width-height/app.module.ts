import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWidthHeightDemoComponent} from "./app.component";

@NgModule({
    declarations: [ButtonWidthHeightDemoComponent],
    bootstrap: [ButtonWidthHeightDemoComponent],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonWidthHeightDemoModule {

}
