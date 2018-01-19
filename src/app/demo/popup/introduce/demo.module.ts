import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PopupServiceIntroduceComponent} from "./demo.component";

@NgModule({
    declarations: [PopupServiceIntroduceComponent],
    exports: [PopupServiceIntroduceComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule]
})
export class PopupServiceIntroduceModule {

}
