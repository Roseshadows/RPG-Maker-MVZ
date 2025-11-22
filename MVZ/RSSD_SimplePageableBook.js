//=============================================================================
// RSSD_SimplePageableBook.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.2.0 - 简易可翻页书籍
 * @author Rose_shadows
 * @target MV MZ
 * @help
 * === 介绍 ===
 * 
 * 该插件提供一个可翻页的两面书籍。
 * 书籍既可以用左右键翻页，也可以用手指或鼠标滑动翻页（需第三方插件支持）。
 * 开发者可以在游戏中便捷展示预注册的书籍内容文本，设置书籍样式，
 * 也可以随意更改书籍背景等设置。
 * 
 * 对于书籍内容文本，该插件不仅提供使用纯文本和代码两种方式来书写内容，
 * 而且允许开发者为特定书籍的特定页码设置独特的背景图像。
 * 
 * 
 * === 使用指引 / 注意事项 ===
 * 
 * 该插件使用插件参数管理器来管理书籍数据。
 * 在插件参数中预注册好书籍，设置好关键字，
 * 就可以用插件指令来设置和打开书籍了。
 * 
 * 注意！每本书籍的关键字必须是独一无二的。
 * 
 * 此外还可以通过插件指令设置各项参数。详情请看“插件指令”一栏。
 * 
 * 
 * === 插件参数 - 书籍内容 ===
 * 
 * 在插件参数“书籍注册”中一项参数的“内容”一栏，
 * 可以设置所要显示的书籍内容文本项。
 * 通过事件脚本，也可以在游戏中设置临时的书籍内容文本项。
 * 
 * 一条书籍内容文本项对应一页书页的内容。
 * 
 * 
 * == 插件参数 - 书籍内容 - 预设标签 ==
 * 
 * 对于了解脚本的开发者，还有一种写书籍内容的方法，是使用预设的标签。
 * 
 * 预设标签可以实现在任何位置绘制所需的文本/图像等的功能。
 * 如果要使用这一功能，就在书籍内容文本项里这样写标签：
 * 
 * <t> CONTENTS </t>
 * - 将 CONTENTS 替换为真正要显示的书籍内容。
 *   ！注意！只有使用这一标签，以下两个标签才会生效。
 * 
 * <evalBefore> CODE </evalBefore> 
 * - 将 CODE 替换为要执行的代码。这里的代码会在绘制内容*之前*执行。
 *   this 指向当前绘制内容的 Window_PageableBook_Page 实例。
 *   例：
 *   <evalBefore> 
 *     this.drawText('Hello', 123, 456, this.contentsWidth(), 'left');
 *   </evalBefore>
 *   - 在窗口 (123, 456) 位置绘制 “Hello” 文本。该文本会绘制在书籍内容之下。
 * 
 * <evalAfter> CODE </evalAfter> 
 * - 将 CODE 替换为要执行的代码。这里的代码会在绘制内容*之后*执行。
 *   this 指向当前绘制内容的 Window_PageableBook_Page 实例。
 *   例：
 *   <evalAfter> 
 *     this.drawText('Hello', 123, 456, this.contentsWidth(), 'left');
 *   </evalAfter>
 *   - 在窗口 (123, 456) 位置绘制 “Hello” 文本。该文本会绘制在书籍内容之上。
 * 
 * 每种标签内的文本都可以断行，但每种标签各自只能有一个。
 * 
 * # 另附拓展脚本：
 * 
 * this.drawText('～完～', 0, (this.contentsHeight()-this.contents.fontSize)/2, this.contentsWidth(), 'center');
 * this._showPageNum = false;
 * - 在书页的正中央绘制“～完～”，并隐藏本页的页码。
 * 
 * var bitmap = ImageManager.loadBitmap('img/pictures/', '修饰');
 * this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 123, 456);
 * - 在书页的(123, 456)位置绘制 img/pictures/ 下的 修饰.png 图像。
 *   注意！如果不事先预加载图像的话，在第一次翻页时图像可能无法加载出来。
 *   需要提前用预加载插件，或者通过“书籍注册”的“手动预加载图像列表”参数来预加载
 *   图像。
 * 
 * 
 * == 插件参数 - 书籍内容 - 控制字符 ==
 * 
 * 在书写内容时，可以使用一些特殊的控制字符。
 * 
 *  \PBHDPN
 *  - 隐藏本页页码。加在内容文本前面即可。
 * 
 *  \PBNOOL
 *  - 移除字体描边。
 * 
 *  \PBREOL
 *  - 恢复字体描边。
 * 
 *  \PBCGCL[hex/rgba]
 *  - 用十六进制或rgba定义字体颜色。例如：\PBCGCL[#ffffff]
 * 
 *  \PBRECL
 *  - 将字体颜色设置为默认颜色。
 * 
 *  \PBCGOP[0~255]
 *  - 更改文本的不透明度。
 * 
 *  \PBREOP
 *  - 重置文本不透明度。
 * 
 *  \PBCGIT
 *  - 将文本改为斜体。
 * 
 *  \PBREIT
 *  - 重置文本样式。
 * 
 * 
 * == 插件参数 - 特殊背景 ==
 * 
 * 在插件参数“书籍注册”一项参数的“特殊页背景图设置”一栏，
 * 可以设置对应每两页显示的一系列特定背景图片。
 * 当玩家翻到某两页时，背景就会替换成设置好的图片。
 * 
 * “特殊页背景图设置”中的“背景页数”需要写页码的单数页。
 * 例如，一本书共有3页，[1][2]和[3]，
 * 如果希望在翻到[1][2]页时显示图片 Book_2.png ，
 * 则添加一条如下设置：
 * “背景页数”: 1
 * “特殊背景”: Book_2
 * 而如果希望在翻到第[3]页时显示图片 Book_2.png ，
 * 则添加一条如下设置：
 * “背景页数”: 3
 * “特殊背景”: Book_2
 * 
 * 记得要将图像放在 img/system/ 文件夹下。
 * 
 * 
 * == 插件参数 - 书籍样式集 ==
 * 
 * 在插件参数“书籍样式集”中，可以设置书籍的样式(模板)，方便一次性调用所有所需的
 * 设置。
 * 
 * 
 * === 触摸滑动翻页功能 ===
 * 
 * 配合 SRD_SwipeInput.js，可以实现触摸滑动翻页功能。
 * 请将该插件放到 SRD_SwipeInput.js 插件之下。
 * 
 * 
 * === 插件指令 (MV) ===
 * 
 *   ::RSSD_SPB 设置书籍 {KEY}
 * - 设置当前要显示的书籍内容。
 *   {KEY}是在插件参数中设置的书籍样式关键字。
 *   另外，在每次设置关键字时，相关的图像都会预加载一次，
 *   如果书中有需要预加载的图像，
 *   建议在打开书籍界面前用这个插件指令预先设置好书籍。
 * 
 *   ::RSSD_SPB 设置并打开书籍 {KEY}
 * - 设置当前要显示的书籍内容，并打开书籍界面。
 *   {KEY}是在插件参数中设置的书籍内容关键字。
 * 
 *   ::RSSD_SPB 设置样式 {KEY}
 * - 设置当前要显示的书籍样式。
 *   {KEY}是在插件参数中设置的书籍样式关键字。
 * 
 *   ::RSSD_SPB 提示 {SHOW?}
 * - 是否在右下角显示 Tip 。
 *   若显示，则将 {SHOW?} 替换为 true，若隐藏，则设为 false。
 * 
 *   ::RSSD_SPB 打开书籍
 * - 打开可翻页书籍界面。必须先用 ::RSSD_SPB set {KEY} 设置书籍内容。
 * 
 * 
 * === 事件脚本 ===
 * 
 * $gameSystem.setPageableBookContents(key);
 * - 通过关键字设置预注册的书籍内容。
 *   另外，在每次设置关键字时，相关的图像都会预加载一次，
 *   可以通过开启“是否禁止预加载图像”参数来禁用预加载功能。
 * 
 * $gameSystem.setPageableBookLayoutData(key)
 * - 通过关键字设置书籍样式。
 * 
 * $gameSystem.setPageableBookData('flag', value);
 * - 单独设置书籍样式对应 flag 的对应 value 值。
 *   可用的 flag 和对应的 value 如下（区分大小写）：
 *    showWindows  - 是否显示书页窗口？value 为 true 或 false。
 *    windowWidth  - 书页窗口宽度。value 为数字。
 *    windowHeight - 书页窗口高度。value 为数字。
 *    distance     - 两个书页窗口的间距。value 为数字。
 *    pageNumStyle - 页码类型。value 为数字。
 *                   0 -> 不显示，1 -> 当前页数/总页数，2 -> 当前页数
 *    pageNumPos   - 页码位置。value 为数字。
 *                   0 -> 左页左下/右页右下，1 -> 居中靠下
 *    textColor    - 书籍文本颜色代码。value 为数字。
 *    hasOutline   - 书籍文本是否有描边。value 是 true 或 false。
 *    bg           - 背景图像。value 为放在 img/system/ 下的图像名。
 *    bgX          - 背景图像偏移X。value 为数字。
 *    bgY          - 背景图像偏移Y。value 为数字。
 *    seName       - 翻页音效。value 为放在 audio/se/ 下的音效文件名。
 * 例如：
 * $gameSystem.setPageableBookData('windowWidth', 300);
 * - 将书籍的左右窗口宽度设为300像素。
 * 
 * $gameSystem.performPageableTip(boolean);
 * - 决定是否显示翻页操作提示。
 * 
 * SceneManager.push(Scene_PageableBook);
 * - 打开可翻页书籍界面。
 * 
 * 
 * === 使用条款 ===
 *
 * MIT 协议
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 * 1.0.1 - 添加了预加载图像功能，增加新的控制字符，完善帮助文档。
 * 1.1.0 - 添加了与MZ的兼容性，新增简单的手动预加载绘制在内容中的图像的功能，
 *         调整了预加载的方式以兼容MZ，完善帮助文档。
 * 1.2.0 - 在保留原格式的前提下调整了插件指令的格式，为MZ添加了插件指令，
 *         修复了评估代码没有正确执行的问题。
 * 
 * 
 * 
 * @command 设置书籍
 * @desc 根据关键字设置书籍。
 * 
 * @arg 书籍关键字
 * @desc 书籍的关键字。
 * @default 
 * 
 * @command 设置并打开书籍
 * @desc 根据关键字设置书籍，并打开书籍界面。
 * 
 * @arg 书籍关键字
 * @desc 书籍的关键字。
 * @default 
 * 
 * @command 设置书籍样式
 * 
 * @arg 样式关键字
 * @desc 书籍样式的关键字。
 * @default 
 * 
 * @command 是否显示提示文本
 * 
 * @arg 是否显示
 * @type boolean
 * @desc 是否在书籍界面显示提示文本？
 * @default false
 * 
 * @command 设置书籍样式 - 细节
 * @desc 设置样式更细节的部分。具体见插件帮助的事件脚本部分。
 * 
 * @arg 目标细节
 * @desc 要对哪一细节作出更改？
 * @type select
 * @option 窗口显示 [布尔值]
 * @value showWindows
 * @option 窗口宽度 [文本]
 * @value windowWidth
 * @option 窗口高度 [文本]
 * @value windowHeight
 * @option 左右窗口距离 [文本]
 * @value distance
 * @option 页码样式 [数字]
 * @value pageNumStyle
 * @option 页码位置 [数字]
 * @value pageNumPos
 * @option 文字默认颜色 [数字]
 * @value textColor
 * @option 文字是否描边 [布尔值]
 * @value hasOutline
 * @option 背景图片名 [文本]
 * @value bg
 * @option 背景偏移X [文本]
 * @value bgX
 * @option 背景偏移Y [文本]
 * @value bgY
 * @option 翻页音效文件名 [文本]
 * @value seName
 * 
 * @arg 设置值 - 布尔值
 * @type boolean
 * @default true
 * 
 * @arg 设置值 - 文本
 * @default 
 * 
 * @arg 设置值 - 数字
 * @type number
 * @default 0
 * 
 * @param Book Contents Registeration
 * @text 书籍注册
 * @type struct<bc>[]
 * @desc 可在这里预注册书籍，方便直接调用。
 * @default []
 * 
 * @param Book Layouts List
 * @text 书籍样式集
 * @type struct<bl>[]
 * @desc 可在这里预注册书籍的各类样式，方便一次性更换。
 * @default []
 * 
 * @param === 书籍界面全局设置 ===
 * 
 * @param Bg Image
 * @text 默认背景图片
 * @parent === 书籍界面全局设置 ===
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 界面默认使用的背景图像。若为空则不显示背景。
 * @default 
 * 
 * @param Bg Offset X
 * @text 背景X偏移
 * @type number
 * @parent === 书籍界面全局设置 ===
 * @desc 背景的X坐标偏移。锚点在图像正中心，原点在界面正中心。
 * @default 0
 * 
 * @param Bg Offset Y
 * @text 背景Y偏移
 * @type number
 * @parent === 书籍界面全局设置 ===
 * @desc 背景的Y坐标偏移。锚点在图像正中心，原点在界面正中心。
 * @default 0
 * 
 * @param === 书籍窗口全局设置 ===
 * 
 * @param Show Windows
 * @text 是否显示窗口
 * @parent === 书籍窗口全局设置 ===
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default false
 * 
 * @param Window Width
 * @text 窗口宽度
 * @parent === 书籍窗口全局设置 ===
 * @desc 两个窗口的通用宽度。可使用评估代码。
 * @default 300
 * 
 * @param Window Height
 * @text 窗口高度
 * @parent === 书籍窗口全局设置 ===
 * @desc 两个窗口的通用高度。可使用评估代码。
 * @default 500
 * 
 * @param Distance Between Windows
 * @text 左右窗口默认间距
 * @parent === 书籍窗口全局设置 ===
 * @desc 左窗口和右窗口间的默认间距。单位像素。可使用评估代码。使用背景图片时可以试着适配。
 * @default 0
 * 
 * @param Page Number Style
 * @text 页码类型
 * @parent === 书籍窗口全局设置 ===
 * @type select
 * @option 不显示
 * @value 0
 * @option 当前页/总页数
 * @value 1
 * @option 当前页
 * @value 2
 * @default 0
 * 
 * @param Page Number Position
 * @text 页码显示位置
 * @parent === 书籍窗口全局设置 ===
 * @type select
 * @option 左页左下/右页右下
 * @value 0
 * @option 居中
 * @value 1
 * @desc 页码显示的位置。
 * @default 0
 * 
 * @param Book Text Color
 * @text 书籍文本颜色代码
 * @parent === 书籍窗口全局设置 ===
 * @type number
 * @desc 书籍文本的颜色代码。默认为 15 （黑色）。
 * @default 15
 * 
 * @param Book Text Outline
 * @text 书籍文本是否默认描边
 * @parent === 书籍窗口全局设置 ===
 * @type boolean
 * @on 描边
 * @off 不描边
 * @desc 书籍文本是否默认描边？
 * @default false
 * 
 * @param Default Se
 * @text 默认翻页音效
 * @parent === 书籍窗口全局设置 ===
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc 默认的翻页音效。不用则设为空。
 * @default 
 * 
 * @param == 操作提示 ==
 * 
 * @param Tip Text
 * @text 提示文本
 * @parent == 操作提示 ==
 * @desc 显示的提示文本。可使用控制字符。
 * @default 请按左右键翻页。
 * 
 * @param Show Tip at Start
 * @text 是否默认显示提示
 * @parent == 操作提示 ==
 * @type boolean
 * @desc 默认情况下是否显示提示？
 * @default true
 * 
 * @param == 滑动翻页 ==
 * @default （需要 SRD_SwipeInput.js）
 * 
 * @param Minimum Swipe Distance
 * @text 最小滑动距离
 * @parent == 滑动翻页 ==
 * @desc 至少滑动多少像素的距离才会翻页？
 * @default 50
 * 
 * @param == 杂项 ==
 * 
 * @param Disable Preload
 * @text 是否禁止预加载图像
 * @parent == 杂项 ==
 * @type boolean
 * @on 禁止
 * @off 允许
 * @desc 是否禁止预加载背景等图像。如果和其他预加载插件共同使用出现了问题，可以试着开启这一项。
 * @default false
 * 
 */
/*~struct~bc:
 * @param Note
 * @text 备注名
 * @default 
 * 
 * @param Key
 * @text 关键字
 * @desc 该书籍内容的关键字。在插件指令中会用到。必须是独一无二的。
 * @default 书籍1
 * 
 * @param Contents
 * @text 内容
 * @type note[]
 * @desc 一系列内容文本。一块文本只会出现在一个窗口页上。可以使用控制字符。单数文本项在左页，双数文本项在右页。
 * @default []
 * 
 * @param Corresponding Layout
 * @text 关联样式
 * @desc 与这本书相关联的样式的关键字。样式可在“书籍样式集”中设置。没有则使用全局设置。
 * @default 
 * 
 * @param Special Page Bg
 * @text 特殊页背景图设置
 * @type struct<bgset>[]
 * @desc 对应每两页后面的背景图设置。具体请看插件帮助。
 * @default []
 * 
 * @param Preload Images
 * @text 手动预加载图像列表
 * @type struct<pi>[]
 * @desc 如果在内容中绘制了图像，可以在这里预加载图像，防止图像无法第一时间显示。绘制方法见插件帮助。
 * @default []
 * 
 */
/*~struct~pi:
 * @param Directory
 * @text 图像所在文件夹
 * @desc 图像所在的路径，不包括文件名。例如：img/pictures/
 * @default img/pictures/
 * 
 * @param Name
 * @text 图像名
 * @desc 图像的名称。不带后缀名。
 * @default 
 * 
 */
/*~struct~bl:
 * @param Note
 * @text 备注名
 * @default 
 * 
 * @param Key
 * @text 关键字
 * @desc 该样式的关键字。必须独一无二。
 * @default 样式1
 * 
 * @param bg
 * @text 背景图片
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 该样式下的书籍背景图片。若为空则使用默认背景。
 * @default 
 * 
 * @param bgX
 * @text 背景X偏移
 * @desc 背景的X坐标偏移。若为空则使用默认值。
 * @default 
 * 
 * @param bgY
 * @text 背景Y偏移
 * @desc 背景的Y坐标偏移。若为空则使用默认值。
 * @default 
 * 
 * @param Show Windows
 * @text 是否显示窗口
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default false
 * 
 * @param Window Width
 * @text 窗口宽度
 * @desc 两个窗口的通用宽度。可使用评估代码。若为空则使用默认值。
 * @default 
 * 
 * @param Window Height
 * @text 窗口高度
 * @desc 两个窗口的通用宽度。可使用评估代码。若为空则使用默认值。
 * @default 
 * 
 * @param Distance
 * @text 左右窗口间距
 * @desc 左窗口和右窗口间的距离。单位像素。可使用评估代码。若为空则使用默认值。
 * @default 
 * 
 * @param Page Num Style
 * @text 页码类型
 * @type select
 * @option 不显示
 * @value 0
 * @option 当前页/总页数
 * @value 1
 * @option 当前页
 * @value 2
 * @default 0
 * 
 * @param Page Pos
 * @text 页码位置
 * @type select
 * @option 左页左下/右页右下
 * @value 0
 * @option 居中
 * @value 1
 * @desc 页码显示的位置。
 * @default 0
 * 
 * @param Text Color
 * @text 文本颜色
 * @desc 书籍文本的颜色。若为空则使用设置好的默认颜色代码。
 * @default 
 * 
 * @param Text Outline
 * @text 书籍文本是否描边
 * @type boolean
 * @on 描边
 * @off 不描边
 * @desc 书籍文本是否描边？
 * @default false
 * 
 * @param Se
 * @text 翻页音效
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc 翻页音效。若为空则使用默认se。
 * @default 
 * 
 */
/*~struct~bgset:
 * @param Count
 * @text 背景页数
 * @type number
 * @desc 在翻到哪页时使用该特殊的背景。例如，如果是第1和2页的背景，则写 1 即可。第3和4页的话就写 3 ，以此类推。
 * @default 1
 * 
 * @param bg
 * @text 特殊背景
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 所使用的特殊背景图像。
 * @default 
 */
var Imported = Imported || {};
Imported.RSSD_SimplePageableBook = true;

var RSSD = RSSD || {};
RSSD.SPB = {};

RSSD.SPB.pluginName = 'RSSD_SimplePageableBook';
var parameters = PluginManager.parameters(RSSD.SPB.pluginName);

RSSD.SPB.books = {};
var arr = JSON.parse(parameters['Book Contents Registeration']) || [];
arr.forEach((item)=>{
    var obj = JSON.parse(item);
    var key = obj['Key'];
    RSSD.SPB.books[key] = {};
    var dup = JSON.parse(obj['Contents']) || [];
    var contents = [];
    dup.forEach((item)=>{
        contents.push(JSON.parse(item));
    });
    RSSD.SPB.books[key].contents = contents;
    RSSD.SPB.books[key].layoutKey = obj['Corresponding Layout'] || '';
    var lo = JSON.parse(obj['Special Page Bg']) || [];
    var bgSet = [];
    lo.forEach((set)=>{
        var s = JSON.parse(set) || {};
        var bgIndex = +s['Count'] || 1;
        bgSet[(bgIndex-1)/2] = s['bg'] || '';
    });
    RSSD.SPB.books[key].bgSet = bgSet;
    var pi = JSON.parse(obj['Preload Images']) || [];
    var preloadImgs = [];
    pi.forEach((item)=>{
        var p = JSON.parse(item);
        var o = {};
        o.name = p['Name'];
        o.dir = p['Directory'] || '';
        preloadImgs.push(o);
    });
    RSSD.SPB.books[key].preloadImages = preloadImgs;
});

RSSD.SPB.layouts = {};
var arr2 = JSON.parse(parameters['Book Layouts List']) || [];
arr2.forEach((item)=>{
    var obj = JSON.parse(item);
    var key = obj['Key'];
    RSSD.SPB.layouts[key] = {};
    var o = RSSD.SPB.layouts[key];
    o.bg  = obj['bg'] || null;
    o.bgX = obj['bgX'] || '';
    o.bgY = obj['bgY'] || '';
    o.showWindows  = obj['Show Windows'] === 'true';
    o.windowWidth  = obj['Window Width'] || '';
    o.windowHeight = obj['Window Height'] || '';
    o.distance     = obj['Distance'] || '';
    o.pageNumStyle = +obj['Page Num Style'];
    o.pageNumPos   = +obj['Page Pos'];
    o.textColor    = obj['Text Color'] !== '' ? +obj['Text Color'] : null;
    o.hasOutline   = obj['Text Outline'] === 'true';
    o.seName       = obj['Se'] || null;
});

RSSD.SPB.bg  = parameters['Bg Image'];
RSSD.SPB.bgX = parameters['Bg Offset X'] || '0';
RSSD.SPB.bgY = parameters['Bg Offset Y'] || '0';

RSSD.SPB.windowWidth  = parameters['Window Width'] || '300';
RSSD.SPB.windowHeight = parameters['Window Height'] || '500';
RSSD.SPB.distance     = parameters['Distance Between Windows'] || '0';
RSSD.SPB.pageNumStyle = +parameters['Page Number Style'] || 0;
RSSD.SPB.pageNumPos   = +parameters['Page Number Position'] || 0;
RSSD.SPB.textColor    = +parameters['Book Text Color'] || 15;
RSSD.SPB.hasOutline   = parameters['Book Text Outline'] === 'true';
RSSD.SPB.defaultSe    = parameters['Default Se'] || '';
RSSD.SPB.showWindows  = parameters['Show Windows'] === 'true';

RSSD.SPB.tipText        = parameters['Tip Text'] || '';
RSSD.SPB.isTipInitShown = parameters['Show Tip at Start'] === 'true';

RSSD.SPB.minSwipeDist = +parameters['Minimum Swipe Distance'] || 100;

RSSD.SPB.disablePreload = parameters['Disable Preload'] === 'true';

//-----------------------------------------------------------------------------
// Game_System
//-----------------------------------------------------------------------------

var __Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    __Game_System_initialize.call(this);
    this.refreshPageableBookData();
};

