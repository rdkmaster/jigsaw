import {NgModule} from "@angular/core";
import {JigsawMovableModule, JigsawAlertModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {MoveAndClickDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawAlertModule, JigsawDemoDescriptionModule
    ],
    declarations: [MoveAndClickDemoComponent],
    exports: [MoveAndClickDemoComponent]
})
export class MoveAndClickDemoModule {

}
