import {NgModule} from "@angular/core";
import {JigsawMobileCheckBoxModule} from "jigsaw/mobile-components/checkbox/index";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";
import {CheckBoxBasicDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CheckBoxBasicDemoComponent],
    exports: [CheckBoxBasicDemoComponent],
    imports: [JigsawMobileCheckBoxModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxBasicDemoModule {
}
