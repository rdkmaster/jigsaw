import {Component} from "@angular/core";
import {JigsawInfoAlert} from "jigsaw/public_api";
import {MovableTextService} from "../doc.service";

@Component({
    selector: 'move-and-click-basic',
    templateUrl: 'demo.component.html'
})
export class MoveAndClickBasicDemoComponent {
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

    constructor(public text: MovableTextService) {
    }

}
