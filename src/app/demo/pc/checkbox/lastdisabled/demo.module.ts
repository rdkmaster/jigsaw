import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CheckBoxDisableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CheckBoxDisableDemoComponent],
    exports: [ CheckBoxDisableDemoComponent ],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxDisableDemoModule{

}
