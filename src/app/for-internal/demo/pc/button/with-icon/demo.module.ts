import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ButtonIconDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonIconDemoComponent],
    exports: [ButtonIconDemoComponent],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class ButtonIconDemoModule {

}
