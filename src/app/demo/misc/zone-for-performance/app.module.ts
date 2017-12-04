import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ZoneForBetterPerformanceDemoComponent} from "./app.component";
import {BoxComponent} from "./box.component";

@NgModule({
    declarations: [ZoneForBetterPerformanceDemoComponent, BoxComponent],
    exports: [ZoneForBetterPerformanceDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule]
})
export class ZoneForBetterPerformanceDemoModule {
}
