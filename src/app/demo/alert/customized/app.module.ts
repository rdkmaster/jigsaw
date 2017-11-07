import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {CustomizeAlertDemoComponent} from "./app.component";
import {CustomizedAlert} from "./customized-alert";

@NgModule({
    declarations: [CustomizeAlertDemoComponent, CustomizedAlert],
    bootstrap: [ CustomizeAlertDemoComponent ],
    imports: [JigsawAlertModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule]
})
export class CustomizeAlertDemoModule {
}
