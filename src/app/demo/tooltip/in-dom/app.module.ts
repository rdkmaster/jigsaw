import { NgModule } from '@angular/core';
import { JigsawTooltipModule } from "jigsaw/component/tooltip/tooltip";
import { TooltipInDomDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTooltipModule ],
    declarations: [ TooltipInDomDemoComponent ],
    bootstrap: [ TooltipInDomDemoComponent ]
})
export class TooltipInDomDemoModule {}
