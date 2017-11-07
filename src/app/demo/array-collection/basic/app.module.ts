import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ArrayCollectionBasicDemoComponent} from "./app.component";

@NgModule({
    declarations: [ArrayCollectionBasicDemoComponent],
    bootstrap: [ArrayCollectionBasicDemoComponent],
    imports: [JigsawDemoDescriptionModule]
})
export class ArrayCollectionBasicDemoModule {
}
