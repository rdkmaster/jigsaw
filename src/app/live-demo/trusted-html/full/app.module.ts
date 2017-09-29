import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TrustedHtmlFullComponent} from './app.component';
import {JigsawTrustedHtmlModule} from "jigsaw/directive/trusted-html/trusted-html";

@NgModule({
    imports: [CommonModule, FormsModule, JigsawTrustedHtmlModule],
    declarations: [TrustedHtmlFullComponent],
    bootstrap: [TrustedHtmlFullComponent]
})
export class TrustedHtmlFullModule {
}
