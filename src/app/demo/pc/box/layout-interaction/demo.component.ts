import {Component, EventEmitter, ViewChild, ElementRef} from "@angular/core";
import {DragDropInfo, GraphData, InsertInfo, JigsawEditableBox} from "jigsaw/public_api";
import {debounceTime, throttleTime} from 'rxjs/operators';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxLayoutInteractionDemoComponent {

    types = ['所有父BOX', '相邻BOX', 'BOX本身'];
    selectedType = ['相邻BOX'];

    laying = new EventEmitter();
    layoutStart = new EventEmitter();
    layoutEnd = new EventEmitter();
    insert = new EventEmitter();

    @ViewChild('rootBox')
    rootBox: JigsawEditableBox;

    @ViewChild('boxWrapper')
    boxWrapper: ElementRef;

    constructor() {
        let currentBox: JigsawEditableBox;
        let insertInfo: InsertInfo;
        this.layoutStart.subscribe((dragInfo: DragDropInfo) => {
            console.log('layout start...');
            dragInfo.dragDropData = dragInfo.element.innerText;
            dragInfo.event.dataTransfer.setDragImage(dragInfo.element.querySelector('.jigsaw-button-content'), -20, 10);
            dragInfo.event.dataTransfer.effectAllowed = 'link';
        });
        this.layoutEnd.subscribe((dragInfo: DragDropInfo) => {
            console.log('layout end...');
            if (currentBox) {
                this.setBoxLaying(currentBox, false);
                currentBox = null;
            }
        });
        this.insert.subscribe((dragInfo: DragDropInfo) => {
            console.log('insert and layout end...');
            if (currentBox) {
                this.setBoxLaying(currentBox, false);
                currentBox = null;
            }
            console.log('parent:', insertInfo.parent.element, insertInfo.parent.element.id);
            console.log('insertBefore:', insertInfo.before?.element, insertInfo.before.element?.id);
        });
        this.laying.pipe(throttleTime(200)).subscribe((dragInfo: DragDropInfo) => {
            dragInfo.event.dataTransfer.dropEffect = 'link';
            console.log('laying');
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
                console.log('enter box: ', enterBox);
                if (currentBox) {
                    this.setBoxLaying(currentBox, false)
                }
                currentBox = enterBox;
            }
            insertInfo = this.setBoxLaying(currentBox, true, mousePos);
        });

        JigsawEditableBox.viewInit.subscribe(() => {
            let e = document.createEvent("Event");
            e.initEvent("resize", true, true);
            window.dispatchEvent(e);
        })
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
            const rect = box.element.getBoundingClientRect();
            return mousePos.x > rect.x && mousePos.x < rect.x + rect.width && mousePos.y > rect.y && mousePos.y < rect.y + rect.height
        })
    }

    setBoxLaying(box: JigsawEditableBox, type: boolean, mousePos?: { x: number, y: number }): InsertInfo {
        if (!box) {
            return;
        }
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
        return box.showInertLine(type, mousePos);
    }

    setNeighboringBoxLaying(box: JigsawEditableBox, type: boolean) {
        box._$childrenBox.forEach(childBox => childBox.laying = type);
        if (box.parent && box.parent._$childrenBox) {
            box.parent._$childrenBox.forEach(childBox => childBox.laying = type);
        }
        if (box.parent && box.parent.parent && box.parent.parent.parent && box.parent.parent._$childrenBox) {
            box.parent.parent._$childrenBox.forEach(childBox => childBox.laying = type);
        }
    }

    setAllBoxLaying(box: JigsawEditableBox, type: boolean) {
        if (!box || !box.parent) {
            return
        }
        box.laying = type;
        this.setAllBoxLaying(box.parent, type);
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
