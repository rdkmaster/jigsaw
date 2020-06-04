import {NgModule} from "@angular/core";
import {JigsawMobileAlertModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AlertInDomDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AlertInDomDemoComponent],
    exports: [ AlertInDomDemoComponent ],
    imports: [
        JigsawMobileAlertModule, JigsawDemoDescriptionModule
    ]
})
export class AlertInDomDemoModule {
}
