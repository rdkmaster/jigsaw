import {Component} from "@angular/core";


@Component({
    templateUrl: 'user-component.html',
    styles: [`
            .componentArea{
                line-height:40px;
                height: 60px;
                padding:10px;
                background:#999;
                color:#fff;
            }
    `]
})
export class UserComponent {
}

