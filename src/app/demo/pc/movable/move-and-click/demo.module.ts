import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {MoveAndClickDemoComponent} from "./demo.component";
import {JigsawMovableModule} from "jigsaw/common/directive/movable/index";
import {JigsawAlertModule} from "jigsaw/pc-components/alert/alert";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawAlertModule, JigsawDemoDescriptionModule
    ],
    declarations: [MoveAndClickDemoComponent],
    exports: [MoveAndClickDemoComponent]
})
export class MoveAndClickDemoModule {

}
