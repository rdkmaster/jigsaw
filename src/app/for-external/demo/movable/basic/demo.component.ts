import { Component } from "@angular/core";
import { JigsawInfoAlert } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'movable-basic',
    templateUrl: 'demo.component.html'
})
export class MoveAndClickBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/movable/basic";

    public mouseStartPosition = { x: null, y: null };

    public handleButtonClick() {
        JigsawInfoAlert.show('the movable button is clicked!');
    }

    public recordMouseStartPosition(event) {
        this.mouseStartPosition.x = event.clientX;
        this.mouseStartPosition.y = event.clientY;
    }

    public handleMouseUp(event) {
        if (this.isClickAction(event)) {
            this.handleButtonClick();
        }
    }

    /**
     * 判断是否点击行为
     * @param {MouseEvent} e
     * @returns {boolean}
     */
    public isClickAction(e: MouseEvent) {
        return e.clientX == this.mouseStartPosition.x && e.clientY == this.mouseStartPosition.y
    }
}
