import {NgModule} from "@angular/core";
import {ArrayCollectionAjaxDemoComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
@NgModule({
    declarations: [ArrayCollectionAjaxDemoComponent],
    bootstrap: [ ArrayCollectionAjaxDemoComponent ],
    imports: [CommonModule, JigsawDemoDescriptionModule]
})
export class ArrayCollectionAjaxDemoModule{

}
