import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawInputModule, PopupService, JigsawTooltipModule} from "jigsaw/public_api";
import {TooltipWordBreakDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawInputModule, JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TooltipWordBreakDemoComponent],
    exports: [TooltipWordBreakDemoComponent],
    providers: [PopupService]
})
export class TooltipWordBreakDemoModule {
}
