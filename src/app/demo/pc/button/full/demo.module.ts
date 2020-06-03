import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonFullComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonFullComponent],
    exports: [ButtonFullComponent],
    imports: [JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule, JigsawDemoDescriptionModule]
})
export class ButtonFullModule {

}
