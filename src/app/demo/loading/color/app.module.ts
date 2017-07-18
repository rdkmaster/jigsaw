import {NgModule} from "@angular/core";
import {ColorfulLoadingDemoComponent} from "./app.component";
import {JigsawLoadingModule} from "../../../../jigsaw/component/loading/loading";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ColorfulLoadingDemoComponent],
    imports: [JigsawLoadingModule,JigsawButtonModule,CommonModule]
})
export class ColorfulLoadingDemoModule{

}
