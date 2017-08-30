import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {CheckBoxBasicDemoComponent} from "./app.component";
@NgModule({
    declarations: [CheckBoxBasicDemoComponent],
    bootstrap: [ CheckBoxBasicDemoComponent ],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule]
})
export class CheckBoxBasicDemoModule{

}
