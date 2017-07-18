import {NgModule} from "@angular/core";
import {ButtonWithLoadingComponent} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ButtonWithLoadingComponent],
    imports: [CommonModule,JigsawButtonModule,JigsawLoadingModule]
})
export class ButtonWithLoadingModule{

}
