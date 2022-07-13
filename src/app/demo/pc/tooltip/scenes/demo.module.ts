import {NgModule} from '@angular/core';
import {JigsawButtonModule, PopupService, JigsawTooltipModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TooltipScenesDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule, DemoTemplateModule],
    declarations: [TooltipScenesDemoComponent],
    exports: [TooltipScenesDemoComponent],
    providers: [PopupService]
})
export class TooltipScenesDemoModule {
}
