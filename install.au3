#AutoIt3Wrapper_Icon=favicon.ico

#include <array.au3>

#NoTrayIcon

OnAutoItExitRegister('_onExit')

If FileExists(@ScriptDir & '\node_modules') Then
	If MsgBox(292,"Jigsaw Installer", "node_modules目录已经存在，是否将其删除？") == 7 Then Exit
	_showMessage('正在删除 node_modules 目录。。。')
	If Not DirRemove(@ScriptDir & '\node_modules', True) Then
		_error('无法删除文件夹 ' & @ScriptDir & '\node_modules' & @CRLF & '请退出IDE和npm程序后再试一次。')
	EndIf
EndIf

_showMessage('正在从服务器下载依赖包。。。')
If FileExists(@ScriptDir & '\install_tmp') Then DirRemove(@ScriptDir & '\install_tmp', True)
DirCreate(@ScriptDir & '\install_tmp')
InetGet('http://rdk.zte.com.cn:4200/tools/node_modules.zip', @ScriptDir & '\install_tmp\node_modules.zip', 1)
If Not FileExists(@ScriptDir & '\install_tmp\node_modules.zip') Then _error('无法下载 node_modules.zip，请确认网络已经正常连接。如果你当前非处于zte内部网络，则需要使用npm安装。')

_unzipPackage(@ScriptDir & '\install_tmp\node_modules.zip')

If MsgBox(36, "Jigsaw Installer", "安装开发环境结束!" & @CRLF & '是否立即运行 npm start 命令检查部署是否成功？') == 6 Then
	Run(@ComSpec & " /c npm start", @ScriptDir)
EndIf


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


Func _unzipPackage($packagePath)
	_hideMessage()
	_Zip_UnzipAll(@ScriptDir & '\install_tmp\node_modules.zip', @ScriptDir)
EndFunc

Func _showMessage($msg)
	ToolTip('Jigsaw Installer' & @CRLF & $msg, @DesktopWidth/2, @DesktopHeight/2-50, '', 0, 2)
EndFunc

Func _hideMessage()
	ToolTip('')
EndFunc

Func _error($msg)
	ToolTip('')
	MsgBox(16, 'Jigsaw Installer', $msg)
	Exit
EndFunc

Func _onExit()
	If FileExists(@ScriptDir & '\install_tmp') Then DirRemove(@ScriptDir & '\install_tmp', True)
EndFunc


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; ZIP UDF: https://www.autoitscript.com/forum/topic/73425-zipau3-udf-in-pure-autoit/#entry534999

;===============================================================================
;
; Function Name:    _Zip_UnzipAll()
; Description:      Extract all files contained in a ZIP Archieve.
; Parameter(s):     $hZipFile - Complete path to zip file that will be created (or handle if existant)
;					$hDestPath - Complete path to where the files will be extracted
;					$flag = 1
;					- 1 no progress box
;					- 0 progress box
; Requirement(s):   none.
; Return Value(s):  On Success - 0
;                   On Failure - sets @error 1~3
;					@error = 1 no Zip file
;					@error = 2 no dll
;					@error = 3 dll isn't registered
; Author(s):        torels_
; Notes:			The return values will be given once the extracting process is ultimated... it takes some time with big files
;===============================================================================
Func _Zip_UnzipAll($hZipFile, $hDestPath, $flag = 1)
	Local $DLLChk = _Zip_DllChk()
	If $DLLChk <> 0 Then Return SetError($DLLChk, 0, 0);no dll
	If not _IsFullPath($hZipFile) then Return SetError(4,0) ;zip file isn't a full path
	If Not FileExists($hZipFile) Then Return SetError(2, 0, 0) ;no zip file
	If Not FileExists($hDestPath) Then DirCreate($hDestPath)
	Local $aArray[1]
	$oApp = ObjCreate("Shell.Application")
	$oApp.Namespace($hDestPath).CopyHere($oApp.Namespace($hZipFile).Items)
	For $item In $oApp.Namespace($hZipFile).Items
		_ArrayAdd($aArray, $item)
	Next
	While 1
		If $flag = 1 then _Hide()
		If FileExists($hDestPath & "\" & $aArray[UBound($aArray) - 1]) Then
			Return SetError(0, 0, 1)
			ExitLoop
		EndIf
		Sleep(500)
	WEnd
EndFunc   ;==>_Zip_UnzipAll

;===============================================================================
;
; Function Name:    _Zip_DllChk()
; Description:      Internal error handler.
; Parameter(s):     none.
; Requirement(s):   none.
; Return Value(s):  Failure - @extended = 1
; Author(s):        smashley
;
;===============================================================================
Func _Zip_DllChk()
	If Not FileExists(@SystemDir & "\zipfldr.dll") Then Return 2
	If Not RegRead("HKEY_CLASSES_ROOT\CLSID\{E88DCCE0-B7B3-11d1-A9F0-00AA0060FA31}", "") Then Return 3
	Return 0
EndFunc   ;==>_Zip_DllChk

;===============================================================================
;
; Function Name:    _IsFullPath()
; Description:      Internal Function.
; Parameter(s):     $path - a zip path
; Requirement(s):   none.
; Return Value(s):  success - True.
;					failure - False.
; Author(s):        torels_
;
;===============================================================================
Func _IsFullPath($path)
    if StringInStr($path,":\") then
        Return True
    Else
        Return False
    EndIf
Endfunc

;===============================================================================
;
; Function Name:    _Hide()
; Description:      Internal Function.
; Parameter(s):     none
; Requirement(s):   none.
; Return Value(s):  none.
; Author(s):        torels_
;
;===============================================================================
Func _Hide()
	If ControlGetHandle("[CLASS:#32770]", "", "[CLASS:SysAnimate32; INSTANCE:1]") <> "" And WinGetState("[CLASS:#32770]") <> @SW_HIDE	Then ;The Window Exists
		$hWnd = WinGetHandle("[CLASS:#32770]")
		WinSetState($hWnd, "", @SW_HIDE)
	EndIf
EndFunc