import { NgModule } from "@angular/core";
import { LoadingDemoComponent } from "./demo.component";
import { JigsawButtonModule, JigsawLoadingModule, JigsawInputModule, LoadingService, JigsawHeaderModule } from "jigsaw/public_api";
import { CommonModule } from "@angular/common";
import { LoadingBasicDemoComponent } from "./basic/demo.component";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { DocTemplateModule } from '../../doc-template/doc-template';
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { LoadingBallDemoComponent } from "./ball/demo.component";
import { LoadingBubbleDemoComponent } from "./bubble/demo.component";
import { LoadingFontIconDemoComponent } from "./font-icon/demo.component";
import { LoadingCircleDemoComponent } from "./circle/demo.component";
import { LoadingColorDemoComponent } from "./color/demo.component";
import { LoadingCustomizeDemoComponent } from "./customize/demo.component";

@NgModule({
    declarations: [
        LoadingDemoComponent,
        LoadingBasicDemoComponent,
        LoadingBallDemoComponent,
        LoadingBubbleDemoComponent,
        LoadingFontIconDemoComponent,
        LoadingCircleDemoComponent,
        LoadingColorDemoComponent,
        LoadingCustomizeDemoComponent
    ],
    imports: [
        JigsawLoadingModule,
        JigsawInputModule,
        JigsawButtonModule,
        CommonModule,
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawHeaderModule
    ],
    providers: [{ provide: LoadingService }]
})
export class LoadingDemoModule {
}
