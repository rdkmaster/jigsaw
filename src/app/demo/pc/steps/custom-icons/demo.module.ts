import {NgModule} from "@angular/core";
import {StepsCustomIconsComponent} from "./demo.component";
import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "../../../../../jigsaw/pc-components/steps";
import {JigsawDemoDescriptionModule} from "../../../../demo-description/demo-description";

@NgModule({
    imports:[CommonModule,JigsawStepsModule,JigsawDemoDescriptionModule],
    declarations:[StepsCustomIconsComponent],
    exports:[StepsCustomIconsComponent]

})
export class StepsCustomIconsModule {

}
