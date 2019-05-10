import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputFullComponent} from "./demo.component";

@NgModule({
    declarations: [InputFullComponent],
    exports: [InputFullComponent],
    imports: [JigsawMobileInputModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class InputFullModule {

}
