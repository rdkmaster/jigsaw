import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JigsawRadioModule, JigsawTooltipModule, PopupService} from "jigsaw/public_api";
import {TooltipTriggerDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [CommonModule, JigsawTooltipModule, JigsawRadioModule, JigsawDemoDescriptionModule, DemoTemplateModule],
    declarations: [TooltipTriggerDemoComponent],
    exports: [TooltipTriggerDemoComponent],
    providers: [PopupService]
})
export class TooltipTriggerDemoModule {
}
