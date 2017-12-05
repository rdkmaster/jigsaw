import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableBasicDemoComponent} from './app.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableBasicDemoComponent],
    exports: [TableBasicDemoComponent]
})
export class TableBasicDemoModule {
}
