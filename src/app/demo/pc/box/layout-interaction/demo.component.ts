import {Component, EventEmitter, ViewChild} from "@angular/core";
import {JigsawBox} from "jigsaw/public_api";
import {debounceTime} from 'rxjs/operators';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxLayoutInteractionDemoComponent {

    types = ['所有父BOX', '相邻BOX', 'BOX本身'];
    selectedType = ['相邻BOX'];

    laying = new EventEmitter<MouseEvent>();
    layoutStart = new EventEmitter();
    layoutEnd = new EventEmitter();

    @ViewChild('rootBox')
    rootBox: JigsawBox;

    constructor() {
        let currentBox: JigsawBox;
        let isLaying: boolean;
        this.layoutStart.subscribe(() => {
            console.log('mouse enter...');
            isLaying = true
        });
        this.layoutEnd.subscribe(() => {
            console.log('mouse leave...');
            isLaying = false;
            if (currentBox) {
                this.setBoxLaying(currentBox, false);
                currentBox = null;
            }
        });
        this.laying.pipe(debounceTime(100)).subscribe(e => {
            console.log('laying', isLaying);
            if (!isLaying) {
                if (currentBox) {
                    this.setBoxLaying(currentBox, false);
                    currentBox = null;
                }
                return;
            }
            const mousePos = {x: e.clientX, y: e.clientY};
            const boxList = this.getAllBox(this.rootBox);
            const enterBox = this.getMouseEnterBox(mousePos, boxList);
            if (enterBox && enterBox != currentBox) {
                console.log('enter box: ', enterBox);
                if (currentBox) {
                    this.setBoxLaying(currentBox, false)
                }
                currentBox = enterBox;
                this.setBoxLaying(currentBox, true)
            }
        })
    }

    getAllBox(box, list = []): JigsawBox[] {
        if (!box) {
            return list;
        }
        // 保证子box在前面
        list.unshift(box);
        if (box._$childrenBox instanceof Array) {
            box._$childrenBox.forEach(childBox => this.getAllBox(childBox, list))
        }
        return list;
    }

    getMouseEnterBox(mousePos: { x: number, y: number }, boxList: JigsawBox[]): JigsawBox {
        return boxList.find(box => {
            const rect = box.element.getBoundingClientRect();
            return mousePos.x > rect.x && mousePos.x < rect.x + rect.width && mousePos.y > rect.y && mousePos.y < rect.y + rect.height
        })
    }

    setBoxLaying(box, type: boolean) {
        if(!box) {
            return;
        }
        box.element.style.borderColor = type ? 'red' : '#ccc';
        switch (this.selectedType[0]) {
            case '所有父BOX':
                this.setAllBoxLaying(box, type);
                break;
            case '相邻BOX':
                this.setNeighboringBoxLaying(box, type);
                break;
            case 'BOX本身':
                box.laying = type;
                break;
        }
    }

    setNeighboringBoxLaying(box, type: boolean) {
        box._$childrenBox.forEach(childBox => childBox.laying = type);
        if (box.parent && box.parent._$childrenBox) {
            box.parent._$childrenBox.forEach(childBox => childBox.laying = type);
        }
        if (box.parent && box.parent.parent && box.parent.parent.parent && box.parent.parent._$childrenBox) {
            box.parent.parent._$childrenBox.forEach(childBox => childBox.laying = type);
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
