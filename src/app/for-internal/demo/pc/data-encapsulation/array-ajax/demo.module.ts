import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ArrayCollectionAjaxDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [ArrayCollectionAjaxDemoComponent],
    exports: [ ArrayCollectionAjaxDemoComponent ],
    imports: [CommonModule, JigsawDemoDescriptionModule]
})
export class ArrayCollectionAjaxDemoModule{

}
