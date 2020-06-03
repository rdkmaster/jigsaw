import {NgModule} from "@angular/core";
import {JigsawMobileCheckBoxModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CheckBoxDisableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CheckBoxDisableDemoComponent],
    exports: [ CheckBoxDisableDemoComponent ],
    imports: [JigsawMobileCheckBoxModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxDisableDemoModule{

}
