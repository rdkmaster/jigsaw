import {NgModule} from "@angular/core";
import {TrustedHtmlDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {JigsawTrustedHtmlModule} from "../../../../jigsaw/common/directive/trusted-html/trusted-html";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {JigsawTextareaModule} from "../../../../jigsaw/pc-components/textarea";
import {TrustedHtmlBasicComponent} from "./basic/demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    declarations: [TrustedHtmlDemoComponent, TrustedHtmlBasicComponent],
    imports: [
        JigsawMarkdownModule,
        CommonModule, FormsModule, JigsawTrustedHtmlModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawTextareaModule, DemoTemplateModule
    ]
})
export class TrustedHtmlDemoModule {
}