Game_System.prototype.refreshPageableBookData = function() {
    this._pageableBookData = {};
    this._pageableBookData.textsArray = [];
    this._pageableBookData.showTip    = RSSD.SPB.isTipInitShown;
    this._pageableBookData.currentContentsKey = '';
    this.initPageableBookLayoutData();
    this.applyPageableBgPreload();
};

Game_System.prototype.initPageableBookLayoutData = function() {
    var data = this._pageableBookData;
    data.showWindows  = RSSD.SPB.showWindows;
    data.windowWidth  = RSSD.SPB.windowWidth;
    data.windowHeight = RSSD.SPB.windowHeight;
    data.distance     = RSSD.SPB.distance;
    data.pageNumStyle = RSSD.SPB.pageNumStyle;
    data.pageNumPos   = RSSD.SPB.pageNumPos;
    data.textColor    = RSSD.SPB.textColor;
    data.hasOutline   = RSSD.SPB.hasOutline;
    data.bg           = RSSD.SPB.bg;
    data.bgX          = RSSD.SPB.bgX;
    data.bgY          = RSSD.SPB.bgY;
    data.seName       = RSSD.SPB.defaultSe;
};

Game_System.prototype.setPageableBookLayoutData = function(key) {
    this._private_SPB_replaceElems(RSSD.SPB.layouts[key], this._pageableBookData);
};

