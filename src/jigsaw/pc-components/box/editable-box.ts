import {JigsawBox} from "./box";
import {ChangeDetectionStrategy, Component, ElementRef, Renderer2, NgZone, ChangeDetectorRef, ContentChildren, QueryList} from '@angular/core';
import {JigsawBoxResizable} from "./box-resizable";
import {JigsawResizableBoxBase} from "./common-box";

@Component({
    selector: 'jigsaw-editable-box, j-editable-box',
    templateUrl: './editable-box.html',
    host: {
        //'[class.jigsaw-editable-box]': 'true',
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        //'[class.jigsaw-box-flicker]': '_$isFlicker',
        '[style.width]': 'width',
        '[style.height]': 'height',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawEditableBox extends JigsawBox {

    constructor(elementRef: ElementRef, renderer: Renderer2, zone: NgZone,
                /**
                 * @internal
                 */
                public _cdr: ChangeDetectorRef) {
        super(elementRef, renderer, zone, _cdr);
    }

    private _laying: boolean;

    public set laying(value: boolean) {
        if (this._laying == value) {
            return;
        }
        this._laying = value;
        this._setLayout(value);
    }

    private _setLayout(laying: boolean) {
        if (laying) {
            let scalePX = 24;
            const [width, height] = [this.element.offsetWidth, this.element.offsetHeight];
            const [scaleX, scaleY] = [1 - scalePX / width, 1 - scalePX / height];
            this.renderer.setStyle(this.element, 'transform', `scale(${scaleX}, ${scaleY})`);
        } else {
            this.renderer.removeStyle(this.element, 'transform');
        }
    }

    @ContentChildren(JigsawEditableBox)
    protected _childrenBoxRaw: QueryList<JigsawEditableBox>;

}
