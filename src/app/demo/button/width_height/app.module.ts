import {NgModule} from "@angular/core";
import {ButtonWidthHeightDemoComponent} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";

@NgModule({
    declarations: [ButtonWidthHeightDemoComponent],
    bootstrap: [ ButtonWidthHeightDemoComponent ],
    imports: [JigsawButtonModule]
})
export class ButtonWidthHeightDemoModule{

}
