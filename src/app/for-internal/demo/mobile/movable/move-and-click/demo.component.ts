import {Component} from "@angular/core";

@Component({
    templateUrl: 'demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class MoveAndClickDemoComponent {
    mouseStartPosition = {x: null, y: null};

    recordMouseStartPosition(event) {
        this.mouseStartPosition.x = event.clientX;
        this.mouseStartPosition.y = event.clientY;
    }

    handleMouseUp(event) {
        if (this.isClickAction(event)) {
        }
    }

    /**
     * 判断是否点击行为
     * @param {MouseEvent} e
     * @returns {boolean}
     */
    isClickAction(e: MouseEvent) {
        return e.clientX == this.mouseStartPosition.x && e.clientY == this.mouseStartPosition.y
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '当一个对象既可以拖动又可以单击时，需要一些技巧来这两个操作带来的避免冲突';
    description: string = '';
}
