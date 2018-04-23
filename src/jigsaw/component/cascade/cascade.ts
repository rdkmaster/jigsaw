import {AfterViewInit, Component, NgModule, ViewChild} from "@angular/core";
import {JigsawTabsModule} from "../tabs/index";
import {JigsawTileSelectModule} from "../list-and-tile/tile";
import {JigsawTab} from "../tabs/tab";

@Component({
    selector: 'jigsaw-cascade, j-cascade',
    templateUrl: './cascade.html'
})
export class JigsawCascade implements AfterViewInit {
    @ViewChild(JigsawTab)
    public tabs: JigsawTab;

    ngAfterViewInit() {
        console.log(this.tabs);
    }
}

@NgModule({
    imports: [JigsawTabsModule, JigsawTileSelectModule],
    declarations: [JigsawCascade],
    exports: [JigsawCascade]
})
export class JigsawCascadeModule {

}
