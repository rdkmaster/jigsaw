import {NgModule} from "@angular/core";
import {JigsawMobileInputModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputFullComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    declarations: [InputFullComponent],
    exports: [InputFullComponent],
    imports: [JigsawMobileInputModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule, JigsawMobileHeaderModule]
})
export class InputFullModule {

}
