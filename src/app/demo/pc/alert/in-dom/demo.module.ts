import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AlertInDomDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AlertInDomDemoComponent],
    exports: [ AlertInDomDemoComponent ],
    imports: [
        JigsawAlertModule, JigsawDemoDescriptionModule
    ]
})
export class AlertInDomDemoModule {
}
