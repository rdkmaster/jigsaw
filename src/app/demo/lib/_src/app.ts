import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {JigsawButtonModule, JigsawCheckBoxModule} from '@rdkmaster/jigsaw';

@Component({
  selector: 'my-app',
  template: `
    <jigsaw-button [(disabled)]="disabled" (click)="click()">click me</jigsaw-button>
    <jigsaw-checkbox [(checked)]="disabled">disable / enable</jigsaw-checkbox>
  `,
})
export class App {
  click() {
      alert('nothing happened!')
  }
}

@NgModule({
  imports: [ BrowserModule,JigsawButtonModule,JigsawCheckBoxModule ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}