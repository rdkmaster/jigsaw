#AutoIt3Wrapper_Icon=favicon.ico

#include <Array.au3>
#include <GuiEdit.au3>
#include <GUIConstantsEx.au3>
#include <Date.au3>
#include <InetConstants.au3>


#NoTrayIcon

OnAutoItExitRegister('_onExit')

Global $wndConsole = 0
Global $hndConsole = 0
Global $pidConsole = 0
Global $installDir = @ScriptDir & '\..\..'


Local $isSilence = False
If $cmdLine[0] >= 1 Then $isSilence = $cmdLine[1] == '-silence' Or $cmdLine[1] == '-s'
If StringInStr($isSilence, '?') Then Exit MsgBox(64, "Jigsaw Installer", "Usage: install [-silence / -s]")

If Not $isSilence Then
	; Create Console
	$pidConsole = Run('c:\windows\notepad.exe', '', @SW_HIDE)
	$wndConsole = WinWait("[CLASS:Notepad]")
	$hndConsole = ControlGetHandle($wndConsole, '', 'Edit1')
	WinSetTitle($wndConsole, '', 'Jigsaw Installer Console')
	_appendConsole("Jigsaw's dependencies are been installing...")
	_appendConsole("----------------------------------------------")

	WinMove($wndConsole, '', 0, 0, 650, 320)
	WinActivate($wndConsole)
	WinSetState($wndConsole, '', @SW_SHOW)
EndIf

If FileExists($installDir & '\node_modules') Then
	If Not $isSilence And MsgBox(292,"Jigsaw Installer", "Directory node_modules existed, are you sure to remove it?") == 7 Then Exit
	_appendConsole('Removing node_modules director ...')
	If Not DirRemove($installDir & '\node_modules', True) Then
		_error('Unable to remove directory ' & $installDir & '\node_modules' & @CRLF & _
			'Close your IDE or npm or reboot your computer and try again.')
	EndIf
EndIf

_appendConsole('Downloading dependency package...')
If FileExists($installDir & '\install_tmp') Then DirRemove($installDir & '\install_tmp', True)
_downloadPackage('http://rdk.zte.com.cn/jigsaw/misc/node_modules.zip')
If Not FileExists($installDir & '\install_tmp\node_modules.zip') Then
	_error('Unable to download node_modules.zip, please check your network configuration.')
EndIf

_unzipPackage($installDir & '\install_tmp\node_modules.zip')

If Not $isSilence And MsgBox(36, "Jigsaw Installer", "Installation done!" & @CRLF & _
							'Should I run "npm start" to check wheather everything is OK?' & @CRLF & _
							'Feel free to send us an issue if anything wrong.') == 6 Then
	Run(@ComSpec & " /c npm start", $installDir)
EndIf


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

Func _downloadPackage($url)
	DirCreate($installDir & '\install_tmp')
    Local $hDownload = InetGet($url, $installDir & '\install_tmp\node_modules.zip', $INET_FORCERELOAD, $INET_DOWNLOADBACKGROUND)

    Do
        Sleep(3000)
		If InetGetInfo($hDownload, $INET_DOWNLOADSIZE) > 0 Then
			_appendConsole('    ' & InetGetInfo($hDownload, $INET_DOWNLOADREAD) & '/' & InetGetInfo($hDownload, $INET_DOWNLOADSIZE))
		EndIf
    Until InetGetInfo($hDownload, $INET_DOWNLOADCOMPLETE) Or InetGetInfo($hDownload, $INET_DOWNLOADERROR)
EndFunc



Func _unzipPackage($packagePath)
	_appendConsole('Unpackaging...')
	_appendConsole('This will take us about 3~10 minutes, please wait...')
	Local $zip = RegRead('HKEY_CURRENT_USER\Software\7-Zip\', 'Path') & '\7z.exe'
	If FileExists($zip) Then
		; 7zip 解压速度更快
		Local $cmd = '"' & $zip & '" x "' & $installDir & '\install_tmp\node_modules.zip" -o"' & $installDir & '"'
		If $isSilence Then
			RunWait($cmd, $installDir, @SW_HIDE)
		Else
			RunWait($cmd, $installDir)
		EndIf
	Else
		_Zip_UnzipAll($installDir & '\install_tmp\node_modules.zip', $installDir, $isSilence)
	EndIf
EndFunc

Func _appendConsole($msg)
	If $isSilence Then Return
	_GUICtrlEdit_AppendText($hndConsole, '[' & _Now() & '] ' & $msg & @CRLF)
EndFunc

Func _error($msg)
	If Not $isSilence Then
		ToolTip('')
		MsgBox(16, 'Jigsaw Installer', $msg)
	EndIf
	Exit
EndFunc

Func _onExit()
	If FileExists($installDir & '\install_tmp') Then DirRemove($installDir & '\install_tmp', True)
	ProcessClose($pidConsole)
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
