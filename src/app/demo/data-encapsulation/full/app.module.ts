import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DataFullDemoComponent} from "./app.component";

@NgModule({
    declarations: [DataFullDemoComponent],
    bootstrap: [DataFullDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule]
})
export class DataFullDemoModule {

}
