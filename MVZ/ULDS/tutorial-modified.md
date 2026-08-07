# ULDS 无限图层插件 - Rose_shadows 修改版教程

本体基础功能使用方法见：[ULDS 无限图层插件使用教程](./tutorial-original.md)



修改版新增功能（点击链接跳转）：

1. 添加 [**frame**](#property-frame) 属性，允许开发人员**截取一张图中的一部分**用作图层的图像。
1. 添加 [**bitmapIcon**](#property-bitmapIcon) 属性，允许开发人员**根据任一图标集绘制图标**，并将其作为ULDS图层来控制。
1. 添加 [**bitmapText**](#property-bitmapText) 属性，允许开发人员**绘制单行或多行文字**，为其添加样式，并将其作为ULDS图层来控制。



------

### <span id='property-frame'>#</span> “frame”属性

---

`frame`属性允许开发人员截取一张图中的一部分用作图片的图像。这样就可以把许多小摆件整合到同一张图片上调取。

**！注意！**该属性不适用于 `loop` 属性为 true 的图层。

在注释中添加如下参数：

```
"frame": "{x: x坐标, y: y坐标, w: 宽度, h: 高度}"
```

x坐标、y坐标、宽度、高度的单位均为*像素*。
(x坐标, y坐标) 是开始截取图片的位置坐标。
宽度和高度指的是要截取的图像的宽高。

例如：
```
<ulds> {
    "name": "Inside_C",
    "path": "tilesets",
    "x": "this.rx(100)",
    "y": "this.ry(50)",
    "z": 4,
    "frame": "{x: 240, y: 240, w: 48, h: 48}"
} </ulds>
```

在地图中使用位于 img/tilesets/ 中的 Inside_C.png 图像作为源图像。
以源图像左上角为原点，从 (240, 240) 处截取宽高各为 48 的图像用作要显示的部分，并将图片放在相对于地图 (100, 50) 的位置处。
该图片Z层级是4。

这样，地图上就会出现一盘炒饭。

<br>

如果小摆件的尺寸和摆放方式、源图像的大小恰好和图块组中B、C、D、E类型图块图片一模一样，那么 frame 参数的值也可以这样写：

```
"frame": "{tx: x坐标, ty: y坐标, tw: 宽度, th: 高度}"
```

此时：
x坐标 - 截取部分最左上角的图块是从左往右数第几块图块。
y坐标 - 截取部分最左上角的图块是从上往下数第几块图块。
宽度 - 截取部分的宽度相当于几块图块。省略时默认为 1。
高度 - 截取部分的高度相当于几块图块。省略时默认为 1。
例如：

```
<ulds> {
    "name": "Inside_C",
    "path": "tilesets",
    "x": "this.rx(100)",
    "y": "this.ry(50)",
    "z": 4,
    "frame": "{tx: 6, ty: 6}"
} </ulds>
```

效果同上一个注释。地图上会出现一盘炒饭。

```
<ulds> {
    "name": "Inside_C",
    "path": "tilesets",
    "x": "this.rx(100)",
    "y": "this.ry(50)",
    "z": 4,
    "frame": "{tx: 13, ty: 6, tw: 1, th: 2}"
} </ulds>
```
   - 地图上会出现一尊士兵雕像。

<br>


##### 实例：**动态帧图层** [1张*从左到右*摆放动画帧图片, 1条注释]

假设图层相对于地图位于(144, 144)，使用 Water_Animated.png 作为图像，图片中动画共有3帧，每帧间隔20帧 (1/3秒)，图片动画帧*从左到右*摆放，且要*循环播放*，则创建以以下格式书写的地图注释：
```
<ulds>{
    "name": "Water_Animated",
    "x": "this.rx(144)",
    "y": "this.ry(144)",
    "z": 1,
    "frame": "{y: 0, w: 96, h: 96, x: (function(){var frameCount = 3; var frameInverval = 20; var size = 96; var isCharAnime = false; var result=0;var f=Math.floor(t/frameInverval);var realFrameCount=isCharAnime?(frameCount-1)*2:frameCount;var currentFrameUnderTurn=Math.floor(f%realFrameCount);if(isCharAnime){if(currentFrameUnderTurn<frameCount){result=currentFrameUnderTurn*size;}else{result=(realFrameCount-currentFrameUnderTurn)*size;}}else{result=currentFrameUnderTurn*size;}return result;})()}"
}</ulds>
```
在这个例子中，`w` 和 `h` 分别为一帧动画的宽高，`frameCount` 指的是图片中包含几帧动画，`frameInverval` 是帧间隔。`size` 则应该等于 `w`，即一帧动画的宽度。

`isCharAnime` 控制播放顺序。
当图片中的动画帧这样摆放：\[1\]\[2\]\[3\]
如果将 `isCharAnime` 设为 false (如上例)，那么播放顺序为：
\> \[1\]\[2\]\[3\]\[1\]\[2\]\[3\]\[1\]\[2\]...
如果将 `isCharAnime` 设为 true，播放顺序则为：
\> \[1\]\[2\]\[3\]\[2\]\[1\]\[2\]\[3\]\[2\]\[1\]\[2\]...

※ 同样的例子，如果动画图片中的动画帧是*从上到下*摆放的，那么将 `frame` 参数中的`y` 和 `x` 的位置交换就可以了。
即：

```
"frame": "{x: 0, w: 96, h: 96, y: (function(){var frameCount = 3; var frameInverval = 20; var size = 96; var isCharAnime = false; var result=0;var f=Math.floor(t/frameInverval);var realFrameCount=isCharAnime?(frameCount-1)*2:frameCount;var currentFrameUnderTurn=Math.floor(f%realFrameCount);if(isCharAnime){if(currentFrameUnderTurn<frameCount){result=currentFrameUnderTurn*size;}else{result=(realFrameCount-currentFrameUnderTurn)*size;}}else{result=currentFrameUnderTurn*size;}return result;})()}"
```
<br><br>

------

### <span id='property-bitmapIcon'>#</span> “bitmapIcon”属性

---

`bitmapIcon` 属性允许开发人员根据任一图标集绘制图标，并按图层来操作。
使用这个属性，就可以做出角色状态、地图可视化标志等效果。

**！注意！**该属性不适用于 `loop` 属性为 true 的图层。

要使用这个属性，必须设置`name`和`path`的值，例如：
```
<ulds>{
    "name": "IconSet",
    "path": "system",
    "x": 0,
    "y": 0,
    "bitmapIcon": 4
}</ulds>
```
使用 img/system/ 下的 IconSet.png 作为图标集，选择索引为 4 的图标。
**！注意！**图标集的总宽度和格式必须和 IconSet.png 一致。
如果想绘制更大或更小的图像，请使用 `frame` 属性。
<br>

##### 实例：角色头顶状态图标

假设玩家可以赋予“神力加持”状态，当被赋予这个状态时，开关#5就会打开，此时头上的图标会从普通印记（图标索引#17）变为神之印记（图标索引#18），而失去这个状态时情况相反。图标来源于 img/system/ 下的 StateIcons.png，那么图层注释可以这样写：
```
<ulds>{
    "name": "StateIcons",
    "path": "system",
    "x": "this.rx(($gamePlayer._realX+1/2)*$gameMap.tileWidth())",
    "y": "this.ry(($gamePlayer._realY)*$gameMap.tileHeight())",
    "z": 5,
    "anchor.x": 0.5,
    "anchor.y": 1,
    "bitmapIcon": "(function(){var sId=5; var index1=17; var index2=18;if(s.value(sId)){return index2;}return index1;})()"
}</ulds>
```
<br><br>

------

### <span id='property-bitmapText'>#</span> “bitmapText”属性

---

`bitmapText` 属性允许开发人员在游戏内渲染样式简单的文字，并按图层来操作。效果类似于 RMMZ 自带的 TextPicture.js 插件的功能。
**！注意！**该属性不适用于 `loop` 属性为 true 的图层。

使用 `bitmapText` 属性时，会渲染新图像（创建一个Bitmap()实例）用于图层，所以无需书写 `name` 或 `path` 属性。

<br>

使用该属性可以绘制一行或多行文本，结合 `x` 、`y`、 `opacity` 等属性，可以做出角色头顶文字、地图文字信息等效果。

两种使用方法具体如下：

<br>

#### 1. 基础用法：单行文本

对于单行文本，`bitmapText` 属性的属性值是一个<u>对象</u>。

在注释中添加如下参数：
```
"bitmapText": "{text: \"这是一段文本\"}"
```
`text` 参数是要显示的文本。以上例子表示显示文本“这是一段文本”。该参数必不可少。
**！注意！**根据JSON的格式，文本前后的双引号前要加一个反斜杠`\`。

<br>

此外，还有一些参数可供选择，这些参数可以设置文本的样式。例如：
（为方便讲解，特拆分为多行，实际用时请将整条参数折叠为一行，并删掉注释）

```
"bitmapText": "{
  text: \"这是一段文本\",
  fontSize: 26,             // 字号，此处为26像素
  fontFace: \"sans-serif\", // 字体名
  fontBold: true,           // 是否为粗体，此处为“是”
  fontItalic: false,        // 是否为斜体，此处为“否”
  textColor: \"#ffffff\", // 文字颜色，CSS格式
  outlineColor: \"rgba(0, 0, 0, 0.5)\", // 文字描边颜色，同上
  outlineWidth: 3,          // 文字描边宽度，此处为3像素
  lineHeight: 32            // 行高，此处为32像素，默认为字号+8
}"
```
除 `text` 参数之外，所有参数都是非必须的。
每项参数的默认值参见 Bitmap 的对应默认属性值。

**！注意！**`bitmapText` 属性创建的 Bitmap() 实例的宽度等于文字总宽度，高度等于行高。

<br>

#### 2. 进阶用法：多行文本

对于多行文本，`bitmapText` 属性的属性值是一个元素均为对象的<u>数组</u>，例如：
```
"bitmapText": "[{text: \"第一行文本\"}, {text: \"这是第二行\"}, {text: \"第三行\"}]"
```
以上格式的属性将添加3行文本，第一行显示“第一行文本”，第二行显示“这是第二行”，第三行显示“第三行”。
<br>

数组内每个对象的格式和单行文本对应的对象格式都相同，且包括所有参数，例如：
```
"bitmapText": "[{text: \"文本1\"}, {text: \"文本2\", fontSize: 20, textColor: \"#ff0000\"}]"
```
上述例子将显示2行文字：
- 第一行文字为“文本1”，字号为16像素（默认大小），颜色为#ffffff（默认值，白色）;
- 第二行文本为“文本2”，字号为20像素，颜色为#ff0000（正红）。

<br>

在书写多行文本时，每行文本对应的参数新增以下4种：
（为方便讲解，特拆分为多行，实际用时请将整条参数折叠为一行，并删掉注释）

```
"bitmapText": "[{
  text: \"文本\",
  maxWidth: 100,   // 最大宽度，该行文字宽度超出这个值时就会被压缩
  align: \"right\",// 文本对齐方式。和 maxWidth 同用可做居中或右对齐效果
  x: 0,         // 相对于上一行左端（或图像最左端）的左右方向偏移量，单位像素
  y: 0          // 相对于上一行下端（或图像最上端）的上下方向偏移量，单位像素
}]"
```
例如：
```
"bitmapText": "[{text: \"文本1\"}, {text: \"文本2\", maxWidth: 200, align: \"center\"}]"
```
上述例子将显示2行文字：
- 第一行文字为“文本1”，对齐方式为左对齐，
- 第二行文字为“文本2”，最大宽度为 200 像素，并在这个宽度内居中对齐。

<br>

**！注意！**对于多行文本，各项参数是可以*跨行沿用*的。

例如第一行文本设置 `fontSize`（字号） 为 20，且接下来的文本都没有设置 `fontSize` 属性，那么之后各行文字的字号将都是 20 像素，直到某行文字的 `fontSize` 被设为另一个值，以此类推。

以之前两个例子为例进行修改（将第二行文字的参数设置到第一行文字）：

例1：

```
"bitmapText": "[{text: \"文本1\", fontSize: 20, textColor: \"#ff0000\"}, {text: \"文本2\"}]"
```
上述例子将显示2行文字：
- 第一行文字为“文本1”，字号为20像素，颜色为#ff0000（正红），
- 第二行文字为“文本2”，由于参数跨行沿用的特性，即使这行文字没有设置对应的参数，文字的字号也同样是20像素，颜色也同样为#ff0000（正红）。

例2：

```
"bitmapText": "[{text: \"文本1\", maxWidth: 200, align: \"center\"}, {text: \"文本2\"}]"
```
上述例子将显示2行文字：
- 第一行文字为“文本1”，最大宽度为 200 像素，并在这个宽度内居中对齐；
- 第二行文字为“文本2”，由于参数跨行沿用，即使这行文字没有设置对应的参数，文字的最大宽度也是 200 像素，并在这个宽度内居中对齐。

**！注意！**如果想将居中对齐改回为左对齐，除了将 `align` 设为 left，还要将 `maxWidth` 设为 0，否则如果左对齐的文本宽度大于 `maxWidth` 的值，文字就会遭到压缩。

<br>

**！特别注意！**由于参数跨行沿用的特性，对于 `x`，`y` 参数，如下例：
（为方便讲解，特拆分为多行，实际用时请将整条参数折叠为一行，并删掉注释）

```
"bitmapText": "[
  {text: \"文本1\", x: 2, y: 4}, 
  {text: \"文本2\"}
  {text: \"文本3\", x: 0}, 
  {text: \"文本4\", x: -4, y: 0}, 
  {text: \"文本5\", x: 0},
  {text: \"文本6\"}
]"
```
上述例子将显示6行文字：
- 第一行文字相对于上一行文字左端向右偏移 2 像素，相对于上一行下端向下偏移 4 像素；
- 第二行文字相对于上一行文字左端仍向右偏移 2 像素，相对于上一行下端仍向下偏移 4 像素；
- 第三行文字相对于上一行文字左端不偏移，相对于上一行下端仍向下偏移 4 像素；
- 第四行文字相对于上一行文字左端向左偏移 4 像素，相对于上一行下端不偏移；
- 第五行文字相对于上一行文字左端不偏移，相对于上一行下端也不偏移。
- 第六行文本同上。

具体效果参考如下：

```
（4像素间隔）
  文本1
（4像素间隔）
    文本2
（4像素间隔）
    文本3
文本4
文本5
文本6
```