import { NgModule } from '@angular/core';
import { JigsawSelectModule } from "jigsaw/component/select/select";
import { SelectLiveDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawSelectModule ],
    declarations: [ SelectLiveDemoComponent ],
    bootstrap: [ SelectLiveDemoComponent ]
})
export class SelectLiveDemoModule {}
