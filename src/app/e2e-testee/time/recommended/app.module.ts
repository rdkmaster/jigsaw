import { NgModule } from '@angular/core';
import { JigsawTimeModule } from "jigsaw/component/time/index";
import { TimeRecommendedComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTimeModule ],
    declarations: [ TimeRecommendedComponent ],
    bootstrap: [ TimeRecommendedComponent ]
})
export class TimeRecommendedDemoModule {}
