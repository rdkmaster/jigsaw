import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { MenuAllComponent } from "./demo.component";
import { CommonModule } from "@angular/common";
import { MenuSoftMenuDemoComponent } from "./softmenu/demo.component";
import { MenuHorizontalNavigationDemoComponent } from "./horizontal-navigation/demo.component";
import { MenuInDialogDemo } from "./in-dialog/demo.component";
import {
    JigsawCollapseModule, JigsawDialogModule, JigsawButtonModule, JigsawSwitchModule,
    JigsawFloatModule, JigsawNumericInputModule, JigsawMenuModule, JigsawDrawerModule
} from "jigsaw/public_api";
import { MenuWithButtonDemoComponent } from "./with-button/demo.component";
import { MenuDropDownDemoComponent } from "./drop-down/demo.component";
import { MenuRightClickDemoComponent } from "./right-click/demo.component";
import { NavigationMenuInlineDemoComponent } from "./nav-inline/demo.component";
import { NavigationInDrawerDemoComponent } from "./in-drawer/demo.component";

@NgModule({
    declarations: [
        MenuAllComponent,
        MenuSoftMenuDemoComponent,
        MenuHorizontalNavigationDemoComponent,
        MenuInDialogDemo,
        MenuWithButtonDemoComponent,
        MenuDropDownDemoComponent,
        MenuRightClickDemoComponent,
        NavigationMenuInlineDemoComponent,
        NavigationInDrawerDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        CommonModule,
        JigsawCollapseModule,
        JigsawDialogModule,
        JigsawButtonModule,
        JigsawSwitchModule,
        JigsawFloatModule,
        JigsawNumericInputModule,
        JigsawMenuModule,
        JigsawDrawerModule

    ]
})
export class MenuDemoModule {
}
