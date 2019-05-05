import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {TableRendererOfTemplateRefDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule],
    declarations: [TableRendererOfTemplateRefDemoComponent],
    exports: [TableRendererOfTemplateRefDemoComponent]
})
export class TableRendererOfTemplateRefDemoModule {
}
