import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableContentWidthDemoComponent} from './app.component';

@NgModule({
    imports: [JigsawTableModule],
    declarations: [TableContentWidthDemoComponent],
    bootstrap: [TableContentWidthDemoComponent]
})
export class TableContentWidthDemoModule {
}
