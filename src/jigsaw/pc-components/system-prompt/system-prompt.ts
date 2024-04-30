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
    ViewContainerRef
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonUtils } from "../../common/core/utils/common-utils";
import { NoticeLevel } from "../dialog/dialog";
import { RequireMarkForCheck } from '../../common/decorator/mark-for-check';
import { AbstractJigsawComponent} from "../../common/common";

export class SystemPromptMessage {
    type?: NoticeLevel;
    timeout?: number;
    clearable?: boolean;
}

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
export class JigsawSystemPrompt extends AbstractJigsawComponent implements OnDestroy {
    constructor(
        private _elementRef: ElementRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
        super();
    }

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
    public clearable: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public timeout: number = 0;

    private _timer: number;

    public static show(message: string, containerRef: ViewContainerRef, options?: SystemPromptMessage): JigsawSystemPrompt {
        const factory = containerRef.injector.get(ComponentFactoryResolver).resolveComponentFactory(JigsawSystemPrompt);
        const componentRef = containerRef.createComponent(factory);
        const instance = componentRef.instance;
        instance.type = options?.type || 'error';
        instance.timeout = CommonUtils.isDefined(options?.timeout) ? options.timeout : 8000;
        instance.clearable = CommonUtils.isDefined(options?.clearable) ? options?.clearable : true;
        instance.message = message;
        instance._setupTimeout();
        containerRef.element.nativeElement.appendChild(componentRef.location.nativeElement);
        return instance;
    }

    public static showSuccess(message: string, containerRef: ViewContainerRef, timeout: number = 8000): JigsawSystemPrompt {
        const options: SystemPromptMessage = {type: "success", timeout};
        return this.show(message, containerRef, options);
    }

    public static showError(message: string, containerRef: ViewContainerRef, timeout: number = 8000): JigsawSystemPrompt {
        const options: SystemPromptMessage = {type: "error", timeout};
        return this.show(message, containerRef, options);
    }

    public static showWarning(message: string, containerRef: ViewContainerRef, timeout: number = 8000): JigsawSystemPrompt {
        const options: SystemPromptMessage = {type: "warning", timeout};
        return this.show(message, containerRef, options);
    }

    public static showInfo(message: string, containerRef: ViewContainerRef, timeout: number = 8000): JigsawSystemPrompt {
        const options: SystemPromptMessage = {type: "info", timeout};
        return this.show(message, containerRef, options);
    }

    private _setupTimeout() {
        if (isNaN(this.timeout) || this.timeout <= 0) {
            return;
        }
        clearTimeout(this._timer);
        this._timer = setTimeout(() => this.remove(), this.timeout) as any;
    }

    public remove() {
        clearTimeout(this._timer);
        const componentNativeElement = this._elementRef.nativeElement;
        if (componentNativeElement && componentNativeElement.parentNode) {
            componentNativeElement.parentNode.removeChild(componentNativeElement);
        }
    }

    /**
     * @internal
     */
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
        clearTimeout(this._timer);
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawSystemPrompt],
    exports: [JigsawSystemPrompt]
})
export class JigsawSystemPromptModule { }
