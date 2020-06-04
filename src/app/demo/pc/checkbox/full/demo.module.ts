import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule, JigsawSwitchModule} from "jigsaw/public_api";
import {CheckBoxFullComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CheckBoxFullComponent],
    exports: [CheckBoxFullComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class CheckBoxFullModule {

}
