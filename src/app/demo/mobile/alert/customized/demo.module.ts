import {NgModule} from "@angular/core";
import {JigsawMobileAlertModule} from "jigsaw/mobile-components/alert/alert";
import {JigsawMobileCheckBoxModule} from "jigsaw/mobile-components/checkbox/index";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawDemoDescriptionModule} from "../../../../demo-description/demo-description";
import {CustomizeAlertDemoComponent} from "./demo.component";
import {CustomizedAlert} from "./customized-alert";

@NgModule({
    declarations: [CustomizeAlertDemoComponent, CustomizedAlert],
    exports: [ CustomizeAlertDemoComponent ],
    imports: [JigsawMobileAlertModule, JigsawMobileCheckBoxModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class CustomizeAlertMobileDemoModule {
}
