import { NgModule } from '@angular/core';
import { JigsawTimeModule } from "jigsaw/component/time/index";
import { TimeBasicDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTimeModule ],
    declarations: [ TimeBasicDemoComponent ],
    bootstrap: [ TimeBasicDemoComponent ]
})
export class TimeBasicDemoModule {}
