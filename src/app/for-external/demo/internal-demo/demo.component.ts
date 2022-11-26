import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"],
})
export class InternalDemoComponent extends DemoSetBase implements OnInit, AfterViewInit {
    @ViewChild('frame')
    private _frame: ElementRef;
    private _demoUrl: string = '/pc';

    ngOnInit() {
        window.onmessage = (msg) => {
            if (msg.data?.type != 'internal-demo-router-change') {
                return;
            }
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {url: msg.data.url},
                queryParamsHandling: 'merge'
            });
        }
        this.route.queryParams.subscribe(params => {
            this._demoUrl = params.url || '/pc';
            if (!this._demoWindow?.location) {
                return;
            }
            this._demoWindow.location.hash = this._demoUrl;
        });
    }

    ngAfterViewInit() {
        this._demoWindow.onload = () => {
            this._demoWindow.location.hash = this._demoUrl;
            this._demoWindow.onload = null;
        }
    }

    private get _demoWindow(): any {
        return this._frame?.nativeElement.contentWindow;
    }
}
