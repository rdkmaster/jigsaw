import { NgModule } from '@angular/core';
import { JigsawTagModule } from "jigsaw/component/tag/tag";
import { TagBasicDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTagModule ],
    declarations: [ TagBasicDemoComponent ],
    bootstrap: [ TagBasicDemoComponent ]
})
export class TagBasicDemoModule {}
