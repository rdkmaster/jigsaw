import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeWithComboDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/component/cascade/cascade";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";

@NgModule({
    declarations: [CascadeWithComboDemoComponent],
    exports: [CascadeWithComboDemoComponent],
    imports: [JigsawCascadeModule, JigsawComboSelectModule, JigsawDemoDescriptionModule]
})
export class CascadeWithComboDemoModule {
}
