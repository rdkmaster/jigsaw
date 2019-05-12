import {NgModule} from "@angular/core";
import {JigsawMobileCheckBoxModule} from "jigsaw/mobile-components/checkbox/index";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";
import {CheckBoxFullComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CheckBoxFullComponent],
    exports: [CheckBoxFullComponent],
    imports: [JigsawMobileCheckBoxModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxFullModule {

}
