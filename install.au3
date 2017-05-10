#AutoIt3Wrapper_Icon=favicon.ico

#include <Array.au3>
#include <GuiEdit.au3>
#include <GUIConstantsEx.au3>


#NoTrayIcon

OnAutoItExitRegister('_onExit')


Global $idConsole = 0


Local $isSilence = False
If $cmdLine[0] >= 1 Then $isSilence = $cmdLine[1] == '-silence' Or $cmdLine[1] == '-s'
If StringInStr($isSilence, '?') Then Exit MsgBox(64, "Jigsaw Installer", "用法：install [-silence / -s]")

If Not $isSilence Then
	; Create Console
	Run('c:\windows\notepad.exe', '', @SW_HIDE)
	$idConsole = WinWait("[CLASS:Notepad]")
	WinSetTitle($idConsole, '', 'Jigsaw Installer Console')
	ControlDisable($idConsole, '', "Edit1")
	ControlSetText($idConsole, '', 'Edit1', 'Jigsaw is been installing...' & @CRLF)
	WinSetOnTop($idConsole, '', True)
	WinMove($idConsole, '', 0, 0, 450, 320)
	WinSetState($idConsole, '', @SW_SHOW)
EndIf


If FileExists(@ScriptDir & '\node_modules') Then
	If Not $isSilence And MsgBox(292,"Jigsaw Installer", "node_modules目录已经存在，是否将其删除？") == 7 Then Exit
	_appendConsole('正在删除 node_modules 目录...')
	If Not DirRemove(@ScriptDir & '\node_modules', True) Then
		_error('无法删除文件夹 ' & @ScriptDir & '\node_modules' & @CRLF & '请退出IDE和npm程序后再试一次。')
	EndIf
EndIf

_appendConsole('正在从服务器下载依赖包...')
If FileExists(@ScriptDir & '\install_tmp') Then DirRemove(@ScriptDir & '\install_tmp', True)
DirCreate(@ScriptDir & '\install_tmp')
InetGet('http://rdk.zte.com.cn:4200/tools/node_modules.zip', @ScriptDir & '\install_tmp\node_modules.zip', 1)
If Not FileExists(@ScriptDir & '\install_tmp\node_modules.zip') Then _error('无法下载 node_modules.zip，请确认网络已经正常连接。如果你当前非处于zte内部网络，则需要使用npm安装。')

_unzipPackage(@ScriptDir & '\install_tmp\node_modules.zip')

If Not $isSilence And MsgBox(36, "Jigsaw Installer", "安装开发环境结束!" & @CRLF & '是否立即运行 npm start 命令检查部署是否成功？') == 6 Then
	Run(@ComSpec & " /c npm start", @ScriptDir)
EndIf


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


Func _unzipPackage($packagePath)
	_appendConsole('正在解压依赖包...')
	_appendConsole('这需要大约3到10分钟不等的时间，请耐心等候')
	Local $zip = RegRead('HKEY_CURRENT_USER\Software\7-Zip\', 'Path') & '\7z.exe'
	If FileExists($zip) Then
		; 7zip 解压速度更快
		Local $cmd = '"' & $zip & '" x "' & @ScriptDir & '\install_tmp\node_modules.zip" -o"' & @ScriptDir & '"'
		If $isSilence Then
			RunWait($cmd, @ScriptDir, @SW_HIDE)
		Else
			RunWait($cmd, @ScriptDir)
		EndIf
	Else
		_Zip_UnzipAll(@ScriptDir & '\install_tmp\node_modules.zip', @ScriptDir, $isSilence)
	EndIf
EndFunc

Func _appendConsole($msg)
	If $isSilence Then Return
	Local $text = ControlGetText($idConsole, '', 'Edit1')
	ControlSetText($idConsole, '', 'Edit1', $text & @CRLF & $msg)
EndFunc

Func _error($msg)
	If Not $isSilence Then
		ToolTip('')
		MsgBox(16, 'Jigsaw Installer', $msg)
	EndIf
	Exit
EndFunc

Func _onExit()
	If FileExists(@ScriptDir & '\install_tmp') Then DirRemove(@ScriptDir & '\install_tmp', True)
	If $idConsole <> 0 Then WinClose($idConsole)
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