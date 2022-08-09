import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/public_api";
import {CalendarDateRenderer, TableCalendarDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [CommonModule, JigsawTableModule, DemoTemplateModule],
    declarations: [TableCalendarDemoComponent, CalendarDateRenderer],
    exports: [TableCalendarDemoComponent]
})
export class TableCalendarDemoModule {
}
