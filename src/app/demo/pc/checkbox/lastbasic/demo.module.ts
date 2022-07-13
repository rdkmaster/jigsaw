import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawCheckBoxModule, JigsawSwitchModule} from "jigsaw/public_api";
import {CheckBoxBasicDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CheckBoxBasicDemoComponent],
    exports: [CheckBoxBasicDemoComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawButtonBarModule]
})
export class CheckBoxBasicDemoModule {
}
