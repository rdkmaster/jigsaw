import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {CheckBoxFullComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CheckBoxFullComponent],
    exports: [CheckBoxFullComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxFullModule {

}
