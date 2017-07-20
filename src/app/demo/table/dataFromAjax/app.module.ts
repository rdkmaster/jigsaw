import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { TableDataFromAjaxDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawButtonModule ],
    declarations: [ TableDataFromAjaxDemoComponent ],
    bootstrap: [ TableDataFromAjaxDemoComponent ]
})
export class TableDataFromAjaxDemoModule {}
