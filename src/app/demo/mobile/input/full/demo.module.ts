import {NgModule} from "@angular/core";
import {JigsawMobileInputModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputFullComponent} from "./demo.component";

@NgModule({
    declarations: [InputFullComponent],
    exports: [InputFullComponent],
    imports: [JigsawMobileInputModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class InputFullModule {

}
