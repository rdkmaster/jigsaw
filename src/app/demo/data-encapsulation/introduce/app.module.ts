import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DataIntroduceComponent} from "./app.component";

@NgModule({
    declarations: [DataIntroduceComponent],
    exports: [DataIntroduceComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule]
})
export class DataIntroduceModule {

}
