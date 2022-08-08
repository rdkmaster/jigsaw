import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZoneForBetterPerformanceDemoComponent } from "./demo.component";
import { BoxComponent } from "./box.component";

@NgModule({
    declarations: [ZoneForBetterPerformanceDemoComponent, BoxComponent],
    exports: [ZoneForBetterPerformanceDemoComponent],
    imports: [CommonModule]
})
export class ZoneForBetterPerformanceDemoModule {
}
