import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {CascadeBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeBasicDemoComponent],
    exports: [CascadeBasicDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeBasicDemoModule {

}
