import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ArrayCollectionBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ArrayCollectionBasicDemoComponent],
    exports: [ArrayCollectionBasicDemoComponent],
    imports: [JigsawDemoDescriptionModule]
})
export class ArrayCollectionBasicDemoModule {
}
