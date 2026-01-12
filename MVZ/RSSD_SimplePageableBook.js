//=============================================================================
// RSSD_SimplePageableBook.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.2.7 - 简易可翻页书籍
 * @author Rose_shadows
 * @target MV MZ
 * @help
 * === 介绍 ===
 * 
 * 该插件提供一个可翻页的两面书籍界面。
 * 书籍既可以用左右键翻页，也可以用手指或鼠标滑动翻页（需第三方插件支持）。
 * 开发者可以在游戏中便捷展示预注册的书籍内容文本，设置书籍样式，
 * 也可以随意更改书籍背景等设置。
 * 通过插件参数，开发者可以自由设置多本书籍。
 * 
 * 对于书籍内容文本，该插件不仅提供使用纯文本和代码两种方式来书写内容，
 * 而且允许开发者为特定书籍的特定页码设置独特的背景图像。
 * 
 * 为了提升书籍的美观性，插件还预设了多种控制字符，可以达成很多效果，
 * 例如单独设置某一页面不绘制页码，临时将某页面的页码设为指定数字，
 * 或者使用CSS格式颜色作为文字颜色等。
 * 
 * 该插件还同时兼容 MV 的 YEP 消息核心插件和 MZ 的 Visu 消息核心插件，
 * 可以为书籍内容使用自动换行功能。详情见下记“自动换行功能”部分。
 * 
 * 
 * === 使用指引 / 注意事项 ===
 * 
 * 要使用该插件，建议为每本书准备一张摊开的书的背景图，
 * 例如 Pandamaru 的素材（包含Google Drive链接的素材网站，Eigenes文件夹）：
 * https://gamedevcafe.de/forum/index.php?thread/126-pandamaru-s-ressources/
 * 
 * 1. 书籍注册
 * 
 * 该插件使用插件参数管理器来管理书籍数据。
 * 
 * 在插件参数“书籍注册”中预注册好书籍，设置好关键字，在参数“内容”里
 * 写好内容，就可以用插件指令来设置和打开书籍了。
 * 
 * 关于内容的设置，详情见之后讲解的“插件参数 - 书籍内容”及后续部分。
 * 
 * 注意！每本书籍的关键字相较其他书籍必须是独一无二的。
 * 
 * 2. 书籍样式注册
 * 
 * 默认情况下，没有样式的书籍的外观非常简陋。
 * 所以，还需要注册新的书籍样式。
 * 
 * 在插件参数“书籍样式集”中，可以设置书籍的样式(模板)，
 * 方便一次性调用所有所需的设置。
 * 
 * 打开插件参数“书籍样式集”，设置好关键字，再在参数“背景图片”设置好
 * 摊开的书的背景图，即可完成最基础的书籍样式。
 * 
 * 注意！书籍样式的关键字相较其他样式也必须是独一无二的。
 * 
 * 注册好样式后，可以将书籍样式绑定到书籍上。一种样式可以绑定多本书籍。
 * 打开插件参数“书籍注册”，将样式的关键字填入参数“关联样式”即可完成绑定。
 * 使用插件指令“设置并打开书籍”时，就会自动使用该样式。
 * 
 * 若背景和书籍内容没有对齐，根据游戏内的表现调整背景偏移、页面窗口宽高、
 * 左右页面间距等参数即可。
 * 
 * 除此以外，在样式里还可以设置许多效果，包括页码类型和位置、文本颜色、
 * 文字是否描边、文本字体、是否自动换行（需外部插件支持）、翻页音效。
 * 关于自动换行功能，详情见之后讲解的“自动换行功能”部分。
 * 
 * 
 * === 插件参数 - 书籍内容 ===
 * 
 * 在插件参数“书籍注册”中一项参数的“内容”一栏，
 * 可以设置所要显示的书籍内容文本项。
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
 * const bitmap = ImageManager.loadBitmap('img/pictures/', '装饰');
 * this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 123, 456);
 * - 在书页的(123, 456)位置绘制 img/pictures/ 下的 装饰.png 图像。
 *   注意！如果不事先预加载图像的话，在第一次翻页时图像可能无法加载出来。
 *   需要提前用预加载插件，或者通过“书籍注册”的“手动预加载图像列表”参数来预加载
 *   图像。
 * 
 * 
 * == 插件参数 - 书籍内容 - 控制字符 ==
 * 
 * 在书写内容时，可以使用一些特殊的控制字符。
 * 
 *  \PG[页码数字]
 *  - 为当前页面绘制指定的页码数字。
 *    例如，在用于书籍第4页的文本中书写\PG[6]，
 *    这样显示出来的左侧页面为第3页，右侧原本应为第4页的页面显示为第6页，
 *    （如有条件）再搭配残留着被撕过的痕迹的书籍背景，
 *    就可以做出中间第4页和第5页这页纸被撕走的效果。
 * 
 *  \HDPN
 *  - 隐藏（不绘制）本页页码。加在内容文本前面即可。
 * 
 *  \NOOL
 *  - 移除字体描边。
 * 
 *  \REOL
 *  - 恢复字体描边。
 * 
 *  \CGCL[hex/rgba]
 *  - 用CSS格式颜色定义字体颜色。例如：\PBCGCL[#ffffff]
 * 
 *  \RECL
 *  - 将字体颜色设置为默认颜色。
 * 
 *  \CGOP[0~255]
 *  - 更改文本的不透明度。
 * 
 *  \REOP
 *  - 重置文本不透明度。
 * 
 *  \CGIT
 *  - 将文本改为斜体。
 * 
 *  \REIT
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
 * == 插件参数 - 翻页按钮 ==
 * 
 * 从版本 1.2.4 起，可以为书籍设置一对左右翻页按钮。
 * 翻页按钮图像需要放在 img/system/ 文件夹下，
 * 图像格式为闲置状态和点击状态上下拼成一列的格式。
 * 该功能默认禁用。
 * 
 * 
 * === 触摸滑动翻页功能 ===
 * 
 * 配合 SRD_SwipeInput.js，可以实现触摸滑动翻页功能。
 * 请将该插件放到 SRD_SwipeInput.js 插件之下。
 * 
 * 
 * === 自动换行功能 ===
 * 
 * 配合 YEP_MessageCore.js（MV）和 VisuMZ_1_MessageCore.js（MZ）插件，
 * 可以实现书籍内容自动换行。
 * 在自定义书籍样式时可以选择是否开启或关闭。默认为关闭。
 * 使用时，请将该插件放到 YEP 或 Visu 的消息核心插件之下。
 * 
 * ！注意！MV 的 YEP_MessageCore.js 原版不支持中文换行，
 * 如有需要，可下载以下补丁插件修复这个问题：
 * https://raw.githubusercontent.com/Roseshadows/RPG-Maker-MVZ/refs/heads/master/MV/YEP_MessageCore_WordWrapPatch.js
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
 *   ::RSSD_SPB 设置并打开书籍 {KEY} {INIT_PAGE}
 * - 设置当前要显示的书籍内容，并打开书籍界面。
 *   {KEY}是在插件参数中设置的书籍内容关键字。
 *   {INIT_PAGE}是选填项，决定玩家打开书籍后最先看到的页码，
 *   页码数字以左侧页页码为准，应该是一个奇数数字。
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
 * - 打开可翻页书籍界面。
 *   必须先用 ::RSSD_SPB 设置书籍 {KEY} 设置书籍内容。
 * 
 * 
 * === 事件脚本 ===
 * 
 * $gameSystem.setPageableBookContents(key);
 * - 通过关键字设置预注册的书籍内容。
 *   另外，在每次设置关键字时，相关的图像都会预加载一次，
 *   可以通过开启“是否禁止预加载图像”参数来禁用预加载功能。
 * 
 * $gameSystem.setPageableBookLayoutData(key);
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
 *    startPageNum - 初始页码。打开界面时停在这一页。以左侧页页码为准。
 *                   应该是奇数数字。每次用插件指令设置内容时会重置为第1页。
 *                   不过，建议使用下面的 setPageableStartPage 方法设置。
 * 例如：
 * $gameSystem.setPageableBookData('windowWidth', 300);
 * - 将书籍的左右窗口宽度设为300像素。
 * 
 * $gameSystem.performPageableTip(boolean);
 * - 决定是否显示翻页操作提示。
 * 
 * $gameSystem.setPageableStartPage(3);
 * - 将初始页码设为3。打开界面时停在这一页。以左侧页页码为准。
 *   应该是奇数数字。每次设置内容时会重置为第1页。
 * 
 * $gameSystem.initPageableStartPage();
 * - 初始化初始页码。将初始页码设为1。
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
 * 1.2.2 - 优化了插件的代码，放弃对RMMV1.6.0版本以下的维护，新增书籍初始页和
 *         临时更改页面绘制的页码的功能。
 * 1.2.4 - 新增用游戏按钮翻页和为书籍设置字体的功能。
 * 1.2.5 - 确认了与 VisuMZ_1_MessageCore.js 的兼容性，新增自动换行功能
 *         （需要消息核心插件），修复书籍最多两页时显示翻页提示文本的问题。
 * 1.2.7 - 确认了与 YEP_MessageCore.js 的兼容性，新增为书籍文本设置字号和
 *         行高的功能。
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
 * @arg 初始页面页码
 * @type number
 * @desc 打开书籍时最先看到的页面的左侧页页码。应该为奇数数字。默认为1。
 * @default 1
 * 
 * @command 仅打开书籍
 * @desc 不更改书籍内容和样式，仅打开书籍界面。
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
 * @param Enable Wordwrap
 * @text 默认是否启用自动换行
 * @parent === 书籍窗口全局设置 ===
 * @type boolean
 * @on 自动换行
 * @off 不自动换行
 * @desc 是否启用自动换行？需要Visu的消息核心。
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
 * @param Show Tip at Start
 * @text 是否默认显示提示
 * @parent == 操作提示 ==
 * @type boolean
 * @desc 默认情况下是否显示提示？
 * @default true
 * 
 * @param Tip Text
 * @text 提示文本
 * @parent == 操作提示 ==
 * @desc 显示的提示文本。可使用控制字符。
 * @default 请按左右键翻页。
 * 
 * @param == 翻页按钮 ==
 * 
 * @param Show Paging Buttons
 * @text 是否显示翻页按钮
 * @parent == 翻页按钮 ==
 * @type boolean
 * @desc 是否显示翻页按钮？
 * @default false
 * 
 * @param Prev Button Image
 * @text 上一页翻页按钮图像
 * @parent == 翻页按钮 ==
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 翻到上一页的翻页按钮的图像。图像放在 img/system/ 下。
 * @default Button_PagingPrev
 * 
 * @param Next Button Image
 * @text 下一页翻页按钮图像
 * @parent == 翻页按钮 ==
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 翻到下一页的翻页按钮的图像。图像放在 img/system/ 下。
 * @default Button_PagingNext
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
 * @param === 背景图片 ===
 * 
 * @param bg
 * @text 背景图片
 * @parent === 背景图片 ===
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 该样式下的书籍背景图片。若为空则使用默认背景。
 * @default 
 * 
 * @param bgX
 * @text 背景X偏移
 * @parent === 背景图片 ===
 * @desc 背景的X坐标偏移。若为空则使用默认值。
 * @default 
 * 
 * @param bgY
 * @text 背景Y偏移
 * @parent === 背景图片 ===
 * @desc 背景的Y坐标偏移。若为空则使用默认值。
 * @default 
 * 
 * @param === 页面窗口 ===
 * 
 * @param Show Windows
 * @text 是否显示窗口背景
 * @parent === 页面窗口 ===
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default false
 * 
 * @param Window Width
 * @text 页面窗口宽度
 * @parent === 页面窗口 ===
 * @desc 两个窗口的通用宽度。可使用评估代码。若为空则使用默认值。
 * @default 
 * 
 * @param Window Height
 * @text 页面窗口高度
 * @parent === 页面窗口 ===
 * @desc 两个窗口的通用宽度。可使用评估代码。若为空则使用默认值。
 * @default 
 * 
 * @param Distance
 * @text 左右页面间距
 * @parent === 页面窗口 ===
 * @desc 左窗口和右窗口间的距离。单位像素。可使用评估代码。若为空则使用默认值。
 * @default 
 * 
 * @param === 页码设置 ===
 * 
 * @param Page Num Style
 * @text 页码类型
 * @parent === 页码设置 ===
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
 * @parent === 页码设置 ===
 * @type select
 * @option 左页左下/右页右下
 * @value 0
 * @option 居中
 * @value 1
 * @desc 页码显示的位置。
 * @default 0
 * 
 * @param === 文本设置 ===
 * 
 * @param Text Color
 * @text 文本颜色
 * @parent === 文本设置 ===
 * @desc 书籍文本的颜色。若为空则使用默认颜色代码。
 * @default 
 * 
 * @param Text Outline
 * @text 书籍文本是否描边
 * @parent === 文本设置 ===
 * @type boolean
 * @on 描边
 * @off 不描边
 * @desc 书籍文本是否描边？
 * @default false
 * 
 * @param Text Size
 * @text 文本字号
 * @parent === 文本设置 ===
 * @desc 文本的字号。不填则为系统默认字号。
 * @default 
 * 
 * @param Line Height
 * @text 文本行高
 * @parent === 文本设置 ===
 * @desc 文本的行高。可以控制文本的行间距。不填则为系统默认行高。
 * @default 
 * 
 * @param === 字体设置 ===
 * 
 * @param Font File
 * @text 字体文件
 * @parent === 字体设置 ===
 * @desc 在这里写用于该样式的字体文件名称，包括后缀名。建议使用.ttf文件。放在 fonts/ 下。留空则使用默认游戏字体。
 * @default 
 * 
 * @param === 自动换行 ===
 * @default = YEP & Visu 消息核心 兼容 =
 * 
 * @param Enable Wordwrap
 * @text 是否启用自动换行
 * @parent === 自动换行 ===
 * @type boolean
 * @on 自动换行
 * @off 不自动换行
 * @desc 对于使用了该样式的书籍文字，是否启用自动换行？需要YEP或Visu的消息核心。
 * @default false
 * 
 * @param === 音效设置 ===
 * 
 * @param Se
 * @text 翻页音效
 * @parent === 音效设置 ===
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
    const obj = JSON.parse(item);
    const key = obj['Key'];
    RSSD.SPB.books[key] = {};
    const dup = JSON.parse(obj['Contents']) || [];
    const contents = [];
    dup.forEach((item)=>{
        contents.push(JSON.parse(item));
    });
    RSSD.SPB.books[key].contents = contents;
    RSSD.SPB.books[key].layoutKey = obj['Corresponding Layout'] || '';
    const lo = JSON.parse(obj['Special Page Bg']) || [];
    const bgSet = [];
    lo.forEach((set)=>{
        const s = JSON.parse(set) || {};
        const bgIndex = +s['Count'] || 1;
        bgSet[Math.floor(bgIndex/2)] = s['bg'] || '';
    });
    RSSD.SPB.books[key].bgSet = bgSet;
    const pi = JSON.parse(obj['Preload Images']) || [];
    const preloadImgs = [];
    pi.forEach((item)=>{
        const p = JSON.parse(item);
        const o = {};
        o.name = p['Name'];
        o.dir = p['Directory'] || '';
        preloadImgs.push(o);
    });
    RSSD.SPB.books[key].preloadImages = preloadImgs;
});

