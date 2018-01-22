import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWithLoadingComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonWithLoadingComponent],
    exports: [ButtonWithLoadingComponent],
    imports: [CommonModule, JigsawButtonModule, JigsawLoadingModule, JigsawDemoDescriptionModule]
})
export class ButtonWithLoadingModule {

}
