import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "jigsaw/component/steps/index";
import {StepsVerticalFullComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTrustedHtmlModule} from "jigsaw/directive/trusted-html/trusted-html";
@NgModule({
    imports: [
         CommonModule,JigsawDemoDescriptionModule,JigsawStepsModule,JigsawTrustedHtmlModule

    ],
    declarations: [StepsVerticalFullComponent],
    exports: [StepsVerticalFullComponent]
})
export class StepsVerticalModule {
}
