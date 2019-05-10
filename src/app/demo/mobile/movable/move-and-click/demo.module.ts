import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {MoveAndClickDemoComponent} from "./demo.component";
import {JigsawMovableModule} from "jigsaw/common/directive/movable/index";
import {JigsawMobileAlertModule} from "jigsaw/mobile-components/alert/alert";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawMobileAlertModule, JigsawDemoDescriptionModule
    ],
    declarations: [MoveAndClickDemoComponent],
    exports: [MoveAndClickDemoComponent]
})
export class MoveAndClickDemoModule {

}
