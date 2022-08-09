import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawButtonModule, JigsawNumericInputModule, JigsawDialogModule, JigsawSwitchModule, JigsawRadioModule, JigsawInputModule } from "jigsaw/public_api";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { JigsawMarkdownModule } from "../../markdown/markdown";
import { DialogBasicDemoComponent } from "./basic/demo.component";
import { DialogModalDemoComponent } from "./modal/demo.component";
import { DialogInDomDemoComponent } from "./in-dom/demo.component";
import { DialogPointDemoComponent } from "./point/demo.component";
import { UserDialog2Component } from "./point/user-dialog2/user-dialog";
import { DialogTemplateDemoComponent } from "./template/demo.component";
import { DialogCustomizeDemoComponent } from "./customize/demo.component";
import { DialogTopOffSetDemoComponent } from "./top-offset/demo.component";
import { DialogPopupOptionDemoComponent } from "./popup-option/demo.component";
import { DialogComponentDemoComponent } from "./component/demo.component";
import { UserDialogComponent } from "./component/user-dialog/user-dialog";
import { DialogDemoComponent } from "./demo.component";

@NgModule({
    declarations: [DialogDemoComponent, DialogBasicDemoComponent, DialogModalDemoComponent, DialogInDomDemoComponent, UserDialogComponent,
        DialogComponentDemoComponent, UserDialog2Component, DialogPointDemoComponent, DialogTemplateDemoComponent,
        DialogCustomizeDemoComponent, DialogTopOffSetDemoComponent, DialogPopupOptionDemoComponent],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawNumericInputModule, JigsawSwitchModule,
        JigsawRadioModule, CommonModule, DemoTemplateModule, JigsawMarkdownModule, JigsawDialogModule, JigsawInputModule]
})
export class DialogDemoModule {
}
