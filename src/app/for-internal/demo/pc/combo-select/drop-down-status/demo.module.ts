import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {JigsawCollapseModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ComboDropDownStatusDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ComboDropDownStatusDemoComponent],
    exports: [ComboDropDownStatusDemoComponent],
    imports: [JigsawComboSelectModule, JigsawCollapseModule, JigsawDemoDescriptionModule, FormsModule]
})
export class ComboDropDownStatusDemoModule {

}
