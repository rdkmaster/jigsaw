import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawCheckBoxModule } from "jigsaw/component/checkbox/index";
import { TableRendererOfTemplateRefDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawCheckBoxModule ],
    declarations: [ TableRendererOfTemplateRefDemoComponent ],
    bootstrap: [ TableRendererOfTemplateRefDemoComponent ]
})
export class TableRendererOfTemplateRefDemoModule {}
