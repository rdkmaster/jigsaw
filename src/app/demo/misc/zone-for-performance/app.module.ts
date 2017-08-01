import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ZoneForBetterPerformanceDemoComponent} from "./app.component";
import {BoxComponent} from "./box.component";

@NgModule({
    declarations: [ZoneForBetterPerformanceDemoComponent, BoxComponent],
    bootstrap: [ZoneForBetterPerformanceDemoComponent],
    imports: [CommonModule]
})
export class ZoneForBetterPerformanceDemoModule {
}
