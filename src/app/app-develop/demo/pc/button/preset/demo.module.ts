import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ButtonPresetDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonPresetDemoComponent],
    exports: [ButtonPresetDemoComponent],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class ButtonPresetDemoModule {

}
