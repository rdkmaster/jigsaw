import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeMultipleDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/component/cascade/cascade";

@NgModule({
    declarations: [CascadeMultipleDemoComponent],
    exports: [CascadeMultipleDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeMultipleDemoModule {

}
