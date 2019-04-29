import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {JigsawCollapseModule} from "jigsaw/pc-components/collapse/collapse";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboDropDownStatusDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ComboDropDownStatusDemoComponent],
    exports: [ComboDropDownStatusDemoComponent],
    imports: [JigsawComboSelectModule, JigsawCollapseModule, JigsawDemoDescriptionModule, FormsModule]
})
export class ComboDropDownStatusDemoModule {

}
