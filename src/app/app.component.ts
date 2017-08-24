import {Component, Renderer2, ViewContainerRef} from "@angular/core";

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
        //这是给临时演示网站准备的，后续ued正式上线了，还要再改一下
        let match = location.pathname.match(/\/#\/(.*?)#|$/);
        if (!match) {
            return;
        }
        window.open('/jigsaw/live-demo/' + match[1] + '/index.html', '_blank');
    }
}

