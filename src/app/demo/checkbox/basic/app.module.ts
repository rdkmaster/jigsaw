import {NgModule} from "@angular/core";
import {CheckBoxBasicDemoComponent} from "./app.component";
import {JigsawCheckBoxModule} from "../../../../jigsaw/component/checkbox/index";
import {JigsawSwitchModule} from "../../../../jigsaw/component/switch/index";
@NgModule({
    declarations: [CheckBoxBasicDemoComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule],
    exports: [CheckBoxBasicDemoComponent]
})
export class CheckBoxBasicDemoModule{

}
