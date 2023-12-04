import {NgModule} from "@angular/core";
import {JigsawBoxModule, JigsawButtonModule, JigsawHeaderModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ButtonBasicIconDemoComponent} from "./demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [ButtonBasicIconDemoComponent],
    exports: [ ButtonBasicIconDemoComponent ],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule, CommonModule, JigsawSwitchModule, JigsawBoxModule]
})
export class ButtonBasicIconDemoModule{

}
