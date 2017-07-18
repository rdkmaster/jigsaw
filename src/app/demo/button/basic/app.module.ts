import {NgModule} from "@angular/core";
import {ButtonBasicDemoComponent} from "./app.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";

@NgModule({
    declarations: [ButtonBasicDemoComponent],
    imports: [JigsawButtonModule],
    exports: [ButtonBasicDemoComponent]
})
export class ButtonBasicDemoModule{

}
