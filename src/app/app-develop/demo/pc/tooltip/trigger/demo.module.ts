import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JigsawRadioModule, JigsawTooltipModule, PopupService} from "jigsaw/public_api";
import {TooltipTriggerDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTooltipModule, JigsawRadioModule, JigsawDemoDescriptionModule],
    declarations: [TooltipTriggerDemoComponent],
    exports: [TooltipTriggerDemoComponent],
    providers: [PopupService]
})
export class TooltipTriggerDemoModule {
}
