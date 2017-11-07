import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {AlertInDomDemoComponent} from "./app.component";

@NgModule({
    declarations: [AlertInDomDemoComponent],
    bootstrap: [ AlertInDomDemoComponent ],
    imports: [
        JigsawAlertModule
    ]
})
export class AlertInDomDemoModule {
}
