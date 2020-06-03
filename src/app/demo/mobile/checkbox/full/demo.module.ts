import {NgModule} from "@angular/core";
import {JigsawMobileCheckBoxModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {CheckBoxFullComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CheckBoxFullComponent],
    exports: [CheckBoxFullComponent],
    imports: [JigsawMobileCheckBoxModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxFullModule {

}
