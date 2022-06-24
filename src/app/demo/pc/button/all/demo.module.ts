import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule, JigsawRadioLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonAllComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

import {JigsawMarkdownModule} from "../../../../markdown/markdown";

import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {ButtonKeyComponent} from "./key/demo.component";
import {ButtonImportantComponent} from "./important/demo.component";
import {ButtonCommonComponent} from "./common/demo.component";
import {ButtonMoreComponent} from "./more/demo.component";
import {ButtonDangerComponent} from "./danger/demo.component";
import {ButtonIconComponent} from "./icon/demo.component";
import {ButtonIconWordComponent} from "./icon-word/demo.component";
import {ButtonLoadingComponent} from "./loading/demo.component";

@NgModule({
    declarations: [
        ButtonAllComponent,
        ButtonKeyComponent,
        ButtonImportantComponent,
        ButtonCommonComponent,
        ButtonMoreComponent,
        ButtonDangerComponent,
        ButtonIconComponent,
        ButtonIconWordComponent,
        ButtonLoadingComponent
    ],
    exports: [ButtonAllComponent],
    imports: [
        JigsawButtonModule,
        JigsawCheckBoxModule,
        JigsawLoadingModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawMarkdownModule,
        JigsawRadioLiteModule,
        DemoTemplateModule
    ],
})
export class ButtonAllModule {

}
