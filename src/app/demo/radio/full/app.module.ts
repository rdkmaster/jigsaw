import {NgModule} from "@angular/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {RadioFullComponent} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [RadioFullComponent],
    bootstrap: [RadioFullComponent],
    imports: [JigsawRadioModule, CommonModule]
})
export class RadioFullModule{

}
