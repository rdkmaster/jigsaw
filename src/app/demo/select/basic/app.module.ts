import { NgModule } from '@angular/core';
import { JigsawSelectModule } from "jigsaw/component/select/select";
import { SelectBasicDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawSelectModule ],
    declarations: [ SelectBasicDemoComponent ],
    bootstrap: [ SelectBasicDemoComponent ]
})
export class SelectBasicDemoModule {}
