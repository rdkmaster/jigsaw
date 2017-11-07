import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {CheckBoxFullComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CheckBoxFullComponent],
    bootstrap: [CheckBoxFullComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxFullModule {

}