Game_System.prototype._private_SPB_replaceElems = function(obj, tar_obj) {
    var keys = Object.keys(obj);
    keys.forEach((key)=>{
        if(tar_obj[key] !== undefined && obj[key])
        tar_obj[key] = obj[key];
    });
};

Game_System.prototype.pageableCurrentContentsKey = function() {
    return this._pageableBookData.currentContentsKey;
};

Game_System.prototype.pageableBookTextsArray = function() {
    return this._pageableBookData.textsArray;
};

Game_System.prototype.pageableWindowWidth = function() {
    return this._pageableBookData.windowWidth;
};

Game_System.prototype.pageableWindowHeight = function() {
    return this._pageableBookData.windowHeight;
};

Game_System.prototype.pageableWindowDistance = function() {
    return this._pageableBookData.distance;
};

Game_System.prototype.pageablePageNumStyle = function() {
    return this._pageableBookData.pageNumStyle;
};

Game_System.prototype.pageablePageNumPos = function() {
    return this._pageableBookData.pageNumPos;
};

Game_System.prototype.pageableTextColor = function() {
    return this._pageableBookData.textColor;
};

Game_System.prototype.pageableSeName = function() {
    return this._pageableBookData.seName;
};

Game_System.prototype.isPageableTextOutlineEnabled = function() {
    return this._pageableBookData.hasOutline;
};

