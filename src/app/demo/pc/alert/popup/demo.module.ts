import {NgModule} from "@angular/core";
import {JigsawAlertModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AlertPopupDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AlertPopupDemoComponent],
    exports: [ AlertPopupDemoComponent ],
    imports: [JigsawAlertModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class AlertPopupDemoModule {
}
