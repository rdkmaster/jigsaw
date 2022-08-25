## Upload指令面板

`jigsaw-upload`指令实现了`IUploader`接口，它可以与`jigsaw-upload-result`组件配合使用，作为`jigsaw-upload`指令的结果可视化显示器。

`jigsaw-upload-result`组件是`IUploader`上传结果的可视化显示器，它无法独立使用，必须配合实现了IUploader的类来使用。

提示：这里上传的所有结果都是模拟出来的，包括上传失败和失败的原因都是随机模拟出来的。
