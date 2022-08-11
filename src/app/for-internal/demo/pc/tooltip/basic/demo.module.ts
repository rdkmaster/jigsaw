import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawInputModule, PopupService, JigsawTooltipModule} from "jigsaw/public_api";
import {TooltipBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawInputModule, JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TooltipBasicDemoComponent],
    exports: [TooltipBasicDemoComponent],
    providers: [PopupService]
})
export class TooltipBasicDemoModule {
}
