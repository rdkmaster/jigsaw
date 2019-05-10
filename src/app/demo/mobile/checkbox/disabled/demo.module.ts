import {NgModule} from "@angular/core";
import {JigsawMobileCheckBoxModule} from "jigsaw/mobile-components/checkbox/index";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CheckBoxDisableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CheckBoxDisableDemoComponent],
    exports: [ CheckBoxDisableDemoComponent ],
    imports: [JigsawMobileCheckBoxModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxDisableDemoModule{

}
