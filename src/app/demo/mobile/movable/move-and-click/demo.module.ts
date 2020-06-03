import {NgModule} from "@angular/core";
import {JigsawMovableModule, JigsawMobileAlertModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {MoveAndClickDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawMobileAlertModule, JigsawDemoDescriptionModule
    ],
    declarations: [MoveAndClickDemoComponent],
    exports: [MoveAndClickDemoComponent]
})
export class MoveAndClickDemoModule {

}
