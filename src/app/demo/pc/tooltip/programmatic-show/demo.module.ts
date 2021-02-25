import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawInputModule, PopupService} from "jigsaw/public_api";
import {JigsawTooltipModule} from "jigsaw/common/directive/tooltip/tooltip";
import {TooltipShowDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawInputModule, JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TooltipShowDemoComponent],
    exports: [TooltipShowDemoComponent],
    providers: [PopupService]
})
export class TooltipShowDemoModule {
}
