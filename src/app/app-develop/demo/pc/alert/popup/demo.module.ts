import {NgModule} from "@angular/core";
import {JigsawAlertModule, JigsawButtonModule, JigsawInputModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {AlertPopupDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AlertPopupDemoComponent],
    exports: [ AlertPopupDemoComponent ],
    imports: [JigsawAlertModule, JigsawButtonModule, JigsawInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class AlertPopupDemoModule {
}
