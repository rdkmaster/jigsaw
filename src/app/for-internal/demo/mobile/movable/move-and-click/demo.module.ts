import {NgModule} from "@angular/core";
import {JigsawMovableModule, JigsawMobileAlertModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {MoveAndClickDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawMobileAlertModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule
    ],
    declarations: [MoveAndClickDemoComponent],
    exports: [MoveAndClickDemoComponent]
})
export class MoveAndClickDemoModule {

}
