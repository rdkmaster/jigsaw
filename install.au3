#AutoIt3Wrapper_Icon=favicon.ico

#NoTrayIcon

_showMessage('正在从下载依赖包。。。')
If FileExists(@ScriptDir & '\node_modules.zip') Then FileDelete(@ScriptDir & '\node_modules_tmp.zip')
InetGet('http://rdk.zte.com.cn:4200/tools/node_modules.zip', @ScriptDir & '\node_modules_tmp.zip')
If Not FileExists(@ScriptDir & '\node_modules_tmp.zip') Then _error('无法下载 node_modules.zip，请确认网络已经正常连接。如果你当前非处于zte内部网络，则需要使用npm安装。')

If FileExists(@ScriptDir & '\node_modules') Then
	_hideMessage()
	If MsgBox(292,"Installer", "node_modules目录已经存在，是否将其删除？") == 7 Then Exit

	_showMessage('正在删除 node_modules 目录。。。')
	If Not DirRemove(@ScriptDir & '\node_modules', True) Then
		_error('无法删除文件夹 ' & @ScriptDir & '\node_modules' & @CRLF & '请退出IDE和npm程序后再试一次。')
	EndIf
EndIf

_unzipPackage(@ScriptDir & '\node_modules_tmp.zip')
FileDelete(@ScriptDir & '\node_modules_tmp.zip')
MsgBox(64, "Installer", "安装开发环境结束，请运行 npm start 命令检查部署是否成功。")

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


Func _unzipPackage($packagePath)
	_showMessage('正在准备解压依赖包。。。')
	If _isX64() Then
		InetGet('http://rdk.zte.com.cn:4200/tools/7z-64.dll', @ScriptDir & '\7z.dll')
		InetGet('http://rdk.zte.com.cn:4200/tools/7z-64.exe', @ScriptDir & '\7z.exe')
	Else
		InetGet('http://rdk.zte.com.cn:4200/tools/7z-32.dll', @ScriptDir & '\7z.dll')
		InetGet('http://rdk.zte.com.cn:4200/tools/7z-32.exe', @ScriptDir & '\7z.exe')
	EndIf
	_hideMessage()
	RunWait('"' & @ScriptDir & '\7z.exe" x "' & $packagePath & '"')
	FileDelete(@ScriptDir & '\7z.dll')
	FileDelete(@ScriptDir & '\7z.exe')
EndFunc

Func _isX64()
	If FileExists('tmp__.txt') Then FileDelete('tmp__.txt')
	RunWait(@ComSpec & ' /C systeminfo > tmp__.txt', '', @SW_HIDE)
	Local $output = FileRead('tmp__.txt')
	FileDelete('tmp__.txt')
	Return StringInStr($output, 'x64-based PC')
EndFunc

Func _showMessage($msg)
	ToolTip($msg, @DesktopWidth/2, @DesktopHeight/2-50, '', 0, 2)
EndFunc

Func _hideMessage()
	ToolTip('')
EndFunc

Func _error($msg)
	ToolTip('')
	MsgBox(16, 'Installer', $msg)
	Exit
EndFunc

