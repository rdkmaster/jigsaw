import {NgModule} from "@angular/core";
import {JigsawCascadeModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeWithComboDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeWithComboDemoComponent],
    exports: [CascadeWithComboDemoComponent],
    imports: [JigsawCascadeModule, JigsawComboSelectModule, JigsawDemoDescriptionModule]
})
export class CascadeWithComboDemoModule {
}
