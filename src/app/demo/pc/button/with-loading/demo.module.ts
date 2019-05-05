import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawLoadingModule} from "jigsaw/pc-components/loading/loading";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWithLoadingComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonWithLoadingComponent],
    exports: [ButtonWithLoadingComponent],
    imports: [CommonModule, JigsawButtonModule, JigsawLoadingModule, JigsawDemoDescriptionModule]
})
export class ButtonWithLoadingModule {

}
