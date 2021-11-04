import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonBarModule, JigsawHeaderModule, JigsawStepsModule} from "jigsaw/public_api";
import {JigsawStepManyStepsDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        CommonModule,
        PerfectScrollbarModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawStepsModule,
        JigsawButtonBarModule
    ],
    declarations: [JigsawStepManyStepsDemoComponent],
    exports: [JigsawStepManyStepsDemoComponent]
})
export class JigsawStepManyStepsDemoModule {
}
