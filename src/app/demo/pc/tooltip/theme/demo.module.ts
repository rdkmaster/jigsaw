import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawInputModule, PopupService, JigsawTooltipModule, JigsawButtonBarModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TooltipThemeDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawHeaderModule],
    declarations: [TooltipThemeDemoComponent],
    exports: [TooltipThemeDemoComponent],
    providers: [PopupService]
})
export class TooltipThemeDemoModule {
}
