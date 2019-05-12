import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/pc-components/alert/alert";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "../../../../demo-description/demo-description";
import {CustomizeAlertDemoComponent} from "./demo.component";
import {CustomizedAlert} from "./customized-alert";

@NgModule({
    declarations: [CustomizeAlertDemoComponent, CustomizedAlert],
    exports: [ CustomizeAlertDemoComponent ],
    imports: [JigsawAlertModule, JigsawCheckBoxModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class CustomizeAlertDemoModule {
}
