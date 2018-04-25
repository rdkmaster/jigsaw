import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ToolbarComp} from "./toolbar.comp";
import {MonitorService} from "../monitors/monitor-service";

@NgModule({
    declarations: [ToolbarComp],
    exports: [ToolbarComp],
    imports: [CommonModule],
    providers: [MonitorService]
})
export class ToolbarModule {
}
