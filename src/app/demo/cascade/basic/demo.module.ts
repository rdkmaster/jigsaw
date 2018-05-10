import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/component/cascade/cascade";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeBasicDemoComponent],
    exports: [CascadeBasicDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeBasicDemoModule {

}
