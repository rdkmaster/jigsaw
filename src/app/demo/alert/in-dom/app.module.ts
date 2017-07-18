import {NgModule} from "@angular/core";
import {AlertInDomDemoComponent} from "./app.component";
import {JigsawAlertModule} from "../../../../jigsaw/component/alert/alert";
@NgModule({
    declarations: [AlertInDomDemoComponent],
    imports: [JigsawAlertModule],
    exports: [AlertInDomDemoComponent]
})
export class AlertInDomDemoModule{

}
