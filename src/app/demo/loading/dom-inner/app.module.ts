import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DomInnerDemoComponent} from "./app.component";

@NgModule({
    declarations: [DomInnerDemoComponent],
    bootstrap: [DomInnerDemoComponent],
    imports: [JigsawLoadingModule, JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule]
})
export class DomInnerDemoModule {

}
