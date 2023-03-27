import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawButtonModule, JigsawHeaderModule, JigsawInputModule, JigsawRadioModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { LocalPageableSelectArrayDemoComponent } from "./demo.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [LocalPageableSelectArrayDemoComponent],
    exports: [LocalPageableSelectArrayDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule,
        PerfectScrollbarModule, JigsawHeaderModule, JigsawSwitchModule, JigsawRadioModule]
})
export class LocalPageableSelectArrayDemoModule {

}
