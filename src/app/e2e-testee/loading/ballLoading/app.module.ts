import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {BallLoadingDemoComponent} from "./app.component";

@NgModule({
    declarations: [BallLoadingDemoComponent],
    bootstrap: [BallLoadingDemoComponent],
    imports: [JigsawLoadingModule]
})
export class BallLoadingDemoModule{

}
