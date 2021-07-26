import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileButtonModule, JigsawLoadingModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWithLoadingComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonWithLoadingComponent],
    exports: [ButtonWithLoadingComponent],
    imports: [CommonModule, JigsawMobileButtonModule, JigsawLoadingModule, JigsawDemoDescriptionModule]
})
export class ButtonWithLoadingModule {

}
