import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import {
    JigsawBadgeModule,
    JigsawButtonBarModule,
    JigsawButtonModule,
    JigsawCheckBoxModule,
    JigsawIconModule,
    JigsawInputModule,
    JigsawRadioLiteModule,
    JigsawSwitchModule,
    JigsawTileLiteModule,
    JigsawNumericInputModule,
    JigsawListModule
} from "jigsaw/public_api";
import { BadgeAllComponent } from "./demo.component";
import { BadgeBasicDemoComponent } from "./basic/demo.component";
import { BadgeMaxValueDemoComponent } from "./max-value/demo.component";
import { BadgeOffsetDemoComponent } from "./offset/demo.component";
import { BadgeStatusDemoComponent } from "./status/demo.component";
import { BadgeMaskDemoComponent } from "./mask/demo.component";
import { BadgeStyleDemoComponent } from "./style/demo.component";


@NgModule({
    declarations: [
        BadgeAllComponent,
        BadgeBasicDemoComponent,
        BadgeMaxValueDemoComponent,
        BadgeOffsetDemoComponent,
        BadgeStatusDemoComponent,
        BadgeMaskDemoComponent,
        BadgeStyleDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawBadgeModule,
        JigsawButtonBarModule,
        JigsawButtonModule,
        JigsawCheckBoxModule,
        JigsawIconModule,
        JigsawInputModule,
        JigsawRadioLiteModule,
        JigsawSwitchModule,
        JigsawTileLiteModule,
        JigsawNumericInputModule,
        JigsawListModule
    ]
})
export class BadgeDemoModule {
}
