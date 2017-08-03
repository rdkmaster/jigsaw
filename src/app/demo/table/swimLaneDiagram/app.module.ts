import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {swimLaneDiagramDemoComponent} from './app.component';
import {TableSwimLaneCell} from "./table-renderer";

@NgModule({
    imports: [JigsawTableModule],
    declarations: [swimLaneDiagramDemoComponent, TableSwimLaneCell],
    bootstrap: [swimLaneDiagramDemoComponent],
    entryComponents: [TableSwimLaneCell]
})
export class swimLaneDiagramDemoModule {
}
