import { Directive, ElementRef, Input, NgModule, NgZone, Renderer2 } from "@angular/core";
import { AbstractJigsawViewBase } from "../../common";

export type noDataType = 'default' | 'file' | 'wait' | 'card' | 'graph' | 'add' | 'structure'

@Directive({
    selector: '[jigsawNoData], [jigsaw-no-data]'
})
export class JigsawNoDataDirective extends AbstractJigsawViewBase {
    constructor(protected _renderer: Renderer2, elementRef: ElementRef, zone?: NgZone) {
        super(zone);
        this._elementRef = elementRef;
    }

    protected _elementRef: ElementRef;

    private _type: noDataType;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get jigsawNoDataType(): noDataType {
        return this._type;
    }

    public set jigsawNoDataType(value: noDataType) {
        if (this._type == value) {
            return;
        }
        this._type = value;
        this._renderer.setProperty(this._elementRef.nativeElement, 'innerHTML', this.noDataImages[this._type] || this.noDataImages.default);
    }

    protected noDataImages = {
        file: `
        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="画板备份-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="编组-8备份" transform="translate(2.000000, 7.000000)">
                <line x1="3" y1="13" x2="37" y2="13" id="Line-Copy-4" stroke="#A5A5A5" stroke-width="2" opacity="0.6" stroke-linecap="square"></line>
                <path d="M40,2.99978785 C41.2513501,2.99978785 42.5439062,3.81419659 42.9330378,5.35029459 C43.041019,5.77655085 43.0133151,6.34111126 42.849926,7.04397583 C40.9713028,16.2430804 40.0213274,20.8947782 40,20.9990692 M15.7818569,2.99978785 C15.8464523,3.14766558 15.9041107,3.29930947 15.9544149,3.45431622 L16.0243035,3.68929808 L16.0536667,3.808 L35,3.80769231 C37.6140671,3.80769231 39.7595988,5.81373067 39.9811372,8.37034951 L39.9953805,8.59080269 L40,8.80769231 L40,2.99978785" id="形状" fill="#A5A5A5" fill-rule="nonzero" opacity="0.15"></path>
                <path d="M11.1978022,0 C12.3207309,0 13.3596525,0.371010555 14.1961991,0.998597696 L39.9983651,1 C42.7597888,1 44.9983651,3.23857625 44.9983651,6 C44.9983651,6.2523613 44.9792593,6.50423923 44.9412657,6.75348058 L44.8969843,7.00176333 L40.1528931,30.2003527 C40.120902,30.3567892 40.0539973,30.4971644 39.9619651,30.6150151 C39.6596891,33.0860573 37.5533572,35 35,35 L35,35 L5,35 C2.23857625,35 0,32.7614237 0,30 L0,30 L0,5 C0,2.23857625 2.23857625,0 5,0 L5,0 Z M11.1978022,2 L5,2 C3.34314575,2 2,3.34314575 2,5 L2,5 L2,30 C2,31.6568542 3.34314575,33 5,33 L5,33 L35,33 C36.6568542,33 38,31.6568542 38,30 L38,30 L38,8.80769231 C38,7.15083806 36.6568542,5.80769231 35.0000306,5.80769231 L35.0000306,5.80769231 L15.1933199,5.80829815 C14.6593477,5.80831448 14.2195678,5.38880894 14.1944006,4.85543018 C14.119165,3.26093165 12.8009767,2 11.1978022,2 L11.1978022,2 Z M15.7814197,2.99878723 C15.8785055,3.22091186 15.9599382,3.45153789 16.0243035,3.68929808 L16.0243035,3.68929808 L16.0536667,3.808 L35,3.80769231 C37.6887547,3.80769231 39.8818181,5.92999902 39.9953805,8.59080269 L39.9953805,8.59080269 L40,8.80769231 L40,20.963 L42.9375366,6.601058 C42.9779856,6.40326249 42.9983651,6.20188904 42.9983651,6 C42.9983651,4.40231912 41.7494451,3.09633912 40.1746378,3.00509269 L39.9983651,3 Z" id="形状结合" fill="#A5A5A5" fill-rule="nonzero" opacity="0.6"></path>
            </g>
        </g>
        </svg>`,
        wait: `
        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(2.500000, 2.000000)">
                <path d="M35.5,16 L37.5,16 C40.8137085,16 43.5,18.6862915 43.5,22 L43.5,24 C43.5,27.3137085 40.8137085,30 37.5,30 L35.5,30 L35.5,25 C35.5,32.1797017 29.6797017,38 22.5,38 L14.5,38 C7.32029825,38 1.5,32.1797017 1.5,25 L1.5,13 C1.5,12.4477153 1.94771525,12 2.5,12 L34.5,12 C35.0522847,12 35.5,12.4477153 35.5,13 L35.5,16 Z M35.5,17 L35.5,25" stroke="#A5A5A5" stroke-width="2" opacity="0.6" stroke-linecap="square"></path>
                <line x1="0" y1="42.5" x2="42" y2="42.5" stroke="#A5A5A5" stroke-width="2" opacity="0.6" stroke-linecap="round" stroke-linejoin="round"></line>
                <line x1="8.5" y1="8" x2="8.5" y2="4" stroke="#A5A5A5" stroke-width="2" opacity="0.15" stroke-linecap="round" stroke-linejoin="round"></line>
                <line x1="28.5" y1="8" x2="28.5" y2="4" stroke="#A5A5A5" stroke-width="2" opacity="0.15" stroke-linecap="round" stroke-linejoin="round"></line>
                <line x1="18.5" y1="8" x2="18.5" y2="0" stroke="#A5A5A5" stroke-width="2" opacity="0.15" stroke-linecap="round" stroke-linejoin="round"></line>
                <path d="M34,17.5 L34,18.5 L3,18.5 L3,17.5 L34,17.5 Z" stroke="#A5A5A5" opacity="0.6"></path>
                <rect fill="#A5A5A5" opacity="0.15" x="2.5" y="13" width="32" height="4"></rect>
            </g>
        </g>
        </svg>`,
        card: `
        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="画板备份-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="编组-24" transform="translate(3.500000, 4.000000)">
            <path d="M2,29 L40,29 C40.5522847,29 41,29.4477153 41,30 L41,32 L41,32 L1,32 L1,30 C1,29.4477153 1.44771525,29 2,29 Z" id="矩形备份-43" fill="#A5A5A5" opacity="0.15" transform="translate(21.000000, 30.500000) scale(1, -1) translate(-21.000000, -30.500000) "></path>
            <path d="M5,39 L13,33 L2,33 C0.8954305,33 0,32.1045695 0,31 L0,2 C0,0.8954305 0.8954305,0 2,0 L40,0 C41.1045695,0 42,0.8954305 42,2 L42,31 C42,32.1045695 41.1045695,33 40,33 L29,33 L37,39" id="路径备份-3" stroke="#A5A5A5" stroke-width="2" opacity="0.6" stroke-linecap="round"></path>
            <line x1="2" y1="28" x2="40" y2="28" id="Line-6-Copy-9备份" stroke="#A5A5A5" stroke-width="2" opacity="0.6" stroke-linecap="square"></line>
            <polygon id="路径-3备份" fill="#A5A5A5" opacity="0.6" points="28.6666713 34 25.999088 32 16 32 13.3342736 34"></polygon>
            <line x1="10" y1="18" x2="10" y2="23" id="Line-6-Copy备份" stroke="#A5A5A5" stroke-width="2" opacity="0.6" stroke-linecap="round"></line>
            <line x1="17" y1="23" x2="17" y2="9" id="Line-6-Copy-6备份" stroke="#A5A5A5" stroke-width="2" opacity="0.6" stroke-linecap="round"></line>
            <line x1="24" y1="23" x2="24" y2="13" id="Line-6-Copy-7备份" stroke="#A5A5A5" stroke-width="2" opacity="0.6" stroke-linecap="round"></line>
            <line x1="31" y1="23" x2="31" y2="16" id="Line-6-Copy-8备份" stroke="#A5A5A5" stroke-width="2" opacity="0.6" stroke-linecap="round"></line>
        </g>
        </g>
        </svg>`,
        default: `
        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <polygon id="path-1" points="0 0 48 0 48 12.8849 0 12.8849"></polygon>
                <polygon id="path-3" points="0 0 38 0 38 24.9996 0 24.9996"></polygon>
            </defs>
            <g id="画板备份-6" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="plx:10-null空状态/card卡片/pic01" transform="translate(0.500000, 2.000000)">
                    <rect id="矩形" x="0" y="0" width="48" height="48"></rect>
                    <g id="编组" transform="translate(0.000000, 8.000000)">
                        <path d="M30.7063,11 C29.8453,13.891 27.1703,16 24.0003,16 C20.8293,16 18.1543,13.891 17.2933,11 L7.0003,11 L7.0003,23 L41.0003,23 L41.0003,11 L30.7063,11 Z" id="Fill-1" fill="#B2B2B2" opacity="0.2"></path>
                        <g transform="translate(0.000000, 19.115100)">
                            <mask id="mask-2" fill="white">
                                <use xlink:href="#path-1"></use>
                            </mask>
                            <g id="Clip-4"></g>
                            <path d="M43,0 L43,1.987 C43,4.136 41.251,5.885 39.102,5.885 L8.898,5.885 C6.749,5.885 5,4.136 5,1.987 L5,0 C1.868,1.352 0,3.045 0,4.885 C0,9.303 10.745,12.885 24,12.885 C37.255,12.885 48,9.303 48,4.885 C48,3.045 46.132,1.352 43,0" id="Fill-3" fill="#B2B2B2" opacity="0.2" mask="url(#mask-2)"></path>
                        </g>
                        <g transform="translate(5.000000, 0.000000)">
                            <mask id="mask-4" fill="white">
                                <use xlink:href="#path-3"></use>
                            </mask>
                            <g id="Clip-6"></g>
                            <path d="M36,21.1016 C36,22.1486 35.148,22.9996 34.102,22.9996 L3.898,22.9996 C2.852,22.9996 2,22.1486 2,21.1016 L2,10.9996 L12.295,10.9996 C13.158,13.8876 15.835,15.9996 19,15.9996 C22.164,15.9996 24.842,13.8876 25.705,10.9996 L36,10.9996 L36,21.1016 Z M8.852,2.6726 C9.231,2.2456 9.777,1.9996 10.349,1.9996 L27.649,1.9996 C28.223,1.9996 28.77,2.2456 29.15,2.6736 L34.773,8.9996 L26,8.9996 L25,8.9996 L24,8.9996 C24,11.7566 21.757,13.9996 19,13.9996 C16.243,13.9996 14,11.7566 14,8.9996 L13,8.9996 L12,8.9996 L3.227,8.9996 L8.852,2.6726 Z M37.99,10.0486 C37.991,10.0316 38,10.0176 38,9.9996 C38,9.9806 37.99,9.9656 37.989,9.9466 C37.984,9.8496 37.965,9.7546 37.932,9.6636 C37.924,9.6406 37.921,9.6176 37.912,9.5966 C37.871,9.5026 37.817,9.4146 37.747,9.3356 L30.645,1.3446 C29.885,0.4906 28.793,-0.0004 27.649,-0.0004 L10.349,-0.0004 C9.206,-0.0004 8.115,0.4896 7.356,1.3436 L0.252,9.3356 C0.182,9.4146 0.129,9.5036 0.088,9.5976 C0.079,9.6176 0.076,9.6396 0.069,9.6596 C0.035,9.7526 0.016,9.8486 0.011,9.9476 C0.01,9.9656 0,9.9816 0,9.9996 C0,10.0166 0.009,10.0306 0.01,10.0476 C0.011,10.0786 0.007,10.1086 0.011,10.1396 C0.01,10.1586 0,10.1746 0,10.1936 L0,21.1016 C0,23.2506 1.749,24.9996 3.898,24.9996 L34.102,24.9996 C36.251,24.9996 38,23.2506 38,21.1016 L38,10.1936 C38,10.1746 37.99,10.1576 37.989,10.1386 C37.993,10.1086 37.989,10.0786 37.99,10.0486 L37.99,10.0486 Z" id="Fill-5" fill="#A5A5A5" opacity="0.6" mask="url(#mask-4)"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>`,
        graph: `
        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="画板备份" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.6">
                <g id="编组-11" fill="#A5A5A5" transform="translate(3.000000, 8.000000)">
                    <path d="M8,13 C9.1045695,13 10,13.8954305 10,15 L10,29 C10,30.1045695 9.1045695,31 8,31 C6.8954305,31 6,30.1045695 6,29 L6,15 C6,13.8954305 6.8954305,13 8,13 Z M16,21 C17.1045695,21 18,21.8954305 18,23 L18,29 C18,30.1045695 17.1045695,31 16,31 C14.8954305,31 14,30.1045695 14,29 L14,23 C14,21.8954305 14.8954305,21 16,21 Z M24,0 C25.1045695,-2.02906125e-16 26,0.8954305 26,2 L26,29 C26,30.1045695 25.1045695,31 24,31 C22.8954305,31 22,30.1045695 22,29 L22,2 C22,0.8954305 22.8954305,2.02906125e-16 24,0 Z M32,6 C33.1045695,6 34,6.8954305 34,8 L34,29 C34,30.1045695 33.1045695,31 32,31 C30.8954305,31 30,30.1045695 30,29 L30,8 C30,6.8954305 30.8954305,6 32,6 Z M40,18 C41.1045695,18 42,18.8954305 42,20 L42,29 C42,30.1045695 41.1045695,31 40,31 C38.8954305,31 38,30.1045695 38,29 L38,20 C38,18.8954305 38.8954305,18 40,18 Z" id="Combined-Shape"></path>
                    <path d="M1,0 C1.55228475,-1.01453063e-16 2,0.44771525 2,1 L2,34.004 L42.0020284,34.0040568 C42.513824,34.0040568 42.935638,34.3893139 42.9932859,34.8856438 L43,35.0020284 C43,35.5531929 42.5531929,36 42.0020284,36 L42.0020284,36 L1.9979716,36 C1.79006846,36 1.59701383,35.936426 1.43718732,35.8276575 C1.30559147,35.8907869 1.15702213,35.9269777 1,35.9269777 C0.44771525,35.9269777 -3.22459511e-15,35.4792624 0,34.9269777 L0,1 C4.33869274e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" id="Combined-Shape"></path>
                </g>
            </g>
        </svg>`,
        add: `
        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="画板备份-5" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.6">
            <g id="编组-31备份-3">
                <circle id="椭圆形备份-2" stroke="#A5A5A5" stroke-width="2" cx="24" cy="24" r="23"></circle>
                <path d="M24,13.3333333 C24.9818396,13.3333333 25.7777778,14.1292716 25.7777778,15.1111111 L25.7773333,22.2213333 L32.8888889,22.2222222 C33.8707284,22.2222222 34.6666667,23.0181604 34.6666667,24 C34.6666667,24.9818396 33.8707284,25.7777778 32.8888889,25.7777778 L25.7773333,25.7773333 L25.7777778,32.8888889 C25.7777778,33.8707284 24.9818396,34.6666667 24,34.6666667 C23.0181604,34.6666667 22.2222222,33.8707284 22.2222222,32.8888889 L22.2213333,25.7773333 L15.1111111,25.7777778 C14.1292716,25.7777778 13.3333333,24.9818396 13.3333333,24 C13.3333333,23.0181604 14.1292716,22.2222222 15.1111111,22.2222222 L22.2213333,22.2213333 L22.2222222,15.1111111 C22.2222222,14.1292716 23.0181604,13.3333333 24,13.3333333 Z" id="形状结合备份-8" fill="#A5A5A5"></path>
            </g>
        </g>
        </svg>`,
        structure: `
        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="画板备份-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="编组-29" transform="translate(3.500000, 3.000000)">
                <rect id="矩形备份-35" stroke="#A5A5A5" stroke-width="2" opacity="0.6" x="1" y="11.5" width="12" height="19" rx="1"></rect>
                <rect id="矩形备份-36" stroke="#A5A5A5" stroke-width="2" opacity="0.6" x="32.5" y="1" width="8.5" height="8.5" rx="1"></rect>
                <path d="M31.5,36.1666667 L22.05,36.1666667 C21.470101,36.1666667 21,35.7786468 21,35.3 L21,6.7 C21,6.22135322 21.470101,5.83333333 22.05,5.83333333 L31.5,5.83333333" id="路径备份-2" stroke="#A5A5A5" stroke-width="2" opacity="0.6"></path>
                <rect id="矩形备份-37" stroke="#A5A5A5" stroke-width="2" opacity="0.6" x="32.5" y="17.3333333" width="8.5" height="8.5" rx="1"></rect>
                <rect id="矩形备份-38" stroke="#A5A5A5" stroke-width="2" opacity="0.6" x="32.5" y="32.5" width="8.5" height="8.5" rx="1"></rect>
                <rect id="矩形备份-39" fill="#A5A5A5" opacity="0.15" x="4.66666667" y="15.1666667" width="7" height="11.6666667"></rect>
                <rect id="矩形备份-52" fill="#A5A5A5" opacity="0.6" x="14" y="19.8333333" width="5.83333333" height="2.33333333"></rect>
                <rect id="矩形备份-53" fill="#A5A5A5" opacity="0.6" x="22.1666667" y="19.8333333" width="10.5" height="2.33333333"></rect>
            </g>
        </g>
    </svg>`
    };
}

@NgModule({
    declarations: [JigsawNoDataDirective],
    exports: [JigsawNoDataDirective]
})
export class JigsawNoDataModule {
}
