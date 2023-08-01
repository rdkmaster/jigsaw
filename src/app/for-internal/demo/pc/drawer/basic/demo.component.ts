import {Component, ElementRef, ViewChild} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerBasicDemoComponent {
    isOpen: boolean = false;
    selectedPosition = 'left';
    touched = false;
    width: string = '50%';
    height: string = '100%';
    emphasisHandler: boolean = false;
    public hideHandle: boolean = false;

    @ViewChild('boxComplete')
    boxComplete: ElementRef;

    toggle() {
        this.isOpen = !this.isOpen;
        this.touched = true;
    }

    fullyOpened(event: boolean) {
        if (event) {
            console.log('fullyOpened');
            this.boxComplete.nativeElement.style.background = 'yellow';
            this.boxComplete.nativeElement.style.transition = 'transform 3s ease-in-out';
            this.boxComplete.nativeElement.style.transform = 'translate(0, -50%)';
            return;
        }
        console.log('fullyClosed');
        this.boxComplete.nativeElement.style.background = 'red';
        this.boxComplete.nativeElement.style.transition = '';
        this.boxComplete.nativeElement.style.transform = '';
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
