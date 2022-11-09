import { Output } from "@angular/core";
import { JigsawTheme } from "jigsaw/public_api";
import { EventEmitter } from "@angular/core";

export class ThemeService {
    public changeTheme(themeName, majorStyle) {
        JigsawTheme.changeTheme(themeName, majorStyle);
        this.themeChange.emit(JigsawTheme)
    }

    @Output()
    public themeChange: EventEmitter<JigsawTheme> = new EventEmitter<JigsawTheme>();
}