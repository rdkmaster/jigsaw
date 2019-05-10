import {NgModule} from "@angular/core";
import {JigsawMobileAlertModule} from "jigsaw/mobile-components/alert/alert";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AlertPopupDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AlertPopupDemoComponent],
    exports: [ AlertPopupDemoComponent ],
    imports: [JigsawMobileAlertModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule,]
})
export class AlertPopupDemoModule {
}
