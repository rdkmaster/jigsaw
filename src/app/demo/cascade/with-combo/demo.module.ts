import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeWithComboDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/pc-components/cascade/cascade";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";

@NgModule({
    declarations: [CascadeWithComboDemoComponent],
    exports: [CascadeWithComboDemoComponent],
    imports: [JigsawCascadeModule, JigsawComboSelectModule, JigsawDemoDescriptionModule]
})
export class CascadeWithComboDemoModule {
}