RSSD.SPB.layouts = {};
var arr2 = JSON.parse(parameters['Book Layouts List']) || [];
arr2.forEach((item)=>{
    const obj = JSON.parse(item);
    const key = obj['Key'];
    RSSD.SPB.layouts[key] = {};
    const o = RSSD.SPB.layouts[key];
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
    o.textSize     = +obj['Text Size'];
    o.lineHeight   = +obj['Line Height'];
    o.fontFileName = obj['Font File'] || '';
    o.wordwrap     = obj['Enable Wordwrap'] === 'true';
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
RSSD.SPB.wordwrap     = parameters['Enable Wordwrap'] === 'true';
RSSD.SPB.defaultSe    = parameters['Default Se'] || '';
RSSD.SPB.showWindows  = parameters['Show Windows'] === 'true';

RSSD.SPB.tipText        = parameters['Tip Text'] || '';
RSSD.SPB.isTipInitShown = parameters['Show Tip at Start'] === 'true';

RSSD.SPB.showPagingButtons = parameters['Show Paging Buttons'] === 'true';
RSSD.SPB.prevBtn           = parameters['Prev Button Image'] || 'Button_PagingPrev';
RSSD.SPB.nextBtn           = parameters['Next Button Image'] || 'Button_PagingNext';

RSSD.SPB.minSwipeDist = +parameters['Minimum Swipe Distance'] || 100;

RSSD.SPB.disablePreload = parameters['Disable Preload'] === 'true';

RSSD.SPB.fontPrefix = 'pageable-book-font-';

let isMZ = Utils.RPGMAKER_NAME === 'MZ';
let isMessageCoreInstalled = (isMZ && Imported.VisuMZ_1_MessageCore) || (!isMZ && Imported.YEP_MessageCore);  // for VisuMZ_1_MessageCore.js compability

//-----------------------------------------------------------------------------
// Scene_Boot
//-----------------------------------------------------------------------------

if(isMZ) {

    let __RSSD_SPB_Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
    Scene_Boot.prototype.loadGameFonts = function() {
        __RSSD_SPB_Scene_Boot_loadGameFonts.call(this);
        this.loadPageableBookFonts();
    };

    Scene_Boot.prototype.loadPageableBookFonts = function() {
        const keys = Object.keys(RSSD.SPB.layouts);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const layout = RSSD.SPB.layouts[key];
            const filename = layout.fontFileName;
            if(filename) {
                FontManager.load(RSSD.SPB.fontPrefix+key, filename);
            }
        }
    };

} else {

    let __RSSD_SPB_Scene_Boot_create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function() {
        __RSSD_SPB_Scene_Boot_create.call(this);
        this.loadPageableBookFonts();
    };

    Scene_Boot.prototype.loadPageableBookFonts = function() {
        const keys = Object.keys(RSSD.SPB.layouts);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const layout = RSSD.SPB.layouts[key];
            const filename = layout.fontFileName;
            if(filename) {
                Graphics.loadFont(RSSD.SPB.fontPrefix+key, 'fonts/'+filename);
            }
        }
    };
}

