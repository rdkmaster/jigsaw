import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsFullComponent } from './app.component';
import { JigsawStepsModule } from "../../../../jigsaw/component/steps/steps.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawStepsModule
    ],
    declarations: [StepsFullComponent],
    bootstrap: [ StepsFullComponent ],
})
export class StepsFullModule {
}
