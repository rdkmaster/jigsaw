import {NgModule} from '@angular/core';
import {JigsawTooltipModule} from "jigsaw/component/tooltip/tooltip";
import {TooltipInDomDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTooltipModule, JigsawDemoDescriptionModule],
    declarations: [TooltipInDomDemoComponent],
    exports: [TooltipInDomDemoComponent]
})
export class TooltipInDomDemoModule {
}
