import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawLoadingModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWithLoadingComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonWithLoadingComponent],
    exports: [ButtonWithLoadingComponent],
    imports: [CommonModule, JigsawButtonModule, JigsawLoadingModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class ButtonWithLoadingModule {

}
