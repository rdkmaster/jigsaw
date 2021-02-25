import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawInputModule, PopupService} from "jigsaw/public_api";
import {JigsawTooltipModule} from "jigsaw/common/directive/tooltip/tooltip";
import {TooltipHtmlDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawInputModule, JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TooltipHtmlDemoComponent],
    exports: [TooltipHtmlDemoComponent],
    providers: [PopupService]
})
export class TooltipHtmlDemoModule {
}
