import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {CheckBoxDisableDemoComponent} from "./app.component";
@NgModule({
    declarations: [CheckBoxDisableDemoComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule]
})
export class CheckBoxDisableDemoModule{

}
