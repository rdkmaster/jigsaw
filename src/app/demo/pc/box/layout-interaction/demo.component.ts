import {Component} from "@angular/core";
import {JigsawBox} from "jigsaw/public_api";
import {debounceTime} from 'rxjs/operators';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxLayoutInteractionDemoComponent {

    types = ['所有父BOX', '相邻BOX'];
    selectedType = ['相邻BOX'];

    constructor() {
        JigsawBox.clearLayout.subscribe((box: JigsawBox) => {
            //console.log(box);
            this.selectedType[0] == '相邻BOX' ? this.setNeighboringBoxLaying(box, false) : this.setAllBoxLaying(box, false);
        });
        JigsawBox.showLayout.pipe(debounceTime(300)).subscribe((box: JigsawBox) => {
            //console.log(box);
            this.selectedType[0] == '相邻BOX' ? this.setNeighboringBoxLaying(box, true) : this.setAllBoxLaying(box, true);
        })
    }

    setNeighboringBoxLaying(box, type: boolean) {
        box._$childrenBox.forEach(childBox => childBox.laying = type);
        if (box.parent && box.parent._$childrenBox) {
            box.parent._$childrenBox.forEach(childBox => childBox.laying = type);
        }
    }

    setAllBoxLaying(box, type: boolean) {
        if (!box || !box.parent) {
            return
        }
        box.laying = type;
        this.setAllBoxLaying(box.parent, type);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何让resize line看起来在两个box中间';
    description: string = "";
}