Game_System.prototype.isShowPageableWindows = function() {
    return this._pageableBookData.showWindows;
};

Game_System.prototype.isShowPageableTip = function() {
    return this._pageableBookData.showTip;
};

Game_System.prototype.pageableBgConfig = function() {
    return {
        bg: this._pageableBookData.bg,
        x:  this._pageableBookData.bgX,
        y:  this._pageableBookData.bgY,
    }
};

Game_System.prototype.performPageableTip = function(boo) {
    this._pageableBookData.showTip = boo;
};

Game_System.prototype.setPageableBookContents = function(key) {
    this._pageableBookData.textsArray = RSSD.SPB.books[key].contents;
    this._pageableBookData.currentContentsKey = key;
    this.applyPageableSpecialBgPreload();
    this.applyPageableContentsImagePreload();
};

Game_System.prototype.setPageableBookData = function(key, value) {
    this._pageableBookData[key] = value;
    if(key === 'bg') this.applyPageableBgPreload();
};

Game_System.prototype.applyPageableBgPreload = function() {
    // For MZ compatibility
    if(!RSSD.SPB.disablePreload) {
        var obj = this.pageableBgConfig();
        var name = obj.bg;
        if(name) ImageManager.loadSystem(name);
        obj = null;
    }
};

Game_System.prototype.applyPageableSpecialBgPreload = function() {
    // For MZ compatibility
    if(!RSSD.SPB.disablePreload) {
        var key = this.pageableCurrentContentsKey();
        var bgSet = RSSD.SPB.books[key].bgSet;
        bgSet.forEach((bg)=>{
            if(bg) {
                ImageManager.loadSystem(bg);
            }
        });
    }
};

