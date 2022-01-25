import {Component, EventEmitter, ViewChild, Renderer2} from "@angular/core";
import {throttleTime} from 'rxjs/operators';
import {DragDropInfo, GraphData, BoxInsertPosition, JigsawEditableBox, getBoxRealRect} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxLayoutInteractionDemoComponent {
    types = ['所有父BOX', '相邻BOX', 'BOX本身'];
    selectedType = ['所有父BOX'];

    layoutEvent = new EventEmitter();
    layoutStart = new EventEmitter();
    layoutEnd = new EventEmitter();
    insert = new EventEmitter();

    @ViewChild('rootBox')
    rootBox: JigsawEditableBox;

    constructor(private _renderer: Renderer2) {
        let currentBox: JigsawEditableBox;
        let insertInfo: BoxInsertPosition;
        this.layoutStart.subscribe((dragInfo: DragDropInfo) => {
            console.log('layout start...');
            dragInfo.dragDropData = dragInfo.element.innerText;
            dragInfo.event.dataTransfer.setDragImage(dragInfo.element.querySelector('.jigsaw-button-content'), -20, 10);
            dragInfo.event.dataTransfer.effectAllowed = 'link';
        });
        this.layoutEnd.subscribe((dragInfo: DragDropInfo) => {
            console.log('layout end...');
            if (currentBox) {
                this.setBoxInserting(currentBox, false);
                currentBox = null;
            }
        });
        this.insert.subscribe((dragInfo: DragDropInfo) => {
            console.log('insert and layout end...');
            if (currentBox) {
                this.setBoxInserting(currentBox, false);
                currentBox = null;
            }
            console.log('insert component:', dragInfo.dragDropData);
            console.log('parent:', insertInfo.parent.element, insertInfo.parent.element.id);
            if (insertInfo.before) {
                console.log('insertBefore:', insertInfo.before.element, insertInfo.before.element.id);
            }
            if (insertInfo.reverse) {
                console.log('reverse:', insertInfo.reverse);
            }
        });
        this.layoutEvent.pipe(throttleTime(500)).subscribe((dragInfo: DragDropInfo) => {
            dragInfo.event.dataTransfer.dropEffect = 'link';
            console.log('inserting');
            const e = dragInfo.event;
            if (!e) {
                return;
            }
            const mousePos = {x: e.clientX, y: e.clientY};
            const boxList = this.getAllBox(this.rootBox);
            const enterBox = this.getMouseEnterBox(mousePos, boxList);
            if (!enterBox) {
                return;
            }
            if (enterBox != currentBox) {
                // 切换选中box
                //console.log('enter box: ', enterBox);
                if (currentBox) {
                    this.setBoxInserting(currentBox, false)
                }
                currentBox = enterBox;
            }
            insertInfo = this.setBoxInserting(currentBox, true, mousePos);
        });

        JigsawEditableBox.viewInit.subscribe(() => {
            let e = document.createEvent("Event");
            e.initEvent("resize", true, true);
            window.dispatchEvent(e);
        });
    }

    getAllBox(box: JigsawEditableBox, list = []): JigsawEditableBox[] {
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

    getMouseEnterBox(mousePos: { x: number, y: number }, boxList: JigsawEditableBox[]): JigsawEditableBox {
        return boxList.find(box => {
            const realRect = getBoxRealRect(box);
            return mousePos.x > realRect.left && mousePos.x < realRect.right && mousePos.y > realRect.top && mousePos.y < realRect.bottom
        })
    }

    setBoxInserting(box: JigsawEditableBox, inserting: boolean, mousePos?: { x: number, y: number }): BoxInsertPosition {
        if (!box) {
            return;
        }
        switch (this.selectedType[0]) {
            case '所有父BOX':
                this.setAllBoxInserting(box, inserting, true);
                break;
            case '相邻BOX':
                this.setNeighboringBoxInserting(box, inserting);
                break;
            case 'BOX本身':
                box.inserting = inserting;
                break;
        }
        return box.showInertLine(inserting, mousePos);
    }

    setNeighboringBoxInserting(box: JigsawEditableBox, inserting: boolean) {
        box._$childrenBox.forEach(childBox => childBox.inserting = inserting);
        if (box.parent && box.parent._$childrenBox) {
            box.parent._$childrenBox.forEach(childBox => childBox.inserting = inserting);
        }
        if (box.parent && box.parent.parent && box.parent.parent.parent && box.parent.parent._$childrenBox) {
            box.parent.parent._$childrenBox.forEach(childBox => childBox.inserting = inserting);
        }
    }

    setAllBoxInserting(box: JigsawEditableBox, inserting: boolean, current?: boolean) {
        if (!box) {
            return;
        }
        if (current && box._$childrenBox) {
            box._$childrenBox.forEach(child => child.inserting = inserting)
        }
        if (!box.parent) {
            // 根节点
            return
        }
        box.inserting = inserting;
        this.setAllBoxInserting(box.parent, inserting);
    }

    graphData = new GraphData({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            extraCssText: 'z-index: 999'
        },
        grid: {
            top: 10,
            bottom: 20,
            right: 0,
            left: 48,
            show: false
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    });

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何让resize line看起来在两个box中间';
    description: string = "";
}
