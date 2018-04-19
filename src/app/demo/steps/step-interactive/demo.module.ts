import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "jigsaw/component/steps/index";
import {JigsawTrustedHtmlModule} from "jigsaw/directive/trusted-html/trusted-html";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {StepsClickChangeStatusComponent} from './demo.component';

@NgModule({
    imports: [
         CommonModule,JigsawDemoDescriptionModule,JigsawStepsModule,JigsawTrustedHtmlModule
    ],
    declarations: [StepsClickChangeStatusComponent],
    exports: [StepsClickChangeStatusComponent]
})
export class StepsClickChangeStatusModule {
}
