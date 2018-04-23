import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/component/cascade/cascade";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeMultipleDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeMultipleDemoComponent],
    exports: [CascadeMultipleDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeMultipleDemoModule {

}
