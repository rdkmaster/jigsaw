import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {InputReadOnlyDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [InputReadOnlyDemoComponent],
    exports: [InputReadOnlyDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputReadOnlyDemoModule {

}
