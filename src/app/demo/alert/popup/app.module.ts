import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {PopupService} from "jigsaw/service/popup.service";
import {AlertPopupDemoComponent} from "./app.component";
@NgModule({
    declarations: [AlertPopupDemoComponent],
    bootstrap: [ AlertPopupDemoComponent ],
    imports: [JigsawAlertModule, JigsawButtonModule],
    providers: [PopupService]
})
export class AlertPopupDemoModule {

}
