import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PopupServiceIntroduceComponent} from "./app.component";

@NgModule({
    declarations: [PopupServiceIntroduceComponent],
    bootstrap: [PopupServiceIntroduceComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule]
})
export class PopupServiceIntroduceModule {

}
