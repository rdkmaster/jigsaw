import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class LayoutBasicDemoComponent {


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

@Component({
    selector: 'one-layout',
    template: `<div jigsawLayout="root" width="100%" height="100%">
        <div jigsawLayout span="6" layoutType="row">
            <div jigsawLayout></div>
            <div jigsawLayout></div>
        </div>
        <div jigsawLayout span="18"></div>
    </div>`
})
export class OneLayoutComponent {

}

