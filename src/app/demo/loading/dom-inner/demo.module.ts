import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule} from "jigsaw/pc-components/loading/loading";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DomInnerDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DomInnerDemoComponent],
    exports: [DomInnerDemoComponent],
    imports: [JigsawLoadingModule, JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule]
})
export class DomInnerDemoModule {

}
