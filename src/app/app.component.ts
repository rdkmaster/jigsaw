import {Component, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'app-root',
    template: `
        <jigsaw-root>
            <div class="app-wrap"><router-outlet></router-outlet></div>
        </jigsaw-root>
    `,
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    gotoPlunker(): void {
        //这是给临时演示网站准备的，后续ued正式上线了，还要再改一下
        let match = location.href.match(/\/#\/(.*?)(#|$)/);
        if (!match) {
            return;
        }
        const url = '/jigsaw/live-demo/' + match[1] + '/index.html';
        console.log(url);
        window.open(url, '_blank');
    }
}
