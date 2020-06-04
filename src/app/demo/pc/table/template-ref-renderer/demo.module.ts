import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawCheckBoxModule} from "jigsaw/public_api";
import {TableRendererOfTemplateRefDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule],
    declarations: [TableRendererOfTemplateRefDemoComponent],
    exports: [TableRendererOfTemplateRefDemoComponent]
})
export class TableRendererOfTemplateRefDemoModule {
}
