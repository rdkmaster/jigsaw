import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StepsBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
@NgModule({
    imports: [
         CommonModule,JigsawDemoDescriptionModule

    ],
    declarations: [StepsBasicDemoComponent],
    exports: [StepsBasicDemoComponent]
})
export class StepsBasicDemoModule {
}