Game_System.prototype.applyPageableContentsImagePreload = function() {
    // For MZ compatibility
    if(!RSSD.SPB.disablePreload) {
        var key = this.pageableCurrentContentsKey();
        var imgs = RSSD.SPB.books[key].preloadImages;
        imgs.forEach((img)=>{
            let name = img.name;
            let dir = img.dir;
            ImageManager.loadBitmap(dir, name);
        });
    }
};

//-----------------------------------------------------------------------------
// Window_PageableBook_Page
//-----------------------------------------------------------------------------
// Superclass of Left and Right page window.

function Window_PageableBook_Page() {
    this.initialize.apply(this, arguments);
};

Window_PageableBook_Page.prototype = Object.create(Window_Base.prototype);
Window_PageableBook_Page.prototype.constructor = Window_PageableBook_Page;

Window_PageableBook_Page.prototype.initialize = function(x, y, width, height) {
    if(Utils.RPGMAKER_NAME === 'MZ') {
        const rect = new Rectangle(x, y, width, height);
        Window_Base.prototype.initialize.call(this, rect);
    } else {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    }
    this._texts = '';
    this._curPageNum = 0;
    this._showPageNum = true;  // only for escape character
    this.refresh();
};

Window_PageableBook_Page.prototype.refresh = function() {
    this.contents.clear();
    this._showPageNum = true;
    if(this._texts){
        if(!$gameSystem.isPageableTextOutlineEnabled()) this.contents.outlineWidth = 0;
        this.drawContents();
        this.drawPageNum();
        this.contents.outlineWidth = 4;
    }
};

Window_PageableBook_Page.prototype.drawContents = function() {
    // do not rearrange
    var RE_C = /<t>([^]*?)<\/t>/gi;
    var isEval = !!this._texts.match(RE_C);
    var texts = isEval ? String(this._texts.match(RE_C)).replace('<t>', '').replace('<\/t>', '') : this._texts;
    this.applyEvalBefore();
    this.applyContents(texts);
    this.applyEvalAfter();
};

Window_PageableBook_Page.prototype.applyEvalBefore = function() {
    var RE_EB = /<evalBefore>([^]*?)<\/evalBefore>/gi;
    var RE_C = /<t>([^]*?)<\/t>/gi;
    var isEval = !!this._texts.match(RE_C);
    if(isEval && this._texts.match(RE_EB)) {
        eval(String(this._texts.match(RE_EB)).replace('<evalBefore>', '').replace('<\/evalBefore>', ''));
    }
};

