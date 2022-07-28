import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../../demo/demo-template/demo-template';
import {JigsawMarkdownModule} from '../../../markdown/markdown';
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
import {BadgeAllComponent} from "./demo.component";
import {BadgeBasicDemoComponent} from "./basic/demo.component";
import {BadgeMaxValueDemoComponent} from "./max-value/demo.component";
import {BadgeOffsetDemoComponent} from "./offset/demo.component";
import {BadgeStatusDemoComponent} from "./status/demo.component";
import {BadgeMaskDemoComponent} from "./mask/demo.component";
import {BadgeStyleDemoComponent} from "./style/demo.component";


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
    ],
    exports: [BadgeAllComponent]
})
export class BadgeDemoModule {
}
