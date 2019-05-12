import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileCheckBoxModule} from "jigsaw/mobile-components/checkbox/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonDisableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonDisableDemoComponent],
    exports: [ButtonDisableDemoComponent],
    imports: [JigsawMobileButtonModule, JigsawMobileCheckBoxModule, JigsawDemoDescriptionModule]
})
export class ButtonDisableDemoModule {

}