Window_PageableBook_Page.prototype.applyContents = function(texts) {
    this.drawTextEx(texts, 0, 0);
};

Window_PageableBook_Page.prototype.applyEvalAfter = function() {
    var RE_EA = /<evalAfter>([^]*?)<\/evalAfter>/gi;
    var RE_C = /<t>([^]*?)<\/t>/gi;
    var isEval = !!this._texts.match(RE_C);
    if(isEval && this._texts.match(RE_EA)) {
        eval(String(this._texts.match(RE_EA)).replace('<evalAfter>', '').replace('<\/evalAfter>', ''));
    }
};

Window_PageableBook_Page.prototype.normalColor = function() {
    return this.textColor($gameSystem.pageableTextColor());
};

Window_PageableBook_Page.prototype.drawPageNum = function() {
    this.changeTextColor(this.normalColor());
    this.contents.paintOpacity = 255;
    if(!$gameSystem.isPageableTextOutlineEnabled()) {
        this.contents.outlineWidth = 0;
    } else {
        this.contents.outlineWidth = 4;
    }
};

Window_PageableBook_Page.prototype.applyPageNum = function(pageText, orient='center') {
    if(this._showPageNum) {
        this.changeTextColor(this.textColor($gameSystem.pageableTextColor()));
        this.contents.fontSize -= 10;
        if(!$gameSystem.isPageableTextOutlineEnabled()) this.contents.outlineWidth = 0;
        var pos = $gameSystem.pageablePageNumPos();
        if(pos) {
            this.drawText(pageText, 0, this.contentsHeight() - this.contents.fontSize - 10, this.contentsWidth(), 'center');
        } else {
            this.drawText(pageText, 0, this.contentsHeight() - this.contents.fontSize - 10, this.contentsWidth(), orient);
        }
        this.contents.outlineWidth = 4;
        this.contents.fontSize += 10;
        this.resetTextColor();
    }
};

Window_PageableBook_Page.prototype.processEscapeCharacter = function(code, textState) {
    switch(code) {
        case 'PBNOOL':
            this.contents.outlineWidth = 0;
            break;
        case 'PBREOL':
            this.contents.outlineWidth = 4;
            break;
        case 'PBHDPN':
            this._showPageNum = false;
            break;
        case 'PBCGCL':
            this.contents.textColor = this.obtainEscapeStringParam(textState);
            break;
        case 'PBRECL':
            this.changeTextColor(this.normalColor());
            break;
        case 'PBCGOP':
            this.contents.paintOpacity = this.obtainEscapeParam(textState);
            break;
        case 'PBREOP':
            this.contents.paintOpacity = 255;
            break;
        case 'PBCGIT':
            this.contents.fontItalic = true;
            break;
        case 'PBREIT':
            this.contents.fontItalic = false;
            break;
        default:
            Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
    }
};

Window_PageableBook_Page.prototype.obtainEscapeStringParam = function(textState) {
    var arr = /^\[\S+\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        var res = arr[0].slice(1).replace(']','');
        return res;
    } else {
        return '';
    }
};

if(Utils.RPGMAKER_NAME === 'MZ') {
    Window_PageableBook_Page.prototype.textColor = function(n) {
        return ColorManager.textColor(n);
    };
    
    var __Window_PageableBook_Page_applyContents = Window_PageableBook_Page.prototype.applyContents;
    Window_PageableBook_Page.prototype.applyContents = function(texts) {
        texts = '\\C[' + $gameSystem.pageableTextColor() + ']' + texts; // normalColor is invalid
        __Window_PageableBook_Page_applyContents.call(this, texts);
    };
}

//-----------------------------------------------------------------------------
// Window_PageableBook_Left
//-----------------------------------------------------------------------------

function Window_PageableBook_Left() {
    this.initialize.apply(this, arguments);
};

Window_PageableBook_Left.prototype = Object.create(Window_PageableBook_Page.prototype);
Window_PageableBook_Left.prototype.constructor = Window_PageableBook_Left;

Window_PageableBook_Left.prototype.initialize = function(x, y, width, height) {
    Window_PageableBook_Page.prototype.initialize.call(this, x, y, width, height);
    this._curPageNum = 1;
};

Window_PageableBook_Left.prototype.drawPageNum = function() {
    Window_PageableBook_Page.prototype.drawPageNum.call(this);
    var style = $gameSystem.pageablePageNumStyle();
    var textsArray = $gameSystem.pageableBookTextsArray();
    var sumPageNum = textsArray.length;
    if(style) {
        var pageText = '';
        switch(style) {
            case 1:
                pageText = ''+this._curPageNum+'/'+sumPageNum;
                break;
            case 2:
                pageText = ''+this._curPageNum;
                break;
        };
        this.applyPageNum(pageText, 'left');
    }
};

//-----------------------------------------------------------------------------
// Window_PageableBook_Right
//-----------------------------------------------------------------------------

function Window_PageableBook_Right() {
    this.initialize.apply(this, arguments);
};

Window_PageableBook_Right.prototype = Object.create(Window_PageableBook_Page.prototype);
Window_PageableBook_Right.prototype.constructor = Window_PageableBook_Right;

Window_PageableBook_Right.prototype.initialize = function(x, y, width, height) {
    Window_PageableBook_Page.prototype.initialize.call(this, x, y, width, height);
    this._curPageNum = 2;
};

Window_PageableBook_Right.prototype.drawPageNum = function() {
    Window_PageableBook_Page.prototype.drawPageNum.call(this);
    var style = $gameSystem.pageablePageNumStyle();
    var textsArray = $gameSystem.pageableBookTextsArray();
    if(style) {
        var pageText = '';
        switch(style) {
            case 1:
                pageText = ''+this._curPageNum+'/'+textsArray.length;
                break;
            case 2:
                pageText = ''+this._curPageNum;
                break;
        };
        this.applyPageNum(pageText, 'right');
    }
};

//-----------------------------------------------------------------------------
// Window_PageableBook_Tip
//-----------------------------------------------------------------------------

function Window_PageableBook_Tip() {
    this.initialize.apply(this, arguments);
};

Window_PageableBook_Tip.prototype = Object.create(Window_Base.prototype);
Window_PageableBook_Tip.prototype.constructor = Window_PageableBook_Tip;

