import { NgModule } from '@angular/core';
import { JigsawTimeModule } from "jigsaw/component/time/index";
import { JigsawComboSelectModule } from "jigsaw/component/combo-select/index";
import { JigsawRangeTimeModule } from "jigsaw/component/range-time/index";
import { ComboSelectDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTimeModule, JigsawComboSelectModule, JigsawRangeTimeModule ],
    declarations: [ ComboSelectDemoComponent ],
    bootstrap: [ ComboSelectDemoComponent ]
})
export class TimeComboDemoModule {}
