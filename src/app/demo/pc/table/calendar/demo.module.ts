import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CalendarDateRenderer, TableCalendarDemoComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableCalendarDemoComponent, CalendarDateRenderer],
    exports: [TableCalendarDemoComponent],
    entryComponents: [CalendarDateRenderer]
})
export class TableCalendarDemoModule {
}
