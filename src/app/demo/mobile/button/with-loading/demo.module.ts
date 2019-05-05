import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileLoadingModule} from "jigsaw/mobile-components/loading/loading";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWithLoadingComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonWithLoadingComponent],
    exports: [ButtonWithLoadingComponent],
    imports: [CommonModule, JigsawMobileButtonModule, JigsawMobileLoadingModule, JigsawDemoDescriptionModule]
})
export class ButtonWithLoadingModule {

}
