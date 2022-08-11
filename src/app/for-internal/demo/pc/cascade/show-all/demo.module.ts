import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {CascadeShowAllDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeShowAllDemoComponent],
    exports: [CascadeShowAllDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeShowAllDemoModule {

}
