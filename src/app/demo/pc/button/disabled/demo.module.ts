import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawCheckBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonDisableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonDisableDemoComponent],
    exports: [ButtonDisableDemoComponent],
    imports: [JigsawButtonModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule]
})
export class ButtonDisableDemoModule {

}
