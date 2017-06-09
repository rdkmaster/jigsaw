import {Component} from '@angular/core';

@Component({
    templateUrl: 'domInner.html'
})
export class DomInnerDemoComponent {
    isLoading: boolean;
    load(){
        this.isLoading = !this.isLoading;
    }
}
