import { Component, ChangeDetectionStrategy } from "@angular/core";
import { AbstractDialogComponentBase } from '../../../../dist/@rdkmaster/jigsaw/public_api';

@Component({
    selector: 'jigsaw-toast, j-toast',
    templateUrl: 'toast.html',
    host: {
        '[class.jigsaw-toast-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawToast extends AbstractDialogComponentBase implements OnDestroy {

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}