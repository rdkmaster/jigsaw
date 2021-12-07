import {NgModule} from '@angular/core';
import {JigsawInputModule, JigsawSwitchModule, JigsawTooltipModule, PopupService} from "jigsaw/public_api";
import {TooltipShowDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawInputModule, JigsawTooltipModule, JigsawSwitchModule, JigsawDemoDescriptionModule],
    declarations: [TooltipShowDemoComponent],
    exports: [TooltipShowDemoComponent],
    providers: [PopupService]
})
export class TooltipShowDemoModule {
}
