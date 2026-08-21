# ULDS 无限图层插件 - Rose_shadows 修改版教程

本体基础功能使用方法见：[ULDS 无限图层插件使用教程](./tutorial-original.md)



修改版新增功能（点击链接跳转）：

1. 添加 [**frame**](#property-frame) 属性，允许开发人员**截取一张图中的一部分**用作图层的图像。
1. 添加 [**bitmapIcon**](#property-bitmapIcon) 属性，允许开发人员**根据任一图标集绘制图标**，并将其作为ULDS图层来控制。
1. 添加 [**bitmapText**](#property-bitmapText) 属性，允许开发人员**绘制单行或多行文字**，为其添加样式，并将其作为ULDS图层来控制。
1. 添加 [**maskID 和 withMask**](#property-mask) 属性，允许开发人员**给图层添加静态/动态蒙版**。
1. **修复**原插件关于**平铺图层的 Bug**：
   - 1\) 将图层的 x 和 y 属性设为常数时，效果错误；
   - 2\) 使用宽高小于屏幕宽高的图像时，平铺效果错误。
1. 基于上述修复的 Bug，对于 `loop` 属性为 true 的图层，添加 [**viewport**](#property-viewport) 属性，这样就可以控制图层在什么位置、多少宽高内平铺（相当于**设定了一个视口**）。



------

### <span id='property-frame'>#</span> “frame”属性

---

`frame`属性允许开发人员截取一张图中的一部分用作图片的图像。这样就可以把许多小摆件整合到同一张图片上调取。

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

> ※ 通过 `bitmapIcon` 属性显示图标和通过 `frame` 属性显示图标的区别：
> `bitmapIcon` 属性和 `frame` 属性可以做出同样的效果，但 `bitmapIcon` 属性会根据图标集和所给参数渲染新图像（创建一个Bitmap()实例），属性 `frame` 的效果则相当于设定了一个视口，不会渲染新图像。

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
- 使用 img/system/ 下的 IconSet.png 作为图标集，选择索引为 4 的图标。

**！注意！**图标集的总宽度和格式必须和 IconSet.png 一致。

如果想使用和默认图标集格式不同的图标，请用以下格式：

```
<ulds>{
    "name": "AnotherIconSet",
    "path": "system",
    "x": 0,
    "y": 0,
    "bitmapIcon": {i: 18, w: 48, h: 32, f: 5}
}</ulds>
```
- 使用 img/system/ 下的 AnotherIconSet.png 作为图标集，按照每个图标宽 48 像素，高 32 像素，一行 5 个图标为规格分割图标集，并选择索引为 18 的图标。
- 默认情况下，图标宽度和高度为 RMMV / MZ 图标的默认大小（32px），图标集一行的图标数默认为 16 个。

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

> ※ 如果行走图不止一格宽（*自定义宽度*），就将 `x` 参数改为：
> ```
> "x": "this.rx(CHAR_WIDTH*1/2+($gamePlayer._realX)*$gameMap.tileWidth())"
> ```
> `CHAR_WIDTH` 是行走图一帧的宽度，单位像素。

> ※ 如果行走图不止一格高（*自定义高度*），就将 `y` 参数改为：
> ```
> "y": "this.ry(CHAR_HEIGHT+($gamePlayer._realY+1)*$gameMap.tileHeight())"
> ```
> `CHAR_HEIGHT` 是行走图一帧的高度，单位像素。

<br><br>

------

### <span id='property-bitmapText'>#</span> “bitmapText”属性

---

`bitmapText` 属性允许开发人员在游戏内渲染样式简单的文字，并按图层来操作。效果类似于 RMMZ 自带的 TextPicture.js 插件的功能。

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
每项参数的默认值参见 `Bitmap()` 的对应默认属性值。

**！注意！**`bitmapText` 属性创建的 `Bitmap()` 实例的宽度等于文字总宽度，高度等于行高。

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
（为方便讲解，特拆分为多行，实际用时请将整条参数折叠为一行）

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
- 第一行文字相对于上一行文字左端向右偏移 2 像素，相对于上一行下端（文字区域最上端）向下偏移 4 像素；
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

<br>

##### 实例1：角色头顶(单行)文字

若想在事件#15头顶显示“商人”字样，则创建以下格式的地图注释：

```
<ulds>{
    "x": "this.rx(($gameMap.event(15)._realX+1/2)*$gameMap.tileWidth())",
    "y": "this.ry(($gameMap.event(15)._realY)*$gameMap.tileHeight())",
    "z": 5,
    "anchor.x": 0.5,
    "anchor.y": 1,
    "bitmapText": {text: "商人"}
}</ulds>
```

> ※ 如果行走图不止一格宽（自定义宽度），就将 `x` 参数改为：
> ```
> "x": "this.rx(CHAR_WIDTH*1/2+($gameMap.event(15)._realX)*$gameMap.tileWidth())
> ```
> `CHAR_WIDTH` 是行走图一帧的宽度，单位像素。

> ※ 如果行走图不止一格高（自定义高度），就将 `y` 参数改为：
> ```
> "y": "this.ry(CHAR_HEIGHT+($gameMap.event(15)._realY+1)*$gameMap.tileHeight())"
> ```
> `CHAR_HEIGHT` 是行走图一帧的高度，单位像素。

> ※ 如果想将文字绑定到玩家或跟随者头顶，用对应的代码替换 `$gameMap.event(15)` 即可。
> 详情见[原版插件教程](./tutorial-original.md#m-5-5)。

<br>

##### 实例2：与开关相关联的(单行)动态文字

参考 `bitmapIcon` 属性的实例，将图标改为文字形式：
假设玩家可以赋予“神力加持”状态，当被赋予这个状态时，开关#5就会打开，此时头上的文字会从“修养中”变为“神力加持中”，而失去这个状态时情况相反。
那么图层注释可以这样写：

```
<ulds>{
    "x": "this.rx(($gamePlayer._realX+1/2)*$gameMap.tileWidth())",
    "y": "this.ry(($gamePlayer._realY)*$gameMap.tileHeight())",
    "z": 5,
    "anchor.x": 0.5,
    "anchor.y": 1,
    "bitmapText": "{text: (function(){var sId=5; var t_off=\"修养中\"; var t_on=\"神力加持中\";if(!s.value(sId)){return t_off;}else{return t_on;}})()}"
}</ulds>
```

文字内容会根据开关值动态更新。

> ※ 如果想将文字绑定到玩家或跟随者头顶，用对应的代码替换 `$gamePlayer` 即可。
> 详情见[原版插件教程](./tutorial-original.md#m-5-5)。

<br>

##### 实例3：角色头顶多行变量显示框

假设玩家头顶要显示两行数值，一项“精神力”，另一项“净化值”，“精神力”绑定变量#6，“净化值”绑定变量#7，要在玩家头顶显示的文字排列如下：
```
精神力：[数值]
净化值：[数值]
```
那么图层注释可以这样写：

```
<ulds> {
    "x": "this.rx(($gamePlayer._realX+1/2)*$gameMap.tileWidth())",
    "y": "this.ry(($gamePlayer._realY)*$gameMap.tileHeight())",
    "z": 5,
    "anchor.x": 0.5,
    "anchor.y": 1,
    "bitmapText": "[{text: \"精神力：\"+String(v.value(6))}, {text: \"净化值：\"+String(v.value(7))}]"
} </ulds>
```

文字内容会根据变量值动态更新。

> ※ 如果想将文字绑定到玩家或跟随者头顶，用对应的代码替换 `$gamePlayer` 即可。
> 详情见[原版插件教程](./tutorial-original.md#m-5-5)。

<br><br>

------
### <span id='property-mask'>#</span> “maskID”和“withMask”属性
---

`maskID` 允许开发人员将ULDS图层设为蒙版，而 `withMask` 属性允许开发人员对另一图层使用蒙版。`maskID` 使用方法见[1. 贴图类型的蒙版](#property-mask-1)。

> **蒙版**是一个独立的图层，覆盖在所绑定的图层上方，负责控制所绑定的图层各部分的遮挡状态。
> 通过检查蒙版各部分的明度（灰度），所绑定图层的对应部分的透明度会有所不同。
> 蒙版的颜色没有意义，所以蒙版最好是一张*黑白*图片。
> 蒙版黑色（灰度最大）的部分对应的所绑定图层部分*完全透明*，而白色（灰度最小）的部分对应的所绑定图层部分*完全不透明*。
> 蒙版透明的部分同黑色部分。

**！注意！**对于 **MV**，由于未知原因，进入注释具有该属性的地图时，地图图块部分会明显闪烁一次。地图会在行走图显示之后才显示。 建议在要使用蒙版的地图上<u>用ULDS图层代替编辑器自带的地图绘制功能</u>。*MZ 没有该问题。*
**！注意！**两个属性都必须在 **webgl** 模式下使用。
即<u>电脑端可用，安卓端默认不可使用</u>（其使用的是 canvas 模式）。
虽然可以使用插件，使安卓端强制使用 webgl 模式，但这么做性能会下降。

<br>

拥有 `withMask` 属性的图层可以使用贴图类型的蒙版或实时渲染的蒙版。

<br>

#### <span id="property-mask-1">1. 贴图类型的蒙版</span>

贴图类型的蒙版是从ULDS图层转化而来的。
要将ULDS图层转化为蒙版，需要使用 `maskID` 属性。

```
"maskID": "蒙版关键字"
```
- 将图层设为蒙版，关键字为“蒙版关键字”，以便在 `withMask` 中使用。

要将蒙版图层绑定到另一个图层上，就在需要蒙版的图层注释中书写以下注释：

```
"withMask": "{id: \"蒙版关键字\"}"
"withMask": "{type: \"sprite\", id: \"蒙版关键字\"}"
```

- 以上两行注释效果一样。使用关键字为“蒙版关键字”的预设蒙版。
- 第二行的 `type` 的 sprite 也可简写为 s。

**！注意！**：

1) 蒙版只能用于当前地图上的图层；
2) 同一地图中，每个蒙版ID必须独一无二；
3) 必须在使用蒙版前定义蒙版（用作蒙版的图层的注释必须写在需要蒙版的图层之前）；
4) 必须确保所有的贴图类型的蒙版都被使用了，否则漏用的蒙版会像普通图层一样显示在地图上。

※ 贴图类型的蒙版可以像普通图层一样设置 `x`、`y`、`rotation` 等参数，所以结合脚本或引用，还可以做出**动态蒙版**，例如绑定到鼠标上，搭配其他图层做出透视效果。



#### 2. 实时渲染的蒙版（需要编程基础）

实时渲染的蒙版实质上是创建一个从 `PIXI.Graphics()` 实例转化而来的 `PIXI.Sprite()` 实例，并通过代码绘制图形，作为蒙版。

```
"withMask": "{type: \"graphics\", render: \"mask.beginFill(0xffffff);mask.drawCircle(100,200,45);mask.endFill();\"}"
```
- 在 (100, 200) 处渲染一个颜色为 `#ffffff`，半径为 45 的圆形作为蒙版，绑定到图层上。

- `type` 的 graphics 也可简写为 g。

> **！注意！**在 `render` 参数中，`mask` 代表 `PIXI.Graphics()` 实例。
> 
> `PIXI.Graphics()` 可用的方法参见：https://pixijs.download/v4.8.9/docs/PIXI.Graphics.html
> 常用的有：`drawCircle`, `drawRect`, `drawRoundedRect`, `drawEllipse`, `drawStar`。



##### 实例1：透视效果

假设想做出透视效果，即给玩家展示一张图，鼠标移动到哪里，哪里就能显现出图片背后真正的图片信息。

而现在有一张用于直接展示给玩家的图片 base.png ，一张带有信息的图片 info.png（大小和 base.png 相同），和一张用于绑定到鼠标上，决定图片信息显示范围的 mask.png，上述图片均放在 img/parallaxes/ 文件夹下，要求可透视图层整体处于相对于屏幕的 (0, 0)。

那么地图注释可以这样写：

```
<ulds>{
  "name": "base",
  "x": 0,
  "y": 0
}</ulds>

<ulds>{
  "name": "mask",
  "x": "TouchInput._x",
  "y": "TouchInput._y",
  "maskID": "photoscope",
  "anchor.x": 0.5,
  "anchor.y": 0.5
}</ulds>

<ulds>{
  "name": "info",
  "x": 0,
  "y": 0,
  "withMask": "{id: \"photoscope\"}"
}</ulds>
```
这样，mask.png 就被预设成了 ID 为 photoscope 的蒙版图层，应用到 info.png 这一图层。

> **！注意！**对于实际操作方面，在 RMMZ 中，只需移动鼠标即可控制蒙版图层的位置，但对于 RMMV，则需要按住左键+移动鼠标（拖动图层）才可控制蒙版图层。如果希望 RMMV 也只需移动鼠标即可控制，可以使用这个插件。
>
> **！注意！**作为直接展示给玩家的 base.png 图片必须处于 info.png 之下，否则 info.png 会被遮挡住。上述注释虽然都没有设置 `z` 属性，但 base.png 图层的设置早于 info.png，所以后者会盖在前者上面，符合条件。

<br>

<br>

---

### <span id="property-viewport">#</span> “viewport”属性

`viewport` 属性允许开发人员决定 `loop` 属性为 true 的图层的显示位置和宽高（视口的位置和尺寸）。
**！注意！**该属性**只**适用于 `loop` 属性为 true 的图层。

> ※ 直接设置 `x`, `y` 属性和在 `viewport` 里设置 `x` & `y` 参数的区别：
> 由于 ULDS 平铺类型图层的 `x` 和 `y` 的功能和普通图层不同，直接设置 `x`, `y` 只会改变平铺图层左上角第一帧图像相对于整张图层的位置，设置 `viewport` 的 `x`, `y` 实质才相当于设置普通图层的 `x` 和 `y` 。

参数格式：

```
"viewport": "{x: 显示X坐标, y: 显示Y坐标, w: 显示宽度, h: 显示高度}"
```