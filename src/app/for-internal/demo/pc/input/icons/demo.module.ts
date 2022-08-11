import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {InputPrefixIconDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [InputPrefixIconDemoComponent],
    exports: [InputPrefixIconDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class InputPrefixIconDemoModule {

}
