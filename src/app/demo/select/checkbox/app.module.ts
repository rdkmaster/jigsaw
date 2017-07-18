import { NgModule } from '@angular/core';
import { JigsawSelectModule } from "jigsaw/component/select/select";
import { JigsawCheckBoxModule } from "jigsaw/component/checkbox/index";
import { SelectCheckboxDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawSelectModule, JigsawCheckBoxModule ],
    declarations: [ SelectCheckboxDemoComponent ],
    bootstrap: [ SelectCheckboxDemoComponent ]
})
export class SelectCheckboxDemoModule {}
