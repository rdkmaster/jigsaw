import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {CheckBoxLiveDemoComponent} from "./app.component";
@NgModule({
    declarations: [CheckBoxLiveDemoComponent],
    bootstrap: [ CheckBoxLiveDemoComponent ],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule]
})
export class CheckBoxLiveDemoModule{

}
