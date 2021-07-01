import {Component, ViewEncapsulation} from "@angular/core";
import {JigsawTheme} from "jigsaw/public_api";

@Component({
    selector: 'app-root',
    template: `
        <jigsaw-root>
            <div class="app-wrap" [class.theme-dark]="theme=='dark'">
                <router-outlet></router-outlet>
            </div>
        </jigsaw-root>
    `,
    styleUrls: ['./live-demo-wrapper.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    get theme() {
        return JigsawTheme.majorStyle
    }
}
