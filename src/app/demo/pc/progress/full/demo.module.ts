import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProgressModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ProgressFullComponent} from "./demo.component";

@NgModule({
    declarations: [ProgressFullComponent],
    exports: [ProgressFullComponent],
    imports: [JigsawProgressModule, JigsawDemoDescriptionModule, CommonModule, JigsawNumericInputModule]
})
export class ProgressFullModule {

}
