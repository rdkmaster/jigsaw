import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "jigsaw/public_api";
import {StepsCustomIconsComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "../../../../demo-description/demo-description";

@NgModule({
    imports:[CommonModule,JigsawStepsModule,JigsawDemoDescriptionModule],
    declarations:[StepsCustomIconsComponent],
    exports:[StepsCustomIconsComponent]

})
export class StepsCustomIconsModule {

}
