import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerBasicDemoComponent {
    isOpen: boolean = false;
    selectedPosition = 'left';
    touched = false;
    width: string = '30%';
    height: string = '100%';
    emphasisHandler: boolean = false;
    public hideHandle: boolean = false;

    toggle() {
        this.isOpen = !this.isOpen;
        this.touched = true;
    }

    onPosChange(pos) {
        if (pos == 'top' || pos == 'bottom') {
            this.width = '100%';
            this.height = '30%';
        } else {
            this.width = '30%';
            this.height = '100%';
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
