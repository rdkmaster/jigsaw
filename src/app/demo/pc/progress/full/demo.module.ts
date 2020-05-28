import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ProgressFullComponent} from "./demo.component";
import {CommonModule} from "@angular/common";
import {JigsawProgressModule} from "jigsaw/pc-components/progress/progress";

@NgModule({
    declarations: [ProgressFullComponent],
    exports: [ProgressFullComponent],
    imports: [JigsawProgressModule, JigsawDemoDescriptionModule,CommonModule]
})
export class ProgressFullModule {

}
