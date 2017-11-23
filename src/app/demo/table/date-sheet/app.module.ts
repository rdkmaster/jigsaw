import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateSheetRenderer, TableDateSheetDemoComponent} from './app.component';

@NgModule({
    imports: [CommonModule, JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableDateSheetDemoComponent, DateSheetRenderer],
    bootstrap: [TableDateSheetDemoComponent],
    entryComponents: [DateSheetRenderer]
})
export class TableDateSheetDemoModule {
}
