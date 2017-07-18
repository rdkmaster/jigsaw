import {NgModule} from "@angular/core";
import {CustomizeAlertDemoComponent} from "./app.component";
import {JigsawAlertModule} from "../../../../jigsaw/component/alert/alert";
import {CustomizedAlert} from "./customized-alert";
@NgModule({
    declarations: [CustomizeAlertDemoComponent, CustomizedAlert],
    imports: [JigsawAlertModule]
})
export class CustomizeAlertDemoModule {

}
