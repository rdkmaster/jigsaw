import {Component, NgZone} from '@angular/core';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


@Component({
    templateUrl: './demo.component.html'
})
export class ZoneForBetterPerformanceDemoComponent {
    constructor(private zone: NgZone) {
    }

    currentId = null;
    boxes = [];
    offsetX;
    offsetY;
    element;

    ngOnInit() {
        for (let i = 0; i < 5000; i++) {
            const id = i;
            const x = getRandomInt(0, 300);
            const y = getRandomInt(0, 300);
            const box = {
                id,
                x,
                y
            };
            this.boxes.push(box);
        }
    }

    bindMouse = (ev) => {
        this.mouseMove(ev);
    };

    mouseDown(event) {
        const id = Number(event.target.getAttribute("dataId"));
        const box = this.boxes[id];
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        this.offsetX = box.x - mouseX;
        this.offsetY = box.y - mouseY;
        this.currentId = id;

        this.element = event.target;
        this.zone.runOutsideAngular(() => {
            window.document.addEventListener("mousemove", this.bindMouse);
        });
    }

    mouseMove(event) {
        event.preventDefault();
        if (this.element) {
            this.element.setAttribute("x", event.clientX + this.offsetX + "px");
            this.element.setAttribute("y", event.clientY + this.offsetY + "px");
        }
        // Another options is to change styles using transformations
        //this.element.style = `transform: translate3d(${event.clientX - this.off.mouseX}px,
        //${event.clientY - this.off.mouseY}px, 0)`;
    }

    mouseUp($event) {
        this.zone.run(() => {
            this.updateBox(this.currentId, $event.clientX + this.offsetX, $event.clientY + this.offsetY)
            this.currentId = null;
        });
        window.document.removeEventListener("mousemove", this.bindMouse);
    }

    updateBox(id, x, y) {
        const box = this.boxes[id];
        box.x = x;
        box.y = y;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
