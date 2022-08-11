import {NgModule} from "@angular/core";
import {JigsawAlertModule, JigsawCheckBoxModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "../../../../description/demo-description";
import {CustomizeAlertDemoComponent} from "./demo.component";
import {CustomizedAlert} from "./customized-alert";

@NgModule({
    declarations: [CustomizeAlertDemoComponent, CustomizedAlert],
    exports: [ CustomizeAlertDemoComponent ],
    imports: [JigsawAlertModule, JigsawCheckBoxModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class CustomizeAlertDemoModule {
}
