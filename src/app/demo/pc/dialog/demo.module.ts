import {NgModule} from "@angular/core";
import {DialogDemoComponent} from "./demo.component";
import {JigsawDialogModule} from "../../../../jigsaw/pc-components/dialog/dialog";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {JigsawNumericInputModule} from "../../../../jigsaw/pc-components/input/numeric-input";
import {JigsawSwitchModule} from "../../../../jigsaw/pc-components/switch/switch";
import {JigsawRadioModule} from "../../../../jigsaw/pc-components/radio/radios";
import {CommonModule} from "@angular/common";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {DialogBasicDemoComponent} from "./basic/demo.component";
import {DialogModalDemoComponent} from "./modal/demo.component";
import {DialogInDomDemoComponent} from "./in-dom/demo.component";
import {DialogPointDemoComponent} from "./point/demo.component";
import {UserDialog2Component} from "./point/user-dialog2/user-dialog";
import {DialogTemplateDemoComponent} from "./template/demo.component";
import {DialogCustomizeDemoComponent} from "./customize/demo.component";
import {DialogTopOffSetDemoComponent} from "./top-offset/demo.component";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {DialogPopupOptionDemoComponent} from "./popup-option/demo.component";
import {DialogComponentDemoComponent} from "./component/demo.component";
import {UserDialogComponent} from "./component/user-dialog/user-dialog";

@NgModule({
    declarations: [DialogDemoComponent, DialogBasicDemoComponent, DialogModalDemoComponent, DialogInDomDemoComponent, UserDialogComponent,
        DialogComponentDemoComponent, UserDialog2Component, DialogPointDemoComponent, DialogTemplateDemoComponent,
        DialogCustomizeDemoComponent, DialogTopOffSetDemoComponent, DialogPopupOptionDemoComponent],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawNumericInputModule, JigsawSwitchModule,
        JigsawRadioModule, CommonModule, DemoTemplateModule, JigsawMarkdownModule, JigsawDialogModule, JigsawInputModule]
})
export class DialogDemoModule {
}
