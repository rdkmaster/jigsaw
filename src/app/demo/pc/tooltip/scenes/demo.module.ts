import {NgModule} from '@angular/core';
import {JigsawButtonModule, PopupService, JigsawTooltipModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TooltipScenesDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TooltipScenesDemoComponent],
    exports: [TooltipScenesDemoComponent],
    providers: [PopupService]
})
export class TooltipScenesDemoModule {
}
