import {NgModule} from "@angular/core";
import {JigsawAlertModule, JigsawButtonModule, JigsawInputModule, JigsawHeaderModule, JigsawSliderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AlertPopupDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AlertPopupDemoComponent],
    exports: [ AlertPopupDemoComponent ],
    imports: [JigsawAlertModule, JigsawButtonModule, JigsawInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSliderModule]
})
export class AlertPopupDemoModule {
}
