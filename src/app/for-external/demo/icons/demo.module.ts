import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawIconModule } from "jigsaw/public_api";
import { IconsDemoComponent } from "./demo.component";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule
    ],
    declarations: [IconsDemoComponent],
    exports: [IconsDemoComponent]
})
export class IconsDemoModule {
}
