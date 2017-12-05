import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {TableRendererOfTemplateRefDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule],
    declarations: [TableRendererOfTemplateRefDemoComponent],
    exports: [TableRendererOfTemplateRefDemoComponent]
})
export class TableRendererOfTemplateRefDemoModule {
}
