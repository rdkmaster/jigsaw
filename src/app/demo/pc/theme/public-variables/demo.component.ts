import { Component, OnInit } from "@angular/core";
import { JigsawTheme, JigsawNotification } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class PublicVariablesDemoComponent implements OnInit {
    public color = getComputedStyle(document.documentElement).getPropertyValue("--public-var-1");
    public propArr = [
        ["--public-var-1", "#2eb240"],
        ["--public-var-2", "#7E4AED"]
    ];

    public copyToClipboard($event){
        const el = document.createElement("textarea");
        el.value = $event.target.innerText;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        JigsawNotification.show(`${$event.target.innerText}已复制到剪切板`);
    }

    ngOnInit() {
        console.log(JigsawTheme.getCSSCustomProps());
        this.propArr = JigsawTheme.getCSSCustomProps();
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "此DEMO展示了在js中使用颜色变量的效果";
    description: string = "";
}
