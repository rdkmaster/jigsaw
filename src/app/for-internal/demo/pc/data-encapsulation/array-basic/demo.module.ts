import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ArrayCollectionBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ArrayCollectionBasicDemoComponent],
    exports: [ArrayCollectionBasicDemoComponent],
    imports: [JigsawDemoDescriptionModule]
})
export class ArrayCollectionBasicDemoModule {
}
