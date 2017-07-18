import { NgModule } from '@angular/core';
import { JigsawSelectModule } from "jigsaw/component/select/select";
import { SelectScrollDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawSelectModule ],
    declarations: [ SelectScrollDemoComponent ],
    bootstrap: [ SelectScrollDemoComponent ]
})
export class SelectScrollDemoModule {}
