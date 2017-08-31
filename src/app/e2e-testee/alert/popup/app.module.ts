import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {AlertPopupDemoComponent} from "./app.component";

@NgModule({
    declarations: [AlertPopupDemoComponent],
    bootstrap: [ AlertPopupDemoComponent ],
    imports: [JigsawAlertModule, JigsawButtonModule]
})
export class AlertPopupDemoModule {
}
