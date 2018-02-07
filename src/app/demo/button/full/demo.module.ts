import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonFullComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonFullComponent],
    exports: [ButtonFullComponent],
    imports: [JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule, JigsawDemoDescriptionModule]
})
export class ButtonFullModule {

}
