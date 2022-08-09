import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawCheckBoxModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableRendererOfTemplateRefDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawCheckBoxModule, DemoTemplateModule, JigsawButtonModule],
    declarations: [TableRendererOfTemplateRefDemoComponent],
    exports: [TableRendererOfTemplateRefDemoComponent]
})
export class TableRendererOfTemplateRefDemoModule {
}
