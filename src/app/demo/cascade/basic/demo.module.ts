import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeBasicDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/component/cascade/cascade";

@NgModule({
    declarations: [CascadeBasicDemoComponent],
    exports: [CascadeBasicDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeBasicDemoModule {

}
