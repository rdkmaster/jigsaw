import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonPresetDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonPresetDemoComponent],
    exports: [ButtonPresetDemoComponent],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonPresetDemoModule {

}
