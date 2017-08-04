import {Component, OnInit, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2) {
    }

    jigsawTitle: string = 'jigsaw-title';

    gotoPlunker(): void {
        let match = location.pathname.match(/\/(.*?\/.*?)$/);
        if (!match) {
            return;
        }
        window.open(document.baseURI + match[1] + '/index.html', '_blank');
    }
}

