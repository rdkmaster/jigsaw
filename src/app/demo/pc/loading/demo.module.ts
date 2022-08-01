import {NgModule} from "@angular/core";
import {LoadingDemoComponent} from "./demo.component";
import {JigsawLoadingModule} from "../../../../jigsaw/common/components/loading/loading";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {LoadingBasicDemoComponent} from "./basic/demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {LoadingBallDemoComponent} from "./ball/demo.component";
import {LoadingService} from "../../../../jigsaw/common/service/loading.service";
import {LoadingBubbleDemoComponent} from "./bubble/demo.component";
import {LoadingFontIconDemoComponent} from "./font-icon/demo.component";
import {LoadingCircleDemoComponent} from "./circle/demo.component";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {LoadingColorDemoComponent} from "./color/demo.component";
import {LoadingCustomizeDemoComponent} from "./customize/demo.component";

@NgModule({
    declarations: [LoadingDemoComponent, LoadingBasicDemoComponent, LoadingBallDemoComponent, LoadingBubbleDemoComponent,
        LoadingFontIconDemoComponent, LoadingCircleDemoComponent, LoadingColorDemoComponent, LoadingCustomizeDemoComponent],
    imports: [
        JigsawLoadingModule, JigsawInputModule, JigsawButtonModule, CommonModule,
        JigsawDemoDescriptionModule, DemoTemplateModule, JigsawMarkdownModule, JigsawHeaderModule
    ],
    providers: [{provide: LoadingService}]
})
export class LoadingDemoModule {
}
