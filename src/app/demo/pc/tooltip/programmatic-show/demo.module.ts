import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JigsawRadioModule, JigsawTooltipModule, PopupService} from "jigsaw/public_api";
import {TooltipShowDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTooltipModule, JigsawRadioModule, JigsawDemoDescriptionModule],
    declarations: [TooltipShowDemoComponent],
    exports: [TooltipShowDemoComponent],
    providers: [PopupService]
})
export class TooltipShowDemoModule {
}
