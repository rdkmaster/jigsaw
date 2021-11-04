import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawHeaderModule, JigsawTabsModule} from "jigsaw/public_api";
import {TabsTitleRendererComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTabsModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TabsTitleRendererComponent],
    exports: [TabsTitleRendererComponent]
})
export class TabsTitleRendererDemoModule {
}
