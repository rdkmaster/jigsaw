import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ArrayCollectionBasicDemoComponent} from "./app.component";

@NgModule({
    declarations: [ArrayCollectionBasicDemoComponent],
    exports: [ArrayCollectionBasicDemoComponent],
    imports: [JigsawDemoDescriptionModule]
})
export class ArrayCollectionBasicDemoModule {
}
