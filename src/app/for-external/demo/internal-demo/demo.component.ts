import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";


@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"],
})
export class InternalDemoComponent extends DemoSetBase implements OnInit, AfterViewInit {
    @ViewChild('frame')
    private _frame: ElementRef;
    private _demoUrl: string;

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
            this._demoUrl = this._demoUrl || params.url;
            if (!params.url || !this._frame?.nativeElement.location) {
                return;
            }
            this._frame.nativeElement.location.hash = params.url;
        });
    }

    ngAfterViewInit() {
        const demoWindow = this._frame.nativeElement.contentWindow;
        demoWindow.onload = () => {
            demoWindow.location.hash = this._demoUrl;
            demoWindow.onload = null;
        }
    }
}
