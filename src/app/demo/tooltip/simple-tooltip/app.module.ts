import { NgModule } from '@angular/core';
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawTooltipModule } from "jigsaw/component/tooltip/tooltip";
import { JigsawInputModule } from "jigsaw/component/input/input";
import { SimpleTooltipDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawInputModule, JigsawTooltipModule, JigsawButtonModule ],
    declarations: [ SimpleTooltipDemoComponent ],
    bootstrap: [ SimpleTooltipDemoComponent ]
})
export class SimpleTooltipDemoModule {}
