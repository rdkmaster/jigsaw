import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawAnimationKnowledgeDemoComponent {
    animationProperties = [
        { name: 'animation-name' },
        { name: 'animation-duration' },
        { name: 'animation-timing-function' },
        { name: 'animation-delay' },
        { name: 'animation-iteration-count' },
        { name: 'animation-direction' },
        { name: 'animation-fill-mode' },
        { name: 'animation-play-state' }
    ]


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}


