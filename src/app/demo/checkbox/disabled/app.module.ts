import {NgModule} from "@angular/core";
import {CheckBoxDisableDemoComponent} from "./app.component";
import {JigsawCheckBoxModule} from "../../../../jigsaw/component/checkbox/index";
import {JigsawSwitchModule} from "../../../../jigsaw/component/switch/index";
@NgModule({
    declarations: [CheckBoxDisableDemoComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule]
})
export class CheckBoxDisableDemoModule{

}
