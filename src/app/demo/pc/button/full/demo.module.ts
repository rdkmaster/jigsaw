import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawLoadingModule} from "jigsaw/pc-components/loading/loading";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonFullComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonFullComponent],
    exports: [ButtonFullComponent],
    imports: [JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule, JigsawDemoDescriptionModule]
})
export class ButtonFullModule {

}
