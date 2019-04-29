import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CheckBoxDisableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CheckBoxDisableDemoComponent],
    exports: [ CheckBoxDisableDemoComponent ],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxDisableDemoModule{

}
