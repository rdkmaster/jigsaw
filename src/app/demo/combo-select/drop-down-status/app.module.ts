import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboDropDownStatusDemoComponent} from "./app.component";

@NgModule({
    declarations: [ComboDropDownStatusDemoComponent],
    exports: [ComboDropDownStatusDemoComponent],
    imports: [JigsawComboSelectModule, JigsawCollapseModule, JigsawDemoDescriptionModule, FormsModule]
})
export class ComboDropDownStatusDemoModule {

}
