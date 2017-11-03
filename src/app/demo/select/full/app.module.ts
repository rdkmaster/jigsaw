import { NgModule } from '@angular/core';
import { JigsawSelectModule } from "jigsaw/component/select/select";
import { SelectFullComponent }  from './app.component';

@NgModule({
    imports: [ JigsawSelectModule ],
    declarations: [ SelectFullComponent ],
    bootstrap: [ SelectFullComponent ]
})
export class SelectFullModule {}
