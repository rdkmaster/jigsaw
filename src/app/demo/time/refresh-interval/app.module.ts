import { NgModule } from '@angular/core';
import { JigsawTimeModule } from "jigsaw/component/time/index";
import { TimeRefreshIntervalComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTimeModule ],
    declarations: [ TimeRefreshIntervalComponent ],
    bootstrap: [ TimeRefreshIntervalComponent ]
})
export class TimeRrefreshIntervalDemoModule {}
