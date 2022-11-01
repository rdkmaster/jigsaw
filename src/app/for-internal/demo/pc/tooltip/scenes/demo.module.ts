import {NgModule} from '@angular/core';
import {JigsawButtonModule, PopupService, JigsawTooltipModule, JigsawHeaderModule, JigsawDialogModule} from "jigsaw/public_api";
import {TooltipScenesDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawDialogModule],
    declarations: [TooltipScenesDemoComponent],
    exports: [TooltipScenesDemoComponent],
    providers: [PopupService]
})
export class TooltipScenesDemoModule {
}
