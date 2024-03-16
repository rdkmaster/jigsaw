import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    Injector,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    Renderer2,
    ViewContainerRef
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription, timer } from "rxjs";
import { take } from "rxjs/operators";
import { CommonUtils } from "../../common/core/utils/common-utils";
import { WingsTheme } from "../../common/common";
import { NoticeLevel } from "../dialog/dialog";
import { RequireMarkForCheck } from "jigsaw/common/decorator/mark-for-check";

export class SystemPromptMessage {
    type?: NoticeLevel;
    timeout?: number;
}

// @dynamic
@WingsTheme('notification.scss')
@Component({
    selector: 'jigsaw-system-prompt, j-system-prompt',
    templateUrl: 'system-prompt.html',
    host: {
        '[class.jigsaw-system-prompt-host]': 'true',
        '[class.jigsaw-system-prompt-error]': 'type == "error"',
        '[class.jigsaw-system-prompt-info]': 'type == "info"',
        '[class.jigsaw-system-prompt-warning]': 'type == "warning"',
        '[class.jigsaw-system-prompt-success]': 'type == "success"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSystemPrompt implements OnDestroy {
    private timerSubscription: Subscription;

    constructor(
        protected renderer: Renderer2,
        protected elementRef: ElementRef,
        protected _zone: NgZone,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector,
        protected _viewContainerRef: ViewContainerRef
    ) { }

    @Input()
    @RequireMarkForCheck()
    public message: string;

    @Input()
    @RequireMarkForCheck()
    public type: NoticeLevel = 'error';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public timeout: number = 0;

    public static show(message: string, containerRef: any, options?: SystemPromptMessage): JigsawSystemPrompt {
        const factory = containerRef.injector.get(ComponentFactoryResolver).resolveComponentFactory(JigsawSystemPrompt);
        const componentRef = containerRef.createComponent(factory);
        const instance = componentRef.instance;
        instance.type = options?.type || 'error';
        instance.timeout = CommonUtils.isDefined(options?.timeout) ? options.timeout : 8000;
        instance.message = message;
        instance.setupTimeout();

        containerRef.element.nativeElement.appendChild(componentRef.location.nativeElement);

        instance.componentRef = componentRef;
        return instance;
    }

    public setupTimeout() {
        if (this.timeout > 0) {
            this.timerSubscription = timer(this.timeout).pipe(take(1)).subscribe(() => {
                this.remove();
            });
        }
    }

    private _$clearTimer() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    public remove() {
        this._$clearTimer();
        const componentNativeElement = this.elementRef.nativeElement;
        if (componentNativeElement && componentNativeElement.parentNode) {
            componentNativeElement.parentNode.removeChild(componentNativeElement);
        }
    }

    public _$getIconClass() {
        switch (this.type) {
            case 'error':
                return 'e1a5';
            case 'info':
                return 'e23e';
            case 'warning':
                return 'e437';
            case 'success':
                return 'e142';
            default:
                return 'e1a5';
        }
    }

    ngOnDestroy() {
        this._$clearTimer();
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawSystemPrompt],
    exports: [JigsawSystemPrompt]
})
export class JigsawSystemPromptModule { }
