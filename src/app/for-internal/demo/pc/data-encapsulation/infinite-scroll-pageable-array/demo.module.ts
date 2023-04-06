import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawButtonModule, JigsawHeaderModule, JigsawInputModule, JigsawRadioModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { InfiniteScrollPageableArrayDemoComponent } from "./demo.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [InfiniteScrollPageableArrayDemoComponent],
    exports: [InfiniteScrollPageableArrayDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule,
        PerfectScrollbarModule, JigsawHeaderModule, JigsawSwitchModule, JigsawRadioModule]
})
export class InfiniteScrollPageableArrayDemoModule {
}
