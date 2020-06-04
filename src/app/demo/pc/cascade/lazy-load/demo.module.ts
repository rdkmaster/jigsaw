import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeLazyLoadDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeLazyLoadDemoComponent],
    exports: [CascadeLazyLoadDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeLazyLoadDemoModule {
}
