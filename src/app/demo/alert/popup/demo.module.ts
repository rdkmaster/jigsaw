import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/pc-components/alert/alert";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AlertPopupDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AlertPopupDemoComponent],
    exports: [ AlertPopupDemoComponent ],
    imports: [JigsawAlertModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class AlertPopupDemoModule {
}