//-----------------------------------------------------------------------------
// Game_System
//-----------------------------------------------------------------------------

let __RSSD_SPB_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    __RSSD_SPB_Game_System_initialize.call(this);
    this.refreshPageableBookData();
};

Game_System.prototype.refreshPageableBookData = function() {
    this._pageableBookData = {};
    this._pageableBookData.textsArray = [];
    this._pageableBookData.showTip    = RSSD.SPB.isTipInitShown;
    this._pageableBookData.currentContentsKey = '';
    this._pageableBookData.currentLayoutKey = '';
    this.initPageableBookLayoutData();
    this.applyPageableBgPreload();
};

Game_System.prototype.initPageableBookLayoutData = function() {
    const data = this._pageableBookData;
    data.showWindows  = RSSD.SPB.showWindows;
    data.windowWidth  = RSSD.SPB.windowWidth;
    data.windowHeight = RSSD.SPB.windowHeight;
    data.distance     = RSSD.SPB.distance;
    data.pageNumStyle = RSSD.SPB.pageNumStyle;
    data.pageNumPos   = RSSD.SPB.pageNumPos;
    data.textColor    = RSSD.SPB.textColor;
    data.hasOutline   = RSSD.SPB.hasOutline;
    data.textSize     = 0;
    data.lineHeight   = 0;
    data.bg           = RSSD.SPB.bg;
    data.bgX          = RSSD.SPB.bgX;
    data.bgY          = RSSD.SPB.bgY;
    data.seName       = RSSD.SPB.defaultSe;
    data.startPageNum = 1;
    data.wordwrap     = RSSD.SPB.wordwrap;
    // font 由 currentContentsKey 控制
};

