import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule, JigsawMobileCheckBoxModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonDisableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonDisableDemoComponent],
    exports: [ButtonDisableDemoComponent],
    imports: [JigsawMobileButtonModule, JigsawMobileCheckBoxModule, JigsawDemoDescriptionModule]
})
export class ButtonDisableDemoModule {

}
