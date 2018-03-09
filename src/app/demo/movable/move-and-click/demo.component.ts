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
    summary: string = '';
    description: string = '';
}
