import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileCheckBoxModule} from "jigsaw/mobile-components/checkbox/index";
import {JigsawMobileLoadingModule} from "jigsaw/mobile-components/loading/loading";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonFullComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonFullComponent],
    exports: [ButtonFullComponent],
    imports: [JigsawMobileButtonModule, JigsawMobileCheckBoxModule, JigsawMobileLoadingModule, JigsawDemoDescriptionModule]
})
export class ButtonFullModule {

}
