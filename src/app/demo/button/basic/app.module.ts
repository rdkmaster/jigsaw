import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {ButtonBasicDemoComponent} from "./app.component";

@NgModule({
    declarations: [ButtonBasicDemoComponent],
    bootstrap: [ ButtonBasicDemoComponent ],
    imports: [JigsawButtonModule]
})
export class ButtonBasicDemoModule{

}
