import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawLoadingModule} from "jigsaw/common/components/loading/loading";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWithLoadingComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonWithLoadingComponent],
    exports: [ButtonWithLoadingComponent],
    imports: [CommonModule, JigsawMobileButtonModule, JigsawLoadingModule, JigsawDemoDescriptionModule]
})
export class ButtonWithLoadingModule {

}
