import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawInputModule, PopupService, JigsawTooltipModule} from "jigsaw/public_api";
import {TooltipHtmlDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawInputModule, JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule, DemoTemplateModule],
    declarations: [TooltipHtmlDemoComponent],
    exports: [TooltipHtmlDemoComponent],
    providers: [PopupService]
})
export class TooltipHtmlDemoModule {
}
