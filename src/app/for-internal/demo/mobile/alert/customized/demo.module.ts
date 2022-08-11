import {NgModule} from "@angular/core";
import {JigsawMobileAlertModule, JigsawMobileCheckBoxModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "../../../../description/demo-description";
import {CustomizeAlertDemoComponent} from "./demo.component";
import {CustomizedAlert} from "./customized-alert";

@NgModule({
    declarations: [CustomizeAlertDemoComponent, CustomizedAlert],
    exports: [ CustomizeAlertDemoComponent ],
    imports: [JigsawMobileAlertModule, JigsawMobileCheckBoxModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class CustomizeAlertMobileDemoModule {
}
