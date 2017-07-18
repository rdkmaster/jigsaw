import { NgModule } from '@angular/core';
import { JigsawTimeModule } from "jigsaw/component/time/index";
import { TimeGrItemsComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTimeModule ],
    declarations: [ TimeGrItemsComponent ],
    bootstrap: [ TimeGrItemsComponent ]
})
export class TimeGrItemsDemoModule {}
