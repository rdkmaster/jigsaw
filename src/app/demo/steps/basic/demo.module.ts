import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "jigsaw/component/steps/index";
import {StepsHorizontalBasicComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTrustedHtmlModule} from "jigsaw/directive/trusted-html/trusted-html";
@NgModule({
    imports: [
         CommonModule,JigsawDemoDescriptionModule,JigsawStepsModule,JigsawTrustedHtmlModule

    ],
    declarations: [StepsHorizontalBasicComponent],
    exports: [StepsHorizontalBasicComponent]
})
export class StepsHorizontalBasicModule {
}
