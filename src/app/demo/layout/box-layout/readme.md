#### direction
关于j-box的`direction`属性：它用于设置其子级j-box是按照水平排列还是垂直排列，默认值是水平排列，如果需要子级垂直排列，
则可以设置`direction="vertical"`。注意`vertical`可以简写为`v`

#### grow
关于j-box的`grow`属性：它用于设置其子级j-box的宽/高（取决于`direction`属性的值）占比，默认`grow`是1，即默认
每个子级j-box会1:1均分宽/高，如需控制子级j-box的宽/高比例，比如1:2，需要将第一个子j-box的`grow`设置为1，第二个设置为2。
grow的值可以有小数点，使比例更精确。

#### overflow
j-box的内容超出了j-box的适应高度，不同的浏览器的表现不一样，chrome和FF会把j-box撑开，IE11的j-box不会撑开，但内容会溢出。
这种情况下可以给j-box加个`class='jigsaw-box-fixed'`，设置溢出隐藏，也可加个滚动条。
