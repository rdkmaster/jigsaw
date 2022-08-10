import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {JigsawTrustedHtmlModule} from "jigsaw/public_api";
import {TrustedHtmlFullComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {JigsawTextareaModule} from "jigsaw/public_api";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [CommonModule, FormsModule, JigsawTrustedHtmlModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawTextareaModule],
    declarations: [TrustedHtmlFullComponent],
    exports: [TrustedHtmlFullComponent]
})
export class TrustedHtmlFullModule {
}