Game_System.prototype.setPageableBookLayoutData = function(key) {
    this._pageableBookData.currentLayoutKey = key;
    this._private_SPB_replaceElems(RSSD.SPB.layouts[key], this._pageableBookData);
};

Game_System.prototype._private_SPB_replaceElems = function(obj, tar_obj) {
    const keys = Object.keys(obj);
    keys.forEach((key)=>{
        if(tar_obj[key] !== undefined && obj[key]) {
            tar_obj[key] = obj[key];
        }
    });
};

Game_System.prototype.pageableCurrentLayoutKey = function() {
    return this._pageableBookData.currentLayoutKey;
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

Game_System.prototype.pageableTextSize = function() {
    return this._pageableBookData.textSize;
};

Game_System.prototype.pageableLineHeight = function() {
    return this._pageableBookData.lineHeight;
};

Game_System.prototype.pageableSeName = function() {
    return this._pageableBookData.seName;
};

Game_System.prototype.pageableBgName = function() {
    return this._pageableBookData.bg;
};

Game_System.prototype.pageableBgX = function() {
    return this._pageableBookData.bgX;
};

Game_System.prototype.pageableBgY = function() {
    return this._pageableBookData.bgY;
};

Game_System.prototype.pageableStartPageNum = function() {
    return this._pageableBookData.startPageNum;
};

Game_System.prototype.isPageableTextOutlineEnabled = function() {
    return this._pageableBookData.hasOutline;
};

Game_System.prototype.isPageableWordWrapEnabled = function() {
    return this._pageableBookData.wordwrap && isMessageCoreInstalled;
};

Game_System.prototype.isShowPageableWindows = function() {
    return this._pageableBookData.showWindows;
};

Game_System.prototype.isShowPageableTip = function() {
    return this._pageableBookData.showTip;
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

Game_System.prototype.initPageableStartPage = function() {
    this.setPageableBookData('startPageNum', 1);
};

Game_System.prototype.setPageableStartPage = function(page=1) {
    page = page % 2 === 0 ? page - 1 : page;
    this.setPageableBookData('startPageNum', page);
};

Game_System.prototype.applyPageableBgPreload = function() {
    // For MZ compatibility
    if(!RSSD.SPB.disablePreload) {
        const name = this.pageableBgName();
        if(name) ImageManager.loadSystem(name);
        obj = null;
    }
};

Game_System.prototype.applyPageableSpecialBgPreload = function() {
    // For MZ compatibility
    if(!RSSD.SPB.disablePreload) {
        const key = this.pageableCurrentContentsKey();
        const bgSet = RSSD.SPB.books[key].bgSet;
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
        const key = this.pageableCurrentContentsKey();
        const imgs = RSSD.SPB.books[key].preloadImages;
        imgs.forEach((img)=>{
            let name = img.name;
            let dir = img.dir;
            ImageManager.loadBitmap(dir, name);
        });
    }
};

//-----------------------------------------------------------------------------
// Sprite_PagingButton
//-----------------------------------------------------------------------------

if(isMZ) {

    function Sprite_PagingButton() {
        this.initialize(...arguments);
    }

    Sprite_PagingButton.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_PagingButton.prototype.constructor = Sprite_PagingButton;

    Sprite_PagingButton.prototype.initialize = function(buttonType) {  // buttonType: left / right
        Sprite_Clickable.prototype.initialize.call(this);
        this._buttonType = buttonType;
        this._coldFrame = null;
        this._hotFrame = null;
        this.setupFrame();
    };

    Sprite_PagingButton.prototype.setupFrame = function() {
        this.loadButtonImage();
        this.bitmap.addLoadListener(()=>{
            this.initColdFrame();
            this.initHotFrame();
            this.updateFrame();
            this.updateOpacity();
        });
    };

    Sprite_PagingButton.prototype.loadButtonImage = function() {
        const emptyBitmap = ImageManager._emptyBitmap;
        const name = this._buttonType === 'left' ? RSSD.SPB.prevBtn : RSSD.SPB.nextBtn;
        if(RSSD.SPB.showPagingButtons)
        this.bitmap = ImageManager.loadSystem(name);
        else this.bitmap = emptyBitmap;
    };

    Sprite_PagingButton.prototype.update = function() {
        Sprite_Clickable.prototype.update.call(this);
        this.updateFrame();
        this.updateOpacity();
        this.processTouch();
    };

    Sprite_PagingButton.prototype.updateFrame = function() {
        const frame = this.isPressed() ? this._hotFrame : this._coldFrame;
        if (frame) {
            this.setFrame(frame.x, frame.y, frame.width, frame.height);
        }
    };

    Sprite_PagingButton.prototype.updateOpacity = function() {
        this.opacity = this._pressed ? 255 : 192;
    };

    Sprite_PagingButton.prototype.initColdFrame = function() {
        const width = Math.floor(this.bitmap.width), height = Math.floor(this.bitmap.height / 2);
        this._coldFrame = new Rectangle(0, 0, width, height);
    };

    Sprite_PagingButton.prototype.initHotFrame = function() {
        const width = Math.ceil(this.bitmap.width), height = Math.ceil(this.bitmap.height / 2);
        this._hotFrame = new Rectangle(0, height, width, height);
    };

    Sprite_PagingButton.prototype.onClick = function() {
        Input.virtualClick(this._buttonType);
    };

} else {

    function Sprite_PagingButton() {
        this.initialize.apply(this, arguments);
    }

    Sprite_PagingButton.prototype = Object.create(Sprite_Button.prototype);
    Sprite_PagingButton.prototype.constructor = Sprite_PagingButton;

    Sprite_PagingButton.prototype.initialize = function(buttonType) {
        Sprite_Button.prototype.initialize.call(this);
        this._buttonType = buttonType;
        this.setupFrame();
    };

    Sprite_PagingButton.prototype.setupFrame = function() {
        this.loadButtonImage();
        this.bitmap.addLoadListener(()=>{
            this.initColdFrame();
            this.initHotFrame();
            this.updateFrame();
            this.updateOpacity();
        });
    };

    Sprite_PagingButton.prototype.loadButtonImage = function() {
        const emptyBitmap = ImageManager.loadEmptyBitmap();
        const name = this._buttonType === 'left' ? RSSD.SPB.prevBtn : RSSD.SPB.nextBtn;
        if(RSSD.SPB.showPagingButtons)
        this.bitmap = ImageManager.loadSystem(name);
        else this.bitmap = emptyBitmap;
    };

    Sprite_PagingButton.prototype.update = function() {
        Sprite_Button.prototype.update.call(this);
        this.updateFrame();
        this.updateOpacity();
        this.processTouch();
    };

    Sprite_PagingButton.prototype.updateOpacity = function() {
        this.opacity = this._touching ? 255 : 192;
    };

    Sprite_PagingButton.prototype.initColdFrame = function() {
        const width = Math.floor(this.bitmap.width), height = Math.floor(this.bitmap.height / 2);
        this._coldFrame = new Rectangle(0, 0, width, height);
    };

    Sprite_PagingButton.prototype.initHotFrame = function() {
        const width = Math.ceil(this.bitmap.width), height = Math.ceil(this.bitmap.height / 2);
        this._hotFrame = new Rectangle(0, height, width, height);
    };
}

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
    if(isMZ) {
        const rect = new Rectangle(x, y, width, height);
        Window_Base.prototype.initialize.call(this, rect);
    } else {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    }
    this._text = '';
    this._tempPageNum = 0;
    this._curPageNum = this.startPageNum();
    this._showPageNum = true;  // only for escape character
    this.refresh();
};

Window_PageableBook_Page.prototype.defaultFontFace = function() {
    const key = $gameSystem.pageableCurrentLayoutKey();
    if(key && RSSD.SPB.layouts[key] && RSSD.SPB.layouts[key].fontFileName) {
        const fontFace = RSSD.SPB.fontPrefix+key;
        const addition = isMZ ? $gameSystem.mainFontFace() : this.standardFontFace();
        return fontFace + ', ' + addition;
    }
    if(isMZ) return $gameSystem.mainFontFace();
    return this.standardFontFace();
};

Window_PageableBook_Page.prototype.resetFontSettings = function() {
    Window_Base.prototype.resetFontSettings.call(this);
    this.contents.fontFace = this.defaultFontFace();
};

Window_PageableBook_Page.prototype.lineHeight = function() {
    return $gameSystem.pageableLineHeight() || Window_Base.prototype.lineHeight.call(this);
};

Window_PageableBook_Page.prototype.startPageNum = function() {
    return 1;
};

Window_PageableBook_Page.prototype.setPageNum = function(num) {
    this._curPageNum = num;
};

Window_PageableBook_Page.prototype.pageNum = function() {
    return this._curPageNum;
};

Window_PageableBook_Page.prototype.setText = function(texts) {
    this._text = texts;
};

Window_PageableBook_Page.prototype.refresh = function() {
    this.contents.clear();
    this._showPageNum = true;
    this._tempPageNum = this._curPageNum;
    if(this._text){
        if(!$gameSystem.isPageableTextOutlineEnabled()) this.contents.outlineWidth = 0;
        this.drawContents();
        this.drawPageNum();
        this.contents.outlineWidth = 4;
    }
};

Window_PageableBook_Page.prototype.drawContents = function() {
    this.applyEvalBefore();
    this.applyContents();
    this.applyEvalAfter();
};

Window_PageableBook_Page.prototype.applyEvalBefore = function() {
    const RE_EB = /<evalBefore>([^]*?)<\/evalBefore>/gi;
    const RE_C = /<t>([^]*?)<\/t>/gi;
    const isEval = !!this._text.match(RE_C);
    if(isEval && this._text.match(RE_EB)) {
        eval(String(this._text.match(RE_EB)).replace('<evalBefore>', '').replace('<\/evalBefore>', ''));
    }
};

Window_PageableBook_Page.prototype.applyContents = function() {
    const RE_C = /<t>([^]*?)<\/t>/gi;
    const isEval = !!this._text.match(RE_C);
    let texts = isEval ? String(this._text.match(RE_C)).replace('<t>', '').replace('<\/t>', '') : this._text;
    texts = this.processCharacterEffect(texts);
    this.drawTextEx(texts, 0, 0);
};

Window_PageableBook_Page.prototype.applyEvalAfter = function() {
    const RE_EA = /<evalAfter>([^]*?)<\/evalAfter>/gi;
    const RE_C = /<t>([^]*?)<\/t>/gi;
    const isEval = !!this._text.match(RE_C);
    if(isEval && this._text.match(RE_EA)) {
        eval(String(this._text.match(RE_EA)).replace('<evalAfter>', '').replace('<\/evalAfter>', ''));
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
    // ... (this.applyPageNum(...)) // 待子类扩展
};

Window_PageableBook_Page.prototype.applyPageNum = function(pageText, orient='center') {
    if(this._showPageNum) {
        this.changeTextColor(this.textColor($gameSystem.pageableTextColor()));
        this.contents.fontSize -= 10;
        if(!$gameSystem.isPageableTextOutlineEnabled()) this.contents.outlineWidth = 0;
        const pos = $gameSystem.pageablePageNumPos();
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

Window_PageableBook_Page.prototype.processCharacterEffect = function(texts) {
    if($gameSystem.isPageableWordWrapEnabled()) {
        texts = '<WordWrap>'+texts;
    }
    if(isMessageCoreInstalled && !$gameSystem.isPageableTextOutlineEnabled()) {
        const name = isMZ ? 'OutlineWidth' : 'ow';
        texts = '\\'+name+'[0]' + texts;
    }
    return texts;
};

Window_PageableBook_Page.prototype.processEscapeCharacter = function(code, textState) {
    switch(code) {
        case 'PBNOOL':
        case 'NOOL':
            this.contents.outlineWidth = 0;
            break;
        case 'PBREOL':
        case 'REOL':
            this.contents.outlineWidth = 4;
            break;
        case 'PBHDPN':
        case 'HDPN':
            this._showPageNum = false;
            break;
        case 'PBCGCL':
        case 'CGCL':
            this.contents.textColor = this.obtainEscapeStringParam(textState);
            break;
        case 'PBRECL':
        case 'RECL':
            this.changeTextColor(this.normalColor());
            break;
        case 'PBCGOP':
        case 'CGOP':
            this.contents.paintOpacity = this.obtainEscapeParam(textState);
            break;
        case 'PBREOP':
        case 'REOP':
            this.contents.paintOpacity = 255;
            break;
        case 'PBCGIT':
        case 'CGIT':
            this.contents.fontItalic = true;
            break;
        case 'PBREIT':
        case 'REIT':
            this.contents.fontItalic = false;
            break;
        case 'PG':
            this._tempPageNum = this.obtainEscapeParam(textState);
            break;
        default:
            Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
    }
};

Window_PageableBook_Page.prototype.obtainEscapeStringParam = function(textState) {
    const arr = /^\[\S+\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        const res = arr[0].slice(1).replace(']','');
        return res;
    } else {
        return '';
    }
};

if(isMZ) {
    let __RSSD_SPB_Window_PageableBook_Page_resetFontSettings = Window_PageableBook_Page.prototype.resetFontSettings;
    Window_PageableBook_Page.prototype.resetFontSettings = function() {
        __RSSD_SPB_Window_PageableBook_Page_resetFontSettings.call(this);
        this.contents.fontSize = $gameSystem.pageableTextSize() || $gameSystem.mainFontSize();
    };

    Window_PageableBook_Page.prototype.textColor = function(n) {
        return ColorManager.textColor(n);
    };
    
    let __RSSD_SPB_Window_PageableBook_Page_applyContents = Window_PageableBook_Page.prototype.applyContents;
    Window_PageableBook_Page.prototype.applyContents = function(texts) {
        texts = '\\C[' + $gameSystem.pageableTextColor() + ']' + texts; // normalColor is invalid
        __RSSD_SPB_Window_PageableBook_Page_applyContents.call(this, texts);
    };
}

if(!isMZ) {
    Window_PageableBook_Page.prototype.standardFontSize = function() {
        return $gameSystem.pageableTextSize() || Window_Base.prototype.standardFontSize.call(this);
    };
}

//-----------------------------------------------------------------------------
// Window_PageableBook_PageDual
//-----------------------------------------------------------------------------

function Window_PageableBook_PageDual() {
    this.initialize.apply(this, arguments);
};

Window_PageableBook_PageDual.prototype = Object.create(Window_PageableBook_Page.prototype);
Window_PageableBook_PageDual.prototype.constructor = Window_PageableBook_PageDual;

Window_PageableBook_PageDual.prototype.initialize = function(x, y, width, height) {
    Window_PageableBook_Page.prototype.initialize.call(this, x, y, width, height);
};

Window_PageableBook_PageDual.prototype.isLeftWindow = function() {
    return false;
};

Window_PageableBook_PageDual.prototype.startPageNum = function() {
    const startPage = $gameSystem.pageableStartPageNum();
    if(this.isLeftWindow()) return startPage;
    else return startPage + 1;
};

Window_PageableBook_PageDual.prototype.pageNumAlign = function() {
    if(this.isLeftWindow()) return 'left';
    return 'right';
};

Window_PageableBook_PageDual.prototype.drawPageNum = function() {
    Window_PageableBook_Page.prototype.drawPageNum.call(this);
    const style = $gameSystem.pageablePageNumStyle();
    const textsArray = $gameSystem.pageableBookTextsArray();
    const sumPageNum = textsArray.length;
    const pageNum = this._tempPageNum || this._curPageNum;
    if(style) {
        let pageText = '';
        switch(style) {
            case 1:
                pageText = ''+pageNum+'/'+sumPageNum;
                break;
            case 2:
                pageText = ''+pageNum;
                break;
        };
        this.applyPageNum(pageText, this.pageNumAlign());
    }
};

//-----------------------------------------------------------------------------
// Window_PageableBook_Left
//-----------------------------------------------------------------------------

function Window_PageableBook_Left() {
    this.initialize.apply(this, arguments);
};

Window_PageableBook_Left.prototype = Object.create(Window_PageableBook_PageDual.prototype);
Window_PageableBook_Left.prototype.constructor = Window_PageableBook_Left;

Window_PageableBook_Left.prototype.initialize = function(x, y, width, height) {
    Window_PageableBook_PageDual.prototype.initialize.call(this, x, y, width, height);
};

Window_PageableBook_Left.prototype.isLeftWindow = function() {
    return true;
};

//-----------------------------------------------------------------------------
// Window_PageableBook_Right
//-----------------------------------------------------------------------------

function Window_PageableBook_Right() {
    this.initialize.apply(this, arguments);
};

Window_PageableBook_Right.prototype = Object.create(Window_PageableBook_PageDual.prototype);
Window_PageableBook_Right.prototype.constructor = Window_PageableBook_Right;

Window_PageableBook_Right.prototype.initialize = function(x, y, width, height) {
    Window_PageableBook_PageDual.prototype.initialize.call(this, x, y, width, height);
};

Window_PageableBook_Right.prototype.isLeftWindow = function() {
    return false;
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
    const width = isMZ ? Graphics.width : SceneManager._screenWidth;
    const height = this.fittingHeight(1);
    const x = 0;
    const screenHeight = isMZ ? Graphics.height : SceneManager._screenHeight;
    const y = screenHeight - height;
    if(isMZ) {
        const rect = new Rectangle(x, y, width, height);
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
    if(this.needsVisibility()) {
        this.drawTextEx(RSSD.SPB.tipText, 0, 0);
    }
};

Window_PageableBook_Tip.prototype.needsVisibility = function() {
    return $gameSystem.isShowPageableTip() && $gameSystem.pageableBookTextsArray().length > 2;
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
};

Scene_PageableBook.prototype.initPageableData = function() {
    this._pageBgIndex = 0;
};

Scene_PageableBook.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindows();
    if(!isMZ) this.createButtons();
};

Scene_PageableBook.prototype.createWindows = function(){
    const widthData = $gameSystem.pageableWindowWidth(), heightData = $gameSystem.pageableWindowHeight();
    const width = typeof(widthData) === 'number' ? widthData : eval($gameSystem.pageableWindowWidth());
    const height = typeof(heightData) === 'number' ? heightData : eval($gameSystem.pageableWindowHeight());
    const screenWidth = isMZ ? Graphics.width : SceneManager._screenWidth;
    const screenHeight = isMZ ? Graphics.height : SceneManager._screenHeight;
    const x = (screenWidth - width*2)/2;
    const y = (screenHeight - height)/2;
    const marginData = $gameSystem.pageableWindowDistance();
    const margin = typeof(marginData) === 'number' ? marginData / 2 : eval($gameSystem.pageableWindowDistance()) / 2;
    this.createLeftPageWindow(x, y, width, height, margin);
    this.createRightPageWindow(x, y, width, height, margin);
    this.createTipWindow();
};

Scene_PageableBook.prototype.createLeftPageWindow = function(x, y, width, height, margin) {
    this._leftPageWindow = new Window_PageableBook_Left(x-margin, y, width, height);
    this.addWindow(this._leftPageWindow);
};

Scene_PageableBook.prototype.createRightPageWindow = function(x, y, width, height, margin) {
    this._rightPageWindow = new Window_PageableBook_Right(x+width+margin, y, width, height);
    this.addWindow(this._rightPageWindow);
};

Scene_PageableBook.prototype.createTipWindow = function() {
    this._tipWindow = new Window_PageableBook_Tip();
    this.addChild(this._tipWindow);
};

Scene_PageableBook.prototype.createButtons = function() {
    if(isMZ) Scene_MenuBase.prototype.createButtons.call(this);
    this.createPagingPrevButton();
    this.createPagingNextButton();
};

Scene_PageableBook.prototype.createPagingPrevButton = function() {
    this._prevButtonSprite = new Sprite_PagingButton('left');
    if(!isMZ) {
        this._prevButtonSprite.setClickHandler(this.goToPrevPage.bind(this));
    }
    this.addChild(this._prevButtonSprite);
};

Scene_PageableBook.prototype.createPagingNextButton = function() {
    this._nextButtonSprite = new Sprite_PagingButton('right');
    if(!isMZ) {
        this._nextButtonSprite.setClickHandler(this.goToNextPage.bind(this));
    }
    this.addChild(this._nextButtonSprite);
};

Scene_PageableBook.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.initWindowOpacity();
    this.initButtonsPlacement();
    this.refreshPageTexts();
    this.updatePagingButtonVisibility();
};

Scene_PageableBook.prototype.initWindowOpacity = function() {
    const leftWindow = this._leftPageWindow, rightWindow = this._rightPageWindow;
    const showWindowBack = $gameSystem.isShowPageableWindows();
    if(!showWindowBack){
        leftWindow.opacity = 0;
        rightWindow.opacity = 0;
    }else{
        leftWindow.opacity = 192;
        rightWindow.opacity = 192;
    }
};

Scene_PageableBook.prototype.initButtonsPlacement = function() {
    const prev = this._prevButtonSprite, next = this._nextButtonSprite;
    const screenWidth = isMZ ? Graphics.width : SceneManager._screenWidth;
    const screenHeight = isMZ ? Graphics.height : SceneManager._screenHeight;
    const margin = 20;
    prev.anchor.x = 0, prev.anchor.y = 0.5, next.anchor.x = 1, next.anchor.y = 0.5;
    prev.x = margin, next.x = screenWidth - margin;
    prev.y = screenHeight / 2, next.y = screenHeight / 2;
};

Scene_PageableBook.prototype.refreshPageTexts = function() {
    const leftWindow = this._leftPageWindow, rightWindow = this._rightPageWindow;
    const leftPage = leftWindow.pageNum(), rightPage = rightWindow.pageNum();
    const leftIndex = leftPage - 1, rightIndex = rightPage - 1;
    const textArray = $gameSystem.pageableBookTextsArray();
    const maxIndex = textArray.length - 1;
    leftWindow.setText(textArray[leftIndex]);
    rightWindow.setText(rightIndex <= maxIndex ? textArray[rightIndex] : '');
    leftWindow.refresh();
    rightWindow.refresh();
};

Scene_PageableBook.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.checkApplyPop();
    this.updatePagingButtonVisibility();
    this.updatePageTexts();
};

Scene_PageableBook.prototype.checkApplyPop = function() {
    if(Input.isTriggered('menu') || TouchInput.isCancelled()) {
        this.popScene();
    }
};

Scene_PageableBook.prototype.updatePagingButtonVisibility = function() {
    const prev = this._prevButtonSprite, next = this._nextButtonSprite;
    if(RSSD.SPB.showPagingButtons) {
        prev.visible = this.isPageFlippable(0);
        next.visible = this.isPageFlippable(1);
    } else {
        prev.visible = false;
        next.visible = false;
    }
};

Scene_PageableBook.prototype.updatePageTexts = function() {
    if(this.isToPrevPage() && this.isPageFlippable(0)) {
        this.goToPrevPage();
    }
    if(this.isToNextPage() && this.isPageFlippable(1)) {
        this.goToNextPage();
    }
};

Scene_PageableBook.prototype.goToPrevPage = function() {
    const leftWindow = this._leftPageWindow, rightWindow = this._rightPageWindow;
    const leftPage = leftWindow.pageNum(), rightPage = rightWindow.pageNum();
    const targetLeftPage = leftPage - 2 < 1 ? 1 : leftPage - 2;
    const targetRightPage = rightPage - 2 < 2 ? 2 : rightPage - 2;
    leftWindow.setPageNum(targetLeftPage);
    rightWindow.setPageNum(targetRightPage);
    if(leftPage !== targetLeftPage) {
        this.onFlip();
    }
};

Scene_PageableBook.prototype.goToNextPage = function() {
    const leftWindow = this._leftPageWindow;
    const leftPage = leftWindow.pageNum();
    const maxPage = $gameSystem.pageableBookTextsArray().length;
    const targetLeftPage = leftPage + 2 > maxPage ? maxPage : leftPage + 2;
    const isLastPageEven = (maxPage) % 2 === 0 ? true : false;
    if(isLastPageEven) {
        this.goToNextPage_LastPageEven();
    }else{
        this.goToNextPage_LastPageOdd();
    }
    if(leftPage !== targetLeftPage) {
        this.onFlip();
    }
};

Scene_PageableBook.prototype.goToNextPage_LastPageOdd = function() {
    const leftWindow = this._leftPageWindow, rightWindow = this._rightPageWindow;
    const leftPage = leftWindow.pageNum(), rightPage = rightWindow.pageNum();
    const maxPage = $gameSystem.pageableBookTextsArray().length;
    const targetLeftPage = leftPage + 2 > maxPage ? maxPage : leftPage + 2;
    const targetRightPage = rightPage + 2 > maxPage + 1 ? maxPage + 1 : rightPage + 2;
    leftWindow.setPageNum(targetLeftPage);
    rightWindow.setPageNum(targetRightPage);
};

Scene_PageableBook.prototype.goToNextPage_LastPageEven = function() {
    const leftWindow = this._leftPageWindow, rightWindow = this._rightPageWindow;
    const leftPage = leftWindow.pageNum(), rightPage = rightWindow.pageNum();
    const maxPage = $gameSystem.pageableBookTextsArray().length;
    const targetLeftPage = leftPage + 2 > maxPage + 1 ? maxPage + 1 : leftPage + 2;
    const targetRightPage = rightPage + 2 > maxPage + 2 ? maxPage + 2 : rightPage + 2;
    leftWindow.setPageNum(targetLeftPage);
    rightWindow.setPageNum(targetRightPage);
};

Scene_PageableBook.prototype.isToPrevPage = function() {
    let isSwipe = false;
    if(Imported["SumRndmDde Swipe Input"]) isSwipe = SwipeInput.isTriggered('right', RSSD.SPB.minSwipeDist);
    return Input.isTriggered('left') || isSwipe;
};

Scene_PageableBook.prototype.isToNextPage = function() {
    let isSwipe = false;
    if(Imported["SumRndmDde Swipe Input"]) isSwipe = SwipeInput.isTriggered('left', RSSD.SPB.minSwipeDist);
    return Input.isTriggered('right') || isSwipe;
};

Scene_PageableBook.prototype.isPageFlippable = function(num) {
    // num: 0 -> to prev page; 1 -> to next page
    const leftWindow = this._leftPageWindow, rightWindow = this._rightPageWindow;
    const leftPage = leftWindow.pageNum(), rightPage = rightWindow.pageNum();
    const maxPage = $gameSystem.pageableBookTextsArray().length;
    if(!num) return leftPage !== 1;
    return leftPage !== maxPage && rightPage !== maxPage;
};

Scene_PageableBook.prototype.onFlip = function() {
    this.refreshPageTexts();
    this.refreshBgForPaging();
    this.playPageFlipping();
};

Scene_PageableBook.prototype.playPageFlipping = function() {
    SoundManager.playPageFlipping();
};

Scene_PageableBook.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.createBookBackground();
    this.refreshBgForPaging();
};

Scene_PageableBook.prototype.createBookBackground = function() {
    this._pageableBookBg = new Sprite();
    const bg = $gameSystem.pageableBgName();
    const x = $gameSystem.pageableBgX(), y = $gameSystem.pageableBgY();
    const ox = typeof(x) === 'number' ? x : eval(x);
    const oy = typeof(y) === 'number' ? y : eval(y);
    if(bg) {
        this._pageableBookBg.bitmap = ImageManager.loadSystem(bg, 0);
    }
    this._pageableBookBg.anchor.x = 0.5;
    this._pageableBookBg.anchor.y = 0.5;
    const screenWidth = isMZ ? Graphics.width : SceneManager._screenWidth;
    const screenHeight = isMZ ? Graphics.height : SceneManager._screenHeight;
    this._pageableBookBg.x = screenWidth/2 + ox;
    this._pageableBookBg.y = screenHeight/2 + oy;
    this.addChild(this._pageableBookBg);
};

Scene_PageableBook.prototype.refreshBgForPaging = function() {
    const key = $gameSystem.pageableCurrentContentsKey();
    if(RSSD.SPB.books[key]) {
        const leftWindow = this._leftPageWindow;
        let pageBgIndex = 0;
        if(leftWindow) {
            const leftPage = leftWindow.pageNum();
            pageBgIndex = Math.floor(leftPage/2);
        }
        const bgName = RSSD.SPB.books[key].bgSet[pageBgIndex];
        const sprite = this._pageableBookBg;
        if(bgName) {
            sprite.bitmap = ImageManager.loadSystem(bgName);
        } else {
            const bg = $gameSystem.pageableBgName();
            if(bg) {
                sprite.bitmap = ImageManager.loadSystem(bg);
            } else {
                if(isMZ) {
                    sprite.bitmap = ImageManager._emptyBitmap;
                } else {
                    sprite.bitmap = ImageManager.loadEmptyBitmap();
                }
            }
        }
    }
};

Scene_PageableBook.prototype.terminate = function() {
    this.saveLastPage();
    Scene_MenuBase.prototype.terminate.call(this);
};

Scene_PageableBook.prototype.saveLastPage = function() {
    const leftWindow = this._leftPageWindow;
    const leftPage = leftWindow.pageNum();
    $gameSystem.setPageableStartPage(leftPage);
};

if(isMZ) {
    let __RSSD_SPB_Scene_PageableBook_createCancelButton = Scene_PageableBook.prototype.createCancelButton;
    Scene_PageableBook.prototype.createCancelButton = function() {
        __RSSD_SPB_Scene_PageableBook_createCancelButton.call(this);
        this._cancelButton.setClickHandler(this.popScene.bind(this));
    };
}

//-----------------------------------------------------------------------------
// SoundManager
//-----------------------------------------------------------------------------

SoundManager.playPageFlipping = function() {
    if($gameSystem.pageableSeName()) {
        const se = {name: $gameSystem.pageableSeName(), volume: 90, pitch: 100, pan: 0};
        AudioManager.playStaticSe(se);
    }
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//-----------------------------------------------------------------------------

let __RSSD_SPB_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    __RSSD_SPB_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === '::RSSD_SPB') {
        switch(args[0].toLowerCase()){
            case '设置并打开书籍':
                var key = args[1];
                var book;
                if(key) {
                    $gameSystem.initPageableStartPage();
                    $gameSystem.setPageableBookContents(key);
                    book = RSSD.SPB.books[key];
                }
                if(book && book.layoutKey) {
                    $gameSystem.setPageableBookLayoutData(book.layoutKey);
                }
                if(args[2]) {
                    var page = +args[2] || 1;
                    $gameSystem.setPageableStartPage(page);
                }
                SceneManager.push(Scene_PageableBook);
                break;
            case 'setbook':
            case '设置书籍':
                var key = args[1];
                var book;
                if(key) {
                    $gameSystem.initPageableStartPage();
                    $gameSystem.setPageableBookContents(key);
                    book = RSSD.SPB.books[key];
                }
                if(book && book.layoutKey) {
                    $gameSystem.setPageableBookLayoutData(book.layoutKey);
                }
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

if(isMZ) {
    PluginManager.registerCommand(RSSD.SPB.pluginName, '设置书籍', (args)=>{
        const key = args['书籍关键字'];
        if(key) {
            $gameSystem.initPageableStartPage();
            $gameSystem.setPageableBookContents(key);
        }
    });
    PluginManager.registerCommand(RSSD.SPB.pluginName, '设置并打开书籍', (args)=>{
        const key = args['书籍关键字'];
        const startPage = +args['初始页面页码'] || 1;
        if(key) {
            $gameSystem.initPageableStartPage();
            $gameSystem.setPageableBookContents(key);
            $gameSystem.setPageableStartPage(startPage);
            const book = RSSD.SPB.books[key];
            if(book && book.layoutKey) {
                $gameSystem.setPageableBookLayoutData(book.layoutKey);
            } 
            SceneManager.push(Scene_PageableBook);
        }
    });
    PluginManager.registerCommand(RSSD.SPB.pluginName, '仅打开书籍', (args)=>{
        SceneManager.push(Scene_PageableBook);
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