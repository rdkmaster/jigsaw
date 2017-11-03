import { NgModule } from '@angular/core';
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import { JigsawTableModule } from "jigsaw/component/table/table";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import { TableColumnSetWidthDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawSliderModule, JigsawSwitchModule ],
    declarations: [ TableColumnSetWidthDemoComponent ],
    bootstrap: [ TableColumnSetWidthDemoComponent ]
})
export class TableColumnSetWidthDemoModule {}
