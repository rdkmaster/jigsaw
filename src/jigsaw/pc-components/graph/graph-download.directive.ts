import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    Renderer2
} from "@angular/core";
import {AbstractJigsawViewBase} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import * as FileSaver from 'file-saver';
import * as JSZip from 'jszip/dist/jszip.min';

declare const echarts: any;

@Directive({
    selector: '[j-graph-download], [jigsaw-graph-download], [jigsawGraphDownload]'
})
export class JigsawGraphDownloadDirective extends AbstractJigsawViewBase implements OnDestroy {
    constructor(private _renderer: Renderer2,
                private _elementRef: ElementRef) {
        super();
    }

    private _removeMouseOverHandler: Function;
    private _removeMouseOutHandler: Function;
    private _rollOutDenouncesTimer: any = null;
    private _rollInDenouncesTimer: any = null;

    @HostListener('mouseenter', ['$event'])
    onMouseEnter() {
        this.clearCallLater(this._rollOutDenouncesTimer);
        this._addRollInDenouncesTimer();
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave() {
        this.clearCallLater(this._rollInDenouncesTimer);
        this._addRollOutDenouncesTimer();
    }

    private addButton: HTMLElement;

    @Input()
    public jigsawGraphDownloadExportFileName: string = "graphs.zip";

    @Input()
    public jigsawGraphDownloadTooltip: string = '';

    private _closePopup() {
        if (!this.addButton) {
            return;
        }
        this._elementRef.nativeElement.removeChild(this.addButton);
        this.addButton = null;
        this._closeAllListener();
    }

    private _closeAllListener() {
        if (this._removeMouseOverHandler) {
            this._removeMouseOverHandler();
            this._removeMouseOverHandler = null;
        }
        if (this._removeMouseOutHandler) {
            this._removeMouseOutHandler();
            this._removeMouseOutHandler = null;
        }
    }

    private _addRollInDenouncesTimer() {
        this._rollInDenouncesTimer = this.callLater(() => {
            if (this.addButton) {
                return;
            }

            this.addButton = window.document.createElement('div');
            this.addButton.innerHTML = `
                <div style="width: 100%;height: 0;position: relative;z-index: 999">
                    <div style="width: 15px;height: 20px;background: #41addc;color: #ffffff;text-align: center;cursor: pointer;position: absolute;right: 10px"
                        title="${this.jigsawGraphDownloadTooltip}">
                    <span class="fa fa-download"></span>
                    </div>
                <div>`;
            this.addButton.children[0].addEventListener('click', () => {
                this._$download();
            });
            this._elementRef.nativeElement.insertAdjacentElement("afterbegin", this.addButton);
            this._closeAllListener();
            this._removeMouseOverHandler = this._renderer.listen(
                this.addButton, 'mouseenter',
                () => this.clearCallLater(this._rollOutDenouncesTimer));
            this._removeMouseOutHandler = this._renderer.listen(
                this.addButton, 'mouseleave', () => {
                    this._addRollOutDenouncesTimer();
                });
        }, 100);
    }

    private _addRollOutDenouncesTimer() {
        this._rollOutDenouncesTimer = this.callLater(() => {
            this._closePopup();
        }, 400);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._closePopup();
    }

    private _graphsInDom: any[] = [];

    private _getGraphs() {
        this._getChildren(this._elementRef.nativeElement);
    }

    private _getChildren(element: any) {
        if (element.style.display == "none" || element.style.visibility == "hidden" || element.style.opacity == "0") {
            return;
        }
        if (element.localName == 'jigsaw-graph' && element.offsetWidth > 0 && element.offsetHeight > 0) {
            this._graphsInDom.push(echarts.getInstanceByDom(element.children[1]));
            return;
        }
        if (element.children && element.children.length > 0) {
            for (let i = 0; i < element.children.length; i++) {
                this._getChildren(element.children[i]);
            }
        }
    }

    private _getGraphBase64Codes() {
        let codes = [];
        this._getGraphs();
        this._graphsInDom.forEach((graph, index) => {
            if (!graph) {
                return;
            }
            let option = graph.getOption();
            if (!option) {
                return;
            }
            let animation = option.animation;
            graph.setOption({
                animation: false
            });
            let graphTitle = !!option.title && !!option.title[0] && !!option.title[0].text ? `-${option.title[0].text}` : '';
            const chartData = graph.getDataURL();
            if (chartData) {
                codes.push({
                    base64: chartData.replace(/.*?\bbase64,\s*/, ''),
                    title: `chart-${index + 1}${graphTitle}`
                });
            }
            if (CommonUtils.isUndefined(animation)) {
                animation = true;
            }
            graph.setOption({
                animation: animation
            });
        });
        return codes;
    }

    public _$download() {
        let zip = new JSZip();
        const base64Codes = this._getGraphBase64Codes();
        base64Codes.forEach(base64Code => {
            zip.file(`${base64Code.title}.png`, base64Code.base64, {base64: true});
        });
        const jigsawGraphDownloadExportFileName = !!this.jigsawGraphDownloadExportFileName.match(/(.+)\.(.+)/g) ?
            this.jigsawGraphDownloadExportFileName : `${this.jigsawGraphDownloadExportFileName}.zip`;
        zip.generateAsync({type: "blob"}).then(content => {
            FileSaver.saveAs(content, `${jigsawGraphDownloadExportFileName}`);
        });
        this._graphsInDom = [];
    }
}
