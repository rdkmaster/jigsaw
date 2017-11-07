import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CheckBoxDisableDemoComponent} from "./app.component";

@NgModule({
    declarations: [CheckBoxDisableDemoComponent],
    bootstrap: [ CheckBoxDisableDemoComponent ],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxDisableDemoModule{

}
