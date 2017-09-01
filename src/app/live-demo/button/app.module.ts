import {NgModule} from "@angular/core";
import {ButtonLiveDemoComponent} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawLoadingModule} from "../../../jigsaw/component/loading/loading";

@NgModule({
    declarations: [ButtonLiveDemoComponent],
    bootstrap: [ ButtonLiveDemoComponent ],
    imports: [JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule]
})
export class ButtonLiveDemoModule{

}
