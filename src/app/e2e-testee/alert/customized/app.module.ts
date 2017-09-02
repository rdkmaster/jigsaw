import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {CustomizeAlertDemoComponent} from "./app.component";
import {CustomizedAlert} from "./customized-alert";

@NgModule({
    declarations: [CustomizeAlertDemoComponent, CustomizedAlert],
    bootstrap: [ CustomizeAlertDemoComponent ],
    imports: [JigsawAlertModule, JigsawCheckBoxModule]
})
export class CustomizeAlertDemoModule {
}