Window_PageableBook_Tip.prototype.initialize = function() {
    var width = Utils.RPGMAKER_NAME === 'MZ' ? Graphics.width : SceneManager._screenWidth;
    var height = this.fittingHeight(1);
    var x = 0;
    var screenHeight = Utils.RPGMAKER_NAME === 'MZ' ? Graphics.height : SceneManager._screenHeight;
    var y = screenHeight - height;
    if(Utils.RPGMAKER_NAME === 'MZ') {
        var rect = new Rectangle(x, y, width, height);
        Window_Base.prototype.initialize.call(this, rect);
    } else {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    }
    this.opacity = 0;
    this.refresh();
};

Window_PageableBook_Tip.prototype.standardPadding = function() {
    return 4;
};

Window_PageableBook_Tip.prototype.refresh = function() {
    if($gameSystem.isShowPageableTip()) {
        this.drawTextEx(RSSD.SPB.tipText, 0, 0);
    }
};

//-----------------------------------------------------------------------------
// Scene_PageableBook
//-----------------------------------------------------------------------------

function Scene_PageableBook() {
    this.initialize.apply(this, arguments);
};

Scene_PageableBook.prototype = Object.create(Scene_MenuBase.prototype);
Scene_PageableBook.prototype.constructor = Scene_PageableBook;

Scene_PageableBook.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this.initPageableData();
};

Scene_PageableBook.prototype.initPageableData = function() {
    this._pageTextsIndex = [0, 1];
    this._pageBgIndex = 0;
};

Scene_PageableBook.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindows();
};

Scene_PageableBook.prototype.createWindows = function(){
    var width = eval($gameSystem.pageableWindowWidth());
    var height = eval($gameSystem.pageableWindowHeight());
    var screenWidth = Utils.RPGMAKER_NAME === 'MZ' ? Graphics.width : SceneManager._screenWidth;
    var screenHeight = Utils.RPGMAKER_NAME === 'MZ' ? Graphics.height : SceneManager._screenHeight;
    var x = (screenWidth - width*2)/2;
    var y = (screenHeight - height)/2;
    var margin = eval($gameSystem.pageableWindowDistance()) / 2;
    this._window1 = new Window_PageableBook_Left(x-margin, y, width, height);
    this._window2 = new Window_PageableBook_Right(x+width+margin, y, width, height);
    this._tipWindow = new Window_PageableBook_Tip();
    this.addWindow(this._window1);
    this.addWindow(this._window2);
    this.addChild(this._tipWindow);
};

Scene_PageableBook.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.refreshPageTexts();
};

Scene_PageableBook.prototype.refreshPageTexts = function() {
    var maxIndex = $gameSystem.pageableBookTextsArray().length - 1;
    this._window1._texts = $gameSystem.pageableBookTextsArray()[this._pageTextsIndex[0]];
    this._window2._texts = this._pageTextsIndex[1] <= maxIndex ? $gameSystem.pageableBookTextsArray()[this._pageTextsIndex[1]] : '';
    this._window1._curPageNum = this._pageTextsIndex[0] + 1;
    this._window2._curPageNum = this._pageTextsIndex[1] + 1;
    if(!$gameSystem.isShowPageableWindows()){
        this._window1.opacity = 0;
        this._window2.opacity = 0;
    }else{
        this._window1.opacity = 255;
        this._window2.opacity = 255;
    }
    this._window1.refresh();
    this._window2.refresh();
};

Scene_PageableBook.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.checkApplyPop();
    this.updatePageSpecialBg();
    this.updatePageTexts();
};

Scene_PageableBook.prototype.checkApplyPop = function() {
    if(Input.isTriggered('menu') || TouchInput.isCancelled()) {
        this.popScene();
    }
};

Scene_PageableBook.prototype.updatePageSpecialBg = function() {
    let temp_index = this._pageBgIndex;
    if(this.isToPrevPage() && this.isPageFlippable(0)) {
        temp_index--;
    } else if(this.isToNextPage() && this.isPageFlippable(1)) {
        temp_index++;
    }
    if(this._pageBgIndex !== temp_index) {
        this._pageBgIndex = temp_index;
        this.refreshBgForPaging();
    }
};

Scene_PageableBook.prototype.updatePageTexts = function() {
    if(this.isToPrevPage() && this.isPageFlippable(0)) {
        this.goToPrevPage();
        this.onFlip();
    } else if(this.isToNextPage() && this.isPageFlippable(1)) {
        this.goToNextPage();
        this.onFlip();
    }
};

Scene_PageableBook.prototype.goToPrevPage = function() {
    var i1 = this._pageTextsIndex[0]; 
    var i2 = this._pageTextsIndex[1];
    this._pageTextsIndex[0] = i1 - 2 < 0 ? 0 : i1 - 2;
    this._pageTextsIndex[1] = i2 - 2 < 1 ? 1 : i2 - 2;
    this.refreshPageTexts();
};

Scene_PageableBook.prototype.goToNextPage = function() {
    var i1 = this._pageTextsIndex[0]; 
    var i2 = this._pageTextsIndex[1];
    var maxIndex = $gameSystem.pageableBookTextsArray().length - 1;
    var isD = (maxIndex+1) % 2 !== 1 ? true : false;
    if(isD) {
        this._pageTextsIndex[0] = i1 + 2 > maxIndex - 1 ? maxIndex - 1 : i1 + 2;
        this._pageTextsIndex[1] = i2 + 2 > maxIndex ? maxIndex : i2 + 2;
    }else{
        this._pageTextsIndex[0] = i1 + 2 > maxIndex ? maxIndex : i1 + 2;
        this._pageTextsIndex[1] = i2 + 2 > maxIndex + 1 ? maxIndex + 1 : i2 + 2;
    }
    this.refreshPageTexts();
};

Scene_PageableBook.prototype.isToPrevPage = function() {
    var isSwipe = false;
    if(Imported["SumRndmDde Swipe Input"]) isSwipe = SwipeInput.isTriggered('right', RSSD.SPB.minSwipeDist);
    return Input.isTriggered('left') || isSwipe;
};

Scene_PageableBook.prototype.isToNextPage = function() {
    var isSwipe = false;
    if(Imported["SumRndmDde Swipe Input"]) isSwipe = SwipeInput.isTriggered('left', RSSD.SPB.minSwipeDist);
    return Input.isTriggered('right') || isSwipe;
};

