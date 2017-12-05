import {Component, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'app-root',
    template: `
        <jigsaw-root>
            <div class="app-wrap">
                <router-outlet></router-outlet>
            </div>
        </jigsaw-root>
    `,
    styleUrls: ['./live-demo-wrapper.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
