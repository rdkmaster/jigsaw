import {Component} from "@angular/core";
import {ButtonInfo, PopupEventType, PopupInfo, PopupService} from "jigsaw/service/popup.service";


@Component({
    template: `
        <jigsaw-button (click)="popup(tpDialog)">popup something</jigsaw-button><br>
        <p *ngFor="let m of eventMessages">{{m}}</p>

        <ng-template #tpDialog>
            <jigsaw-dialog width="40%" title="The title" [buttons]="buttons" (answer)="
                        popupInfo.dispose();
                        eventMessages.push('----------------------------------------')
            ">
                <div>
                    <ul>
                        <li>Dialog content...</li>
                        <li>Dialog content...</li>
                        <li>Dialog content...</li>
                    </ul>
                </div>
            </jigsaw-dialog>
        </ng-template>
    `
})
export class PopupTracingEventComponent {
    public popupInfo: PopupInfo;
    public eventMessages: string[] = ['event tracing message goes here:', '========================'];

    constructor(public popupService: PopupService) {
    }

    popup(tpDialog) {
        this.popupInfo = this.popupService.popup(tpDialog);
        this.popupInfo.event.subscribe(event => {
            this.eventMessages.push('event [' + PopupEventType[event] + '] launched!');
        });
    }

    public buttons: Array<ButtonInfo> = [
        {
            role: 'confirm',
            label: 'confirm',
            clazz: ""
        },
        {
            role: 'cancel',
            label: 'cancel',
            clazz: ""
        }
    ];
}

