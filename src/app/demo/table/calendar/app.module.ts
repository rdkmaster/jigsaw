import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CalendarDateRenderer, TableCalendarDemoComponent} from './app.component';

@NgModule({
    imports: [CommonModule, JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableCalendarDemoComponent, CalendarDateRenderer],
    bootstrap: [TableCalendarDemoComponent],
    entryComponents: [CalendarDateRenderer]
})
export class TableCalendarDemoModule {
}
