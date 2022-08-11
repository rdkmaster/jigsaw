import {NgModule} from '@angular/core';
import {JigsawButtonModule, PopupService, JigsawTooltipModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TooltipThemeDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TooltipThemeDemoComponent],
    exports: [TooltipThemeDemoComponent],
    providers: [PopupService]
})
export class TooltipThemeDemoModule {
}