Scene_PageableBook.prototype.isPageFlippable = function(num) {
    // num: 0 -> to prev page; 1 -> to next page
    var i1 = this._pageTextsIndex[0]; 
    var i2 = this._pageTextsIndex[1];
    var maxIndex = $gameSystem.pageableBookTextsArray().length - 1;
    if(!num) return i1 !== 0;
    return i1 !== maxIndex && i2 !== maxIndex;
};

Scene_PageableBook.prototype.onFlip = function() {
    SoundManager.playPageFlipping();
};

Scene_PageableBook.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.createBookBg();
    this.refreshBgForPaging();
};

Scene_PageableBook.prototype.createBookBg = function() {
    this._pageableBookBg = new Sprite();
    var obj = $gameSystem.pageableBgConfig();
    var bg = obj.bg;
    var ox = eval(obj.x);
    var oy = eval(obj.y);
    if(bg) {
        this._pageableBookBg.bitmap = ImageManager.loadSystem(bg, 0);
    }
    this._pageableBookBg.anchor.x = 0.5;
    this._pageableBookBg.anchor.y = 0.5;
    var screenWidth = Utils.RPGMAKER_NAME === 'MZ' ? Graphics.width : SceneManager._screenWidth;
    var screenHeight = Utils.RPGMAKER_NAME === 'MZ' ? Graphics.height : SceneManager._screenHeight;
    this._pageableBookBg.x = screenWidth/2 + ox;
    this._pageableBookBg.y = screenHeight/2 + oy;
    this.addChild(this._pageableBookBg);
    obj = null;
};

Scene_PageableBook.prototype.refreshBgForPaging = function() {
    var key = $gameSystem.pageableCurrentContentsKey();
    if(RSSD.SPB.books[key]) {
        var bgName = RSSD.SPB.books[key].bgSet[this._pageBgIndex];
        if(bgName) {
            this._pageableBookBg.bitmap = ImageManager.loadSystem(bgName);
        } else {
            var obj = $gameSystem.pageableBgConfig();
            var bg = obj.bg;
            if(bg) {
                this._pageableBookBg.bitmap = ImageManager.loadSystem(bg);
            } else {
                if(Utils.RPGMAKER_NAME === 'MZ') {
                    this._pageableBookBg.bitmap = ImageManager._emptyBitmap;
                } else {
                    this._pageableBookBg.bitmap = ImageManager.loadEmptyBitmap();
                }
            }
        }
    }
};

if(Utils.RPGMAKER_NAME === 'MZ') {
    var __Scene_PageableBook_createCancelButton = Scene_PageableBook.prototype.createCancelButton;
    Scene_PageableBook.prototype.createCancelButton = function() {
        __Scene_PageableBook_createCancelButton.call(this);
        this._cancelButton.setClickHandler(this.popScene.bind(this));
    };
}

//-----------------------------------------------------------------------------
// SoundManager
//-----------------------------------------------------------------------------

SoundManager.playPageFlipping = function() {
    if($gameSystem.pageableSeName()) {
        var se = {name: $gameSystem.pageableSeName(), volume: 90, pitch: 100, pan: 0};
        AudioManager.playStaticSe(se);
    }
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//-----------------------------------------------------------------------------

var __Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    __Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === '::RSSD_SPB') {
        switch(args[0].toLowerCase()){
            case '设置并打开书籍':
                var key = args[1];
                if(key) {
                    $gameSystem.setPageableBookContents(key);
                    var book = RSSD.SPB.books[key];
                }
                if(book && book.layoutKey) {
                    $gameSystem.setPageableBookLayoutData(book.layoutKey);
                } 
                SceneManager.push(Scene_PageableBook);
                break;
            case 'setbook':
            case '设置书籍':
                var key = args[1];
                $gameSystem.setPageableBookContents(key);
                break;
            case 'setlayout':
            case '设置样式':
                var key = args[1];
                $gameSystem.setPageableBookLayoutData(key);
                break;
            case 'showtip':
            case '提示':
                var isShow = String(args[1]).toLowerCase() === 'true';
                $gameSystem.performPageableTip(isShow);
                break;
            case 'open':
            case '打开书籍':
                SceneManager.push(Scene_PageableBook);
                break;
        }
    }
};

if(Utils.RPGMAKER_NAME === 'MZ') {
    PluginManager.registerCommand(RSSD.SPB.pluginName, '设置书籍', (args)=>{
        const key = args['书籍关键字'];
        if(key) {
            $gameSystem.setPageableBookContents(key);
        }
    });
    PluginManager.registerCommand(RSSD.SPB.pluginName, '设置并打开书籍', (args)=>{
        const key = args['书籍关键字'];
        if(key) {
            $gameSystem.setPageableBookContents(key);
            const book = RSSD.SPB.books[key];
            if(book && book.layoutKey) {
                $gameSystem.setPageableBookLayoutData(book.layoutKey);
            } 
            SceneManager.push(Scene_PageableBook);
        }
    });
    PluginManager.registerCommand(RSSD.SPB.pluginName, '设置书籍样式', (args)=>{
        const key = args['样式关键字'];
        if(key) {
            $gameSystem.setPageableBookLayoutData(key);
        }
    });
    PluginManager.registerCommand(RSSD.SPB.pluginName, '是否显示提示文本', (args)=>{
        const isShow = ''+args['是否显示'] === 'true';
        $gameSystem.performPageableTip(isShow);
    });
    PluginManager.registerCommand(RSSD.SPB.pluginName, '设置书籍样式 - 细节', (args)=>{
        const phase = args['目标细节'];
        if(phase) {
            const booleans = ['showWindows', 'hasOutline'];
            const strings = ['windowWidth', 'windowHeight', 'distance', 'bg', 'bgX', 'bgY', 'seName'];
            const numbers = ['pageNumStyle', 'pageNumPos', 'textColor'];
            let value = null;
            if(booleans.includes(phase)) {
                value = args['设置值 - 布尔值'] === 'true';
            } else if(strings.includes(phase)) {
                value = args['设置值 - 文本'];
            } else if(numbers.includes(phase)) {
                value = +(args['设置值 - 数字'] || '0');
            }
            $gameSystem.setPageableBookData(phase, value);
        }
    });
}