import {NgModule} from "@angular/core";
import {ArrayCollectionAjaxDemoComponent} from "./demo.component";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
@NgModule({
    declarations: [ArrayCollectionAjaxDemoComponent],
    exports: [ ArrayCollectionAjaxDemoComponent ],
    imports: [CommonModule, JigsawDemoDescriptionModule]
})
export class ArrayCollectionAjaxDemoModule{

}
