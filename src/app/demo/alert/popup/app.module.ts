import {NgModule} from "@angular/core";
import {AlertPopupDemoComponent} from "./app.component";
import {JigsawAlertModule} from "../../../../jigsaw/component/alert/alert";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {PopupService} from "../../../../jigsaw/service/popup.service";
@NgModule({
    declarations: [AlertPopupDemoComponent],
    imports: [JigsawAlertModule, JigsawButtonModule],
    providers: [PopupService]
})
export class AlertPopupDemoModule {

}
