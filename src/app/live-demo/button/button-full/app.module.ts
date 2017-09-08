import {NgModule} from "@angular/core";
import {ButtonFullComponent} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawLoadingModule} from "../../../../jigsaw/component/loading/loading";

@NgModule({
    declarations: [ButtonFullComponent],
    bootstrap: [ ButtonFullComponent ],
    imports: [JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule]
})
export class ButtonFullModule{

}
