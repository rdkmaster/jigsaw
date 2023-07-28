import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {JigsawCommonModule} from "../../common/common";
import {JigsawBigNumberComponent} from "./big-number";

@NgModule({
    imports: [CommonModule, FormsModule, JigsawCommonModule],
    declarations: [JigsawBigNumberComponent],
    exports: [JigsawBigNumberComponent],
})
export class JigsawBigNumberModule {
}

export * from "./big-number";
