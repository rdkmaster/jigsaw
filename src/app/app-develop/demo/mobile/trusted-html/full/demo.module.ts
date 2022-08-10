import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {JigsawTrustedHtmlModule} from "jigsaw/mobile_public_api";
import {TrustedHtmlFullComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [CommonModule, FormsModule, JigsawTrustedHtmlModule, JigsawDemoDescriptionModule, JigsawMobileHeaderModule],
    declarations: [TrustedHtmlFullComponent],
    exports: [TrustedHtmlFullComponent]
})
export class TrustedHtmlFullModule {
}
