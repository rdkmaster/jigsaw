import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {CheckBoxBasicDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CheckBoxBasicDemoComponent],
    exports: [CheckBoxBasicDemoComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxBasicDemoModule {
}
