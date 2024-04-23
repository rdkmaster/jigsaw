import {AfterViewInit, Directive, ElementRef, Input, NgZone, Renderer2, ViewChild} from "@angular/core";
import {AbstractJigsawComponent} from "./common";

@Directive()
export abstract class AbstractJigsawButtonBase extends AbstractJigsawComponent implements AfterViewInit {
    constructor(public element: ElementRef, protected _zone: NgZone, protected _renderer: Renderer2) {
        super(_zone);
    }

    @ViewChild('text')
    text: ElementRef;

    /**
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * @NoMarkForCheckRequired
     *
     * $demo = button/disabled
     */
    @Input()
    public disabled: boolean = false;

    /**
     * 按钮颜色类型 `default` , `primary` , `warning` , `error|danger`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = button/full
     */
    @Input()
    public colorType: 'default' | 'primary' | 'warning' | 'error' | 'danger' | 'none' = 'default';

    /**
     * 按钮预设尺寸 `default` , `small` , `large`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = button/full
     */
    @Input()
    public preSize: 'default' | 'small' | 'medium' | 'large' = 'default';

    /**
     * 配置按钮图标
     *
     * @NoMarkForCheckRequired
     *
     * $demo = button/full
     */
    @Input()
    public icon: string;

    /**
     * 图标的位置
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public iconPosition: 'left' | 'right' = 'left';

    /**
     * 按钮动画执行状态
     * @internal
     */
    public _$clicked: boolean = false;

    /**
     * @internal
     */
    public _onClick(): void {
        if (!this.disabled && !this._$clicked) {
            this._$clicked = true;
            this.callLater(() => this._$clicked = false, 360);
        }
    }

    ngAfterViewInit() {
        this.runAfterMicrotasks(() => {
            this._zone.run(() => {
                if (this.text.nativeElement.innerText) {
                    return
                }
                // 需要将判定时间点进一步延后，以防止在某些情况（j-box + ngIf）下，获取不到innerText的情况
                this.runAfterMicrotasks(() => {
                    this._zone.run(() => {
                        if (!this.text.nativeElement.innerText) {
                            this._renderer.addClass(this.element.nativeElement, 'jigsaw-button-icon');
                        }
                    });
                });

            });
        });
    }
}
