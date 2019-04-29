import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/pc-components/alert/alert";
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
