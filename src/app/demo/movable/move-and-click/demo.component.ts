import {Component} from "@angular/core";
import {JigsawInfoAlert} from "jigsaw/component/alert/alert";

@Component({
    templateUrl: 'demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class MoveAndClickDemoComponent {
    mouseStartPosition = {x: null, y: null};

    handleButtonClick() {
        JigsawInfoAlert.show('the movable button is clicked!');
    }

    recordMouseStartPosition(event) {
        this.mouseStartPosition.x = event.clientX;
        this.mouseStartPosition.y = event.clientY;
    }

    handleMouseUp(event) {
        if (this.isClickAction(event)) {
            this.handleButtonClick();
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
