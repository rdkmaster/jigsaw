import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    NgZone
} from "@angular/core";
import {AbstractJigsawViewBase} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import * as FileSaver from 'file-saver';
import * as JSZip from 'jszip';

import echarts from "echarts";

@Directive({
    selector: '[j-graph-download], [jigsaw-graph-download], [jigsawGraphDownload]'
})
export class JigsawGraphDownloadDirective extends AbstractJigsawViewBase implements OnDestroy {
    constructor(private _elementRef: ElementRef, protected _zone: NgZone) {
        super(_zone);
    }

    private _rollOutDenouncesTimer: any = null;

    @HostListener('mouseenter', ['$event'])
    onMouseEnter() {
        this.clearCallLater(this._rollOutDenouncesTimer);
        this._addSaveButton();
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave() {
        this._addRollOutDenouncesTimer();
    }

    private _addButton: HTMLElement;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawGraphDownloadExportFileName: string = "graphs.zip";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public jigsawGraphDownloadTooltip: string = '';

    private _closePopup() {
        if (!this._addButton) {
            return;
        }
        this._elementRef.nativeElement.removeChild(this._addButton);
        this._addButton = null;
    }

    private _addSaveButton() {
        if (this._addButton) {
            return;
        }

        this._addButton = window.document.createElement('div');
        this._addButton.innerHTML = `
                <div style="width: 100%;height: 0;position: relative;z-index: 999">
                    <div style="width: 15px;height: 20px;background: #41addc;color: #ffffff;text-align: center;cursor: pointer;position: absolute;right: 10px;top:8px"
                        title="${this.jigsawGraphDownloadTooltip}">
                    <span class="iconfont iconfont-e1c7"></span>
                    </div>
                <div>`;
        this._addButton.children[0].addEventListener('click', () => {
            this._$download();
        });
        this._elementRef.nativeElement.insertAdjacentElement("afterbegin", this._addButton);
    }

    private _addRollOutDenouncesTimer() {
        this._zone.runOutsideAngular(() => {
            this._rollOutDenouncesTimer = this.callLater(() => {
                this._closePopup();
            }, 400);
        });
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
            for (let i = 0; i < element.children.length; i++) {
                if (element.children[i].className == "jigsaw-graph") {
                    this._graphsInDom.push(echarts.getInstanceByDom(element.children[i]));
                    return;
                }
            }
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

    /**
     * @internal
     */
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
