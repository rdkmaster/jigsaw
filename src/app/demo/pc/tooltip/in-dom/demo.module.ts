import {NgModule} from '@angular/core';
import {JigsawTooltipModule} from "jigsaw/pc-components/tooltip/tooltip";
import {TooltipInDomDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTooltipModule, JigsawDemoDescriptionModule],
    declarations: [TooltipInDomDemoComponent],
    exports: [TooltipInDomDemoComponent]
})
export class TooltipInDomDemoModule {
}
