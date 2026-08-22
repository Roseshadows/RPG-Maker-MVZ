//=============================================================================
// ULDS.js
//=============================================================================
/*:
 * @target MZ MV
 * @plugindesc 无限图层显示系统 (内附详细教程 + 新功能)
 * [修改版 v1.5.0]
 * @author taroxd
 * @url https://blog.taroxd.com/mvmz-plugins/ULDS.html
 *
 * @param Default Path
 * @text 默认文件夹
 * @desc img文件夹中存储图片的的默认文件夹。
 * @default parallaxes
 *
 * @param Default Z
 * @text 默认Z坐标
 * @desc 贴图的默认z坐标。
 * @type number
 * @decimals 2
 * @min -15
 * @max 15
 * @default 0.5
 *
 * @help 
 * ！注意！
 * 这一版插件经教程编写者 Rose_shadows 编辑，添加了新的功能。
 * 如果在使用 RMMV，请确保版本为 1.6.0+。
 * 
 * 更新功能如下：
 * 
 * 1. 添加 frame 属性，允许开发人员截取一张图中的一部分用作图层的图像。
 * 2. 添加 bitmapIcon 属性，允许开发人员根据任一图标集绘制图标，
 *    并将其作为ULDS图层来控制。
 * 3. 添加 bitmapText 属性，允许开发人员绘制单行或多行文字，为其添加样式，
 *    并将其作为ULDS图层来控制。
 * 4. 添加 maskID 和 withMask 属性，允许开发人员给图层添加静态/动态蒙版。
 * 5. 修复原插件关于平铺图层（loop 属性为 true 的图层）的 Bug: 
 *    1) 将图层的 x 和 y 属性设为常数时，效果错误；
 *    2) 使用宽高小于屏幕宽高的图像时，平铺效果错误。
 * 6. 基于上述修复的 Bug，对于 loop 属性为 true 的图层，添加 viewport 属性，
 *    这样就可以控制图层在什么位置、多少宽高内平铺（相当于设定了一个视口）。
 * 
 * 详情见插件帮助的以下章节：
 * 1. 地图注释（基础）
 * 3. 例子 > 新增参数 & 使用方法
 * ※ 技巧 - 新增参数
 * 
 * 若想分别查询原版插件功能和新增功能，可以访问：
 * 原版功能：
 * https://github.com/Roseshadows/RPG-Maker-MVZ/blob/master/MVZ/ULDS/tutorial-original.md
 * 新增功能：
 * https://github.com/Roseshadows/RPG-Maker-MVZ/blob/master/MVZ/ULDS/tutorial-modified.md
 * 
 * 
 * Project1论坛教程帖+范例：
 * https://rpg.blue/thread-489480-1-1.html
 * 
 * 
 * 若要获取原版插件，请访问：
 * https://blog.taroxd.com/mvmz-plugins/ULDS.html
 * 
 * 
 * 
 * === 介绍 ===
 * 
 * 允许开发者使用简单的地图注释为MV/MZ地图添加无限的图层，以呈现更好的游戏画面。
 * 
 * ---------------------------------------------------------------------
 *
 * ULDS插件通过配置地图注释来实现图层功能。
 *
 * == 1. 地图注释（基础） ==
 *
 * 在地图注释中按以下格式书写：
 *
 * <ulds> {
 *     参数1: 值1,
 *     参数2: 值2,
 *     ......
 *     参数n: 值n
 * } </ulds>
 *
 * <ulds>和</ulds>之间要以 JSON 格式书写。请自行学习JSON格式如何书写。
 *   
 * 其中，必须有的参数是：
 *
 * "name": 图片名称。
 *
 * "x": 图片的x坐标。x坐标越大，图片越靠右。
 *      若为 纯数字 ，则表示以 屏幕左上角 为原点的图片x坐标。图片横向位置始终与
 *      屏幕保持一致。
 *      若为 this.rx(n) ，则表示以 地图左上角 为原点的图片x坐标。
 *      n 可以是以下2种情况：
 *        - 若n为 数字，则表示以 地图左上角 为原点的图片x坐标，且x坐标为 n 。
 *          例如 this.rx(48) 指的是图片会贴在地图x坐标为 48 像素的位置。
 *        - 若n为 t ，则图片将会被从左向右滚动播放。
 *          如果是 -t ，则图片会被从右向左滚动播放。
 *
 * "y": 图片的y坐标。y坐标越大，图片越靠下。
 *      若为 纯数字 ，则表示以 屏幕左上角 为原点的图片y坐标。图片纵向位置始终与
 *      屏幕保持一致。
 *      若为 this.ry(n) ，则表示以 地图左上角 为原点的图片y坐标。
 *      n 可以是以下2种情况：
 *        - 若n为 数字，则表示以 地图左上角 为原点的图片y坐标，且y坐标为 n 。
 *          例如 this.ry(48) 指的是图片会贴在地图y坐标为 48 像素的位置。
 *        - 若n为 t ，则图片将会被从上到下滚动播放。
 *          如果是 -t ，则图片会被从下向上滚动播放。
 *
 * 其他可供选择的基础参数有：
 *
 * "z": 图片的z层级。默认是0.5（可在插件参数中设置）。小数点可精确至后两位。建
 *      议大于1，且为浮点数，这样设置可以最大程度地兼容其他涉及图层的插件（如灯
 *      光插件等）。
 *      指定图片可以覆盖在z层级小于该图片z层级的所有图片之上。
 *      例如，若指定A图片z层级为6，B图片z层级为10，则A图片会覆盖所有z层级低于6
 *      的贴图，但会被B图片覆盖。
 *      RMMV中各贴图的原生层级：0 -> 远景，3 -> 玩家/事件，4 -> 星标图块。
 *
 * "path": 自定义图片所在的文件夹。文件夹必须在img文件夹里。默认是parallaxes
 *         （插件参数中可配置）
 *
 * "loop": true/false
 *         是否循环播放图片。
 *
 * 还有一些参数，需要开发人员对Sprite类, Bitmap类属性具有初步的认识：
 * （不过本人已将常用参数全部列在下方了，即便不懂脚本的小伙伴们应该也可以看懂）
 *   
 * "smooth": true/false
 *           是否应用平滑缩放。
 *
 * "blendMode": 图片的混合模式。默认是0（正常）。
 *              RMMV原生混合模式：0 -> 正常，1 -> 叠加，2 -> 正片叠底，
 *              3 -> 滤色
 *
 * "opacity": 图片的不透明度。0-255间的一个数字。默认是255（完全不透明）。
 *
 * "rotation": 图片的旋转角度（弧度）。数字 兀 在JS中是 Math.PI 。
 *
 * "scale.x": 图片被横向缩放的倍数。默认是1（不放大）。可以是小数。
 *            如果是负数，图片就会被左右镜像翻转。
 *
 * "scale.y": 图片被纵向缩放的倍数。默认是1（不放大）。可以是小数。
 *            如果是负数，图片就会被上下镜像翻转。
 *
 * "visible": true/false
 *            图片是否可见。
 * 
 * 
 * = 新增参数 & 使用方法 =（需要熟悉 Javascript 数据类型）
 * 
 * 
 * "frame": 截取一张图中的一部分用作贴图的图像。
 *          值是一个对象，包含图像截取的相关设置。
 *          现已支持 loop 属性为 true 的图层。
 *          参数格式：
 * 
 *          "frame": "{x: x坐标, y: y坐标, w: 宽度, h: 高度}"
 * 
 *          - x坐标、y坐标、宽度、高度的单位均为*像素*。
 *            (x坐标, y坐标) 是开始截取图片的位置坐标。
 *            宽度和高度指的是要截取的图像的宽高。
 * 
 *          如果小摆件的尺寸和摆放方式、源图像的大小恰好和图块组中
 *          B、C、D、E类型图块图片一模一样，
 *          那么 frame 参数的值也可以这样写：
 * 
 *          "frame": "{tx: x坐标, ty: y坐标, tw: 宽度, th: 高度}"
 * 
 *          此时：
 *          x坐标 - 截取部分最左上角的图块是从左往右数第几块图块。
 *          y坐标 - 截取部分最左上角的图块是从上往下数第几块图块。
 *          宽度 - 截取部分的宽度相当于几块图块。省略时默认为 1。
 *          高度 - 截取部分的高度相当于几块图块。省略时默认为 1。
 * 
 * 
 * "bitmapIcon": 根据所设图标集图像和图标索引绘制图标，并将其当做图层来控制。
 *               值是一个数字，作为图标索引；或者一个对象。
 *               图标集图像和所在文件夹由 "name" 和 "path" 设置。
 *               具体见 3. 例子 部分。
 *               ！注意！该属性和 frame 属性可以做出同样的效果，
 *               但该属性会根据图标集和所给参数渲染新图像（创建一个Bitmap()实例），
 *               属性 frame 的效果则相当于设定了一个视口，不会渲染新图像。
 *               参数格式：
 * 
 *               "bitmapIcon": 图标索引
 * 
 *               - 根据 RMMV / MZ 图标的默认大小，使用对应图标索引的图标。
 * 
 *               "bitmapIcon": "{i: 图标索引, w: 图标宽度, h: 图标高度, f: 图标集一行的图标数}"
 * 
 *               - 根据单个图标的宽度和高度，按一行包括的图标数分割图标集，
 *                 并使用相应索引的图标。
 *                 图标宽度和高度默认为 RMMV / MZ 图标的默认大小（32px），
 *                 图标集一行的图标数默认为 16 个。
 * 
 * 
 * "bitmapText": 绘制带样式的文本并将其当做图层来控制。
 *               值是一个对象或一个数组，包含文字内容和样式的相关设置。
 * 
 *               使用“bitmapText”属性时，会渲染新图像（创建一个Bitmap()实例）
 *               用于图层，所以无需书写“name”或“path”属性。
 *               “bitmapText”属性创建的 Bitmap() 实例的
 *               宽度等于文字总宽度，高度等于行高。
 * 
 *               使用该属性可以绘制一行或多行文本，结合“x”“y”“opacity”等属性，
 *               可以做出角色头顶文字、地图文字信息等效果。
 * 
 *               1. 单行文本
 * 
 *               对于单行文本，“bitmapText”属性的属性值是一个对象。
 *               可包括参数如下：
 *               （为方便讲解，特拆分为多行，实际用时请删掉注释，并将整条参数折叠为一行）
 * 
 *               "bitmapText": "{
 *                 text: \"这是一段文本\",    // 要显示的文本
 *                 fontSize: 26,             // 字号，此处为26像素
 *                 fontFace: \"sans-serif\", // 字体名
 *                 fontBold: true,           // 是否为粗体，此处为“是”
 *                 fontItalic: false,        // 是否为斜体，此处为“否”
 *                 textColor: \"#ffffff\", // 文字颜色，CSS格式（请自行搜索）
 *                 outlineColor: \"rgba(0, 0, 0, 0.5)\", // 文字描边颜色，同上
 *                 outlineWidth: 3,          // 文字描边宽度，此处为3像素
 *                 lineHeight: 32            // 行高，此处为32像素，默认为字号+8
 *               }"
 * 
 *               必须写“text”参数。其他参数是非必须的。
 *               每项参数的默认值参见 Bitmap 的对应默认属性值。
 * 
 *               2. 多行文本（需要一点编程思维）
 * 
 *               对于多行文本，“bitmapText”属性的属性值是一个元素均为对象的数组。
 * 
 *               "bitmapText": "[{text: \"第一行文本\"}, {text: \"这是第二行\"}, {text: \"第三行\"}]"
 * 
 *               - 添加3行文本，
 *                 第一行显示“第一行文本”，第二行显示“这是第二行”，第三行显示“第三行”。
 * 
 *               数组内每个对象的格式和单行文本对应的对象格式都相同，且包括所有参数，
 *               例如：
 * 
 *               "bitmapText": "[{text: \"文本1\"}, {text: \"文本2\", fontSize: 20, textColor: \"#ff0000\"}]"
 *               - 上述例子将显示2行文字：
 *                 第一行文字为“文本1”，字号为16像素（默认大小），颜色为#ffffff（默认值，白色），
 *                 第二行文本为“文本2”，字号为20像素，颜色为#ff0000（正红）。
 * 
 *               在书写多行文本时，每行文本对应的参数新增以下4种：
 *               （为方便讲解，特拆分为多行，实际用时请将整条参数折叠为一行，
 *               并删掉注释）
 * 
 *               "bitmapText": "[{
 *                 text: \"文本\",
 *                 maxWidth: 100,   // 最大宽度，该行文字宽度超出这个值时就会被压缩
 *                 align: \"right\",// 文本对齐方式。和 maxWidth 同用可做居中或右对齐效果
 *                 x: 0,         // 相对于上一行左端（或图像最左端）的左右方向偏移量，单位像素
 *                 y: 0          // 相对于上一行下端（或图像最上端）的上下方向偏移量，单位像素
 *               }]"
 * 
 *               例如：
 * 
 *               "bitmapText": "[{text: \"文本1\"}, {text: \"文本2\", maxWidth: 200, align: \"center\"}]"
 *    
 *               - 上述例子将显示2行文字：
 *               第一行文字为“文本1”，对齐方式为左对齐，
 *               第二行文字为“文本2”，最大宽度为 200 像素，并在这个宽度内居中对齐。
 * 
 *               ！注意！对于多行文本，各项参数是可以*跨行沿用*的。
 * 
 *               例如第一行文本设置 fontSize（字号） 为 20，
 *               且接下来的文本都没有设置 fontSize 属性，
 *               那么之后各行文字的字号将都是 20 像素，
 *               直到某行文字的 fontSize 被设为另一个值，以此类推。
 * 
 *               以之前两个例子为例进行修改（将第二行文字的参数设置到第一行文字）：
 * 
 *               "bitmapText": "[{text: \"文本1\", fontSize: 20, textColor: \"#ff0000\"}, {text: \"文本2\"}]"
 * 
 *               - 上述例子将显示2行文字：
 *               第一行文字为“文本1”，字号为20像素，颜色为#ff0000（正红），
 *               第二行文字为“文本2”，由于参数跨行沿用的特性，即使这行文字没有设置对应的参数，
 *               文字的字号也同样是20像素，颜色也同样为#ff0000（正红）。
 * 
 *               "bitmapText": "[{text: \"文本1\", maxWidth: 200, align: \"center\"}, {text: \"文本2\"}]"
 * 
 *               - 上述例子将显示2行文字：
 *               第一行文字为“文本1”，最大宽度为 200 像素，并在这个宽度内居中对齐，
 *               第二行文字为“文本2”，由于参数跨行沿用，即使这行文字没有设置对应的参数，
 *               文字的最大宽度也是 200 像素，并在这个宽度内居中对齐。
 *               ！注意！如果想将居中对齐改回为左对齐，除了将 align 设为 left，
 *               还要将 maxWidth 设为 0，否则如果左对齐的文本宽度大于 maxWidth 的值，
 *               文字就会遭到压缩。
 * 
 *               ！特别注意！由于参数跨行沿用的特性，对于 x，y 参数（横纵偏移量），如下例：
 *               （为方便讲解，特拆分为多行，实际用时请将整条参数折叠为一行）
 * 
 * "bitmapText": "[
 *   {text: \"文本1\", x: 2, y: 4}, 
 *   {text: \"文本2\"}
 *   {text: \"文本3\", x: 0}, 
 *   {text: \"文本4\", x: -4, y: 0}, 
 *   {text: \"文本5\", x: 0},
 *   {text: \"文本6\"}
 * ]"
 * 
 *               - 上述例子将显示6行文字：
 *               第一行文字相对于上一行文字左端向右偏移 2 像素，相对于上一行下端向下偏移
 *               4 像素；
 *               第二行文字相对于上一行文字左端仍向右偏移 2 像素，相对于上一行下端仍向下
 *               偏移 4 像素；
 *               第三行文字相对于上一行文字左端不偏移，相对于上一行下端仍向下偏移 4 像素；
 *               第四行文字相对于上一行文字左端向左偏移 4 像素，相对于上一行下端不偏移；
 *               第五行文字相对于上一行文字左端不偏移，相对于上一行下端也不偏移。
 *               第六行文本同上。
 * 
 *               具体效果参考如下：
 * ------
 * （4像素间隔）
 *   文本1
 * （4像素间隔）
 *     文本2
 * （4像素间隔）
 *     文本3
 * 文本4
 * 文本5
 * 文本6
 * ------
 * 
 * 
 * "maskID": 将图层设置为蒙版。值是一个字符串。
 *           通过该参数设置的蒙版属于贴图类型的蒙版，具体使用见 "withMask" 参数。
 *           参数格式：
 * 
 *           "maskID": "蒙版关键字"
 * 
 *           - 将图层设为蒙版，关键字为“蒙版关键字”，以便在 withMask 中使用。
 * 
 * 
 * "withMask": 将预设的贴图类型蒙版应用到图层上，或通过代码实时渲染蒙版。
 *             值是一个对象。
 *             注：对于 MV，由于未知原因，进入注释具有该属性的地图时，
 *             地图图块部分会明显闪烁一次。地图会在行走图显示之后才显示。
 *             建议在要使用蒙版的地图上用ULDS图层代替编辑器自带的地图绘制功能。
 *             MZ 没有该问题。
 * 
 *             ！注意！该属性必须在 webgl 模式下使用。
 *             即电脑端可用，安卓端默认不可使用（其使用的是 canvas 模式）。
 *             虽然可以使用插件，使安卓端强制使用 webgl 模式，但这么做性能会下降。
 *             
 *             蒙版是一个独立的图层，覆盖在所绑定的图层上方，
 *             负责控制所绑定的图层各部分的遮挡状态。
 *             通过检查蒙版各部分的明度（灰度），
 *             所绑定图层的对应部分的透明度会有所不同。
 *             蒙版的颜色没有意义，所以蒙版最好是一张*黑白*图片。
 *             蒙版黑色（灰度最大）的部分对应的所绑定图层部分*完全透明*，
 *             而白色（灰度最小）的部分对应的所绑定图层部分*完全不透明*。
 *             蒙版透明的部分同黑色部分。
 * 
 *             拥有该属性的图层可以使用贴图类型的蒙版或实时渲染的蒙版。
 * 
 *             1. 贴图类型的蒙版
 * 
 *             贴图类型的蒙版是从ULDS图层转化而来的，使用方法最简单灵活。
 *             设置方法见“maskID”属性。
 * 
 *             "withMask": "{id: \"蒙版关键字\"}"
 *             "withMask": "{type: \"sprite\", id: \"蒙版关键字\"}"
 * 
 *             - 以上两行注释效果一样。使用关键字为“蒙版关键字”的预设蒙版。
 *               第二行的 type 的 sprite 也可简写为 s。
 * 
 *             使用注意事项：
 *              1) 蒙版只能用于当前地图上的图层；
 *              2) 同一地图中，每个蒙版ID必须独一无二；
 *              3) 必须在使用蒙版前定义蒙版（用作蒙版的图层的注释必须写在
 *                 需要蒙版的图层之前）；
 *              4) 必须确保所有的贴图类型的蒙版都被使用了，否则漏用的蒙版
 *                 会像普通图层一样显示在地图上。
 * 
 *             ！注意！贴图类型的蒙版可以像普通图层一样设置 x、y、rotation 等参数。
 *             所以结合脚本或引用（见 2. 地图注释（高级））可以做出动态蒙版。
 * 
 *             2. 实时渲染的蒙版（需要编程基础）
 * 
 *             实时渲染的蒙版实质上是创建一个从 PIXI.Graphics() 实例
 *             转化而来的 PIXI.Sprite() 实例，并通过代码绘制图形，作为蒙版。
 * 
 *             "withMask": "{type: \"graphics\", render: \"(绘制代码)\"}"
 * 
 *             - 按照 render 中设置的代码渲染蒙版。具体见 3. 例子 部分。
 *             type 的 graphics 也可简写为 g。
 *             ！注意！在 render 参数中，mask 代表 PIXI.Graphics() 实例。
 *             PIXI.Graphics() 可用的方法参见：
 *             https://pixijs.download/v4.8.9/docs/PIXI.Graphics.html
 *             主要有：drawCircle, drawRect, drawRoundedRect, drawEllipse, drawStar
 * 
 * 
 * "viewport": 决定平铺图层的显示位置和宽高（视口的位置和尺寸）。
 *             值是一个对象。对于宽高，不建议超过屏幕尺寸。
 *             ！注意！该属性*只*适用于 loop 属性为 true 的图层。
 *             参数格式：
 * 
 *             "viewport": "{x: 显示X坐标, y: 显示Y坐标, w: 显示宽度, h: 显示高度}"
 * 
 *             ※ 直接设置 x, y 属性和在 viewport 里设置 x & y 参数的区别：
 *                由于 ULDS 平铺类型图层的 x 和 y 的功能和普通图层不同，
 *                直接设置 x, y 只会改变平铺图层左上角第一帧图像相对于整张图层的位置，
 *                设置 viewport 的 x, y 实质才相当于设置普通图层的 x 和 y 。
 *
 *
 * 
 * == 2. 地图注释（高级） ==
 *
 * 上面模块讲的是地图注释的基本格式。这一模块将会讲到该插件的一些高级用法和提供
 * 的一些引用。
 *
 * 无限图层的设置在游玩时是即时动态更新的。
 * 所以在地图注释中，可以调用$gameSwitches和$gameVariables等脚本的值来实时控制
 * 图片的状态。
 *
 * 例如：
 *
 * · 参数"visible"可以这样写：
 *   "visible": "$gameSwitches.value(2)"
 *   - 这表示由开关#2来实时控制图片的显示与隐藏。
 *
 * · 参数"rotation"可以这样写：
 *   "rotation": "$gameVariables.value(1)*Math.PI"
 *   - 这表示由变量#1来控制图片的旋转角度。变量#1最好是介于0到2的数字。
 *
 * 当然，以此类推，其他插件提供的脚本变量/开关也可以使用。
 *
 *
 * 也许各位会觉得每次写$gameVariables, $gameSwitches什么的太麻烦了，还容易写错，
 * 那么可以考虑使用插件作者提供的引用：s 和 v 来代替开关和变量。
 *
 * 仍以上面举过的两个例子为例：
 *
 * · 参数"visible"可以这样写：
 *   "visible": "s.value(2)"
 *   - 这表示由开关#2来实时控制图片的显示与隐藏。
 *
 * · 参数"rotation"可以这样写：
 *   "rotation": "v.value(1)*Math.PI"
 *   - 这表示由变量#1来控制图片的旋转角度。变量#1最好是介于0到2的数字。
 *
 * 除了 s, v 这两个引用之外，插件作者还提供了一个引用。
 * 还记得前面提到的 this.rx(t) 吗？
 * 其中的 t 也是一个引用。t 代表每帧都会自增（自己+1）的一个数字。初始值是0。
 *
 * 一个地图中可以添加多个注释。利用z层级来控制各图层的叠加情况，就可以非常灵活
 * 地制作视差地图了！
 *
 *
 *
 * == 3. 例子 ==
 *
 * <ulds> {
 *     "name": "BlueSky",
 *     "x": "this.rx(t)",
 *     "y": 50,
 *     "z": 10.5,
 *     "loop": true,
 *     "scale.x": -1,
 *     "visible": "s.value(3)"
 * } </ulds>
 *   - 在地图中使用位于img/parallaxes/中的BlueSky.png图片。
 *     该图片Z层级是10.5，在横向位置上以正常速度(1帧1像素)从左向右循环自滚动，
 *     在纵向位置上相对于屏幕的y坐标为50，图片被左右镜像反转，由开关#3控制显示
 *     和隐藏。
 *
 * <ulds> {
 *     "name": "Night",
 *     "path": "pictures",
 *     "x": "this.rx(48)",
 *     "y": "this.ry(48)",
 *     "z": 20,
 *     "visible": "s.value(5)",
 *     "scale.x": "v.value(2)",
 *     "scale.y": "v.value(2)",
 *     "blendMode": 2,
 *     "rotation": "Math.PI"
 * } </ulds>
 *   - 在地图中使用位于img/pictures/中的Night.png图片。
 *     该图片Z层级是20，相对于地图的坐标为(48, 48)，由开关#5控制显示和隐藏，
 *     横纵向缩放的倍数是变量#2的值，混合模式是正片叠底，以图片左上角为锚点，旋
 *     转180°。
 * 
 * 
 * = 例子 - 新增参数 =（需要熟悉 Javascript 数据类型）
 * 
 * 1. "frame"
 * 
 * <ulds> {
 *     "name": "Inside_C",
 *     "path": "tilesets",
 *     "x": "this.rx(100)",
 *     "y": "this.ry(50)",
 *     "z": 4,
 *     "frame": "{x: 240, y: 240, w: 48, h: 48}"
 * } </ulds>
 *    - 在地图中使用位于 img/tilesets/ 中的 Inside_C.png 图像作为源图像。
 *      以源图像左上角为原点，从 (240, 240) 处截取宽高各为 48 的图像用作要
 *      显示的部分，并将图片放在相对于地图 (100, 50) 的位置处。
 *      该图片Z层级是4。
 * 
 * <ulds> {
 *     "name": "Inside_C",
 *     "path": "tilesets",
 *     "x": "this.rx(100)",
 *     "y": "this.ry(50)",
 *     "z": 4,
 *     "frame": "{tx: 6, ty: 6}"
 * } </ulds>
 *    (*若图块宽高均为48：)
 *    - 效果同上一个注释。
 * 
 * <ulds> {
 *     "name": "Inside_C",
 *     "path": "tilesets",
 *     "x": "this.rx(100)",
 *     "y": "this.ry(50)",
 *     "z": 4,
 *     "frame": "{tx: 13, ty: 6, tw: 1, th: 2}"
 * } </ulds>
 *    (*若图块宽高均为48：)
 *    - 在地图中使用位于 img/tilesets/ 中的 Inside_C.png 图像作为源图像。
 *      以源图像左上角为原点，从 (13x48=624, 6x48=288) 处截取宽高各为 48 的图像用作要
 *      显示的部分，并将图片放在相对于地图 (100, 50) 的位置处。
 *      该图片Z层级是4。
 * 
 * 
 * 2. "bitmapIcon"
 * 
 * <ulds>{
 *     "name": "IconSet",
 *     "path": "system",
 *     "x": 0,
 *     "y": 0,
 *     "bitmapIcon": 4
 * }</ulds>
 *    - 使用 img/system/ 下的 IconSet.png 作为图标集，选择索引为 4 的图标，
 *      将其设为贴图的图片，并放在相对于屏幕 (0, 0) 的位置 (屏幕左上角)。
 *      ！注意！图标集的总宽度和格式必须和 IconSet.png 一致。
 * 
 * <ulds>{
 *     "name": "AnotherIconSet",
 *     "path": "system",
 *     "x": 0,
 *     "y": 0,
 *     "bitmapIcon": {i: 18, w: 48, h: 32, f: 5}
 * }</ulds>
 *    - 使用 img/system/ 下的 AnotherIconSet.png 作为图标集，
 *      按照每个图标宽 48 像素，高 32 像素，一行 5 个图标为规格分割图标集，
 *      并选择索引为 18 的图标，将其设为贴图的图片，
 *      并放在相对于屏幕 (0, 0) 的位置 (屏幕左上角)。
 * 
 * 
 * 3. "bitmapText"
 * 
 * <ulds>{
 *     "x": 0,
 *     "y": 0,
 *     "bitmapText": "{text: \"Hello World!\", color: \"#ff0000\", fontSize: 20}"
 * }</ulds>
 *    - 在地图上显示字号为 20 像素的正红色文字“Hello World!”，
 *      并将该文字放在相对于屏幕 (0, 0) 的位置 (屏幕左上角)。
 * 
 * <ulds>{
 *     "x": 0,
 *     "y": 0,
 *     "bitmapText": "[{text: \"Hello\", color: \"#ff0000\", align: \"center\", maxWidth: 100}, {text: \"World\", color: \"#0000ff\"}]"
 * }</ulds>
 *    - 在地图上显示两行文字，第一行为正红色的“Hello”，第二行为正蓝色的“World”，
 *      图层宽度为 100 像素（两行文字宽度均没有超过该值），
 *      两行文字均在该宽度内居中对齐，
 *      并处在相对于屏幕 (0, 0) 的位置 (屏幕左上角)。
 * 
 * 
 * 4.1 "maskID"
 * 
 * <ulds>{
 *   "name": "mask_round",
 *   "path": "system",
 *   "x": 0,
 *   "y": 0,
 *   "maskID": "mask"
 * }</ulds>
 * - 将 img/system/ 文件夹下的 mask_round 图片预设为蒙版图层，
 *   蒙版ID为 mask，并放置在相对于屏幕 (0, 0) 的位置 (屏幕左上角)。
 * 
 * 
 * 4.2 "withMask"
 * 
 * (沿用上一条设置 maskID 的图层)
 * <ulds>{
 *   "name": "info",
 *   "path": "system",
 *   "x": 0,
 *   "y": 0,
 *   "withMask": "{id: \"mask\"}"
 * }</ulds>
 * - 将ID为 mask 的预设蒙版用应用到 img/system/ 文件夹下的 info 图片，
 *   并将此图层放置在相对于屏幕 (0, 0) 的位置 (屏幕左上角)。
 * 
 * <ulds>{
 *   "name": "info",
 *   "path": "system",
 *   "x": 0,
 *   "y": 0,
 *   "withMask": "{type: \"graphics\", render: \"mask.beginFill(0xffffff);mask.drawCircle(100,200,45);mask.endFill();\"}"
 * }</ulds>
 * - 在相对于屏幕的 (100, 200) 处，渲染一个颜色为 #ffffff，
 *   半径为 45 的圆形作为蒙版，绑定到 img/system/ 文件夹下的 info 图片上。
 *   图层位于相对于屏幕 (0, 0) 的位置 (屏幕左上角)。
 * 
 * 
 * 5. "viewport"
 * 
 * <ulds>{
 *     "x": 0,
 *     "y": 0,
 *     "viewport": "{x: 30, y: 50, w: 400, h: 600}"
 * }</ulds>
 * - 平铺图层显示在相对于屏幕的 (30, 50)，实际显示宽度为 400 像素，高度为 600 像素。
 *
 *
 *
 * == 4. 设置碰撞体积 ==
 *
 * ULDS插件本身不提供碰撞体积功能。
 *
 * 默认情况，在地图的图块组 A组 中随意寻找 可通行图块 和 不可通行图块 各一种，
 * 然后根据所使用的图层直接在RMMV地图编辑器中绘制相应可通行/不可通行区域即可。
 *
 * 也可以使用本插件原作者 taroxd 大佬的 RegionPassage.js，
 * 用区域来设置相应可通行/不可通行区域。
 *
 * 如果有更为细微的需求（例如半格或不规则碰撞体积），也可以找找别的插件。
 * 例如QM+CollisionMap.js及其前置插件QMovement.js，允许你进行像素级移动，
 * 并通过检查一张图片的颜色来设定通行设置。
 * 图片白色和透明部分是可通行的地方，其他颜色不可通行。
 *
 *
 *
 * == 5. 技巧 ==
 *
 * 可以先稍微熟悉一下以上四个模块的内容，再来看这一模块。
 *
 *
 * = 关于相对地图远景 =
 *
 * 设想情景：玩家正行走在一处山峰中。山峰会随着玩家的走动而移动。
 * 表现形式：距离镜头近的山峰移动速度快。距离镜头远的山峰(背景)移动速度慢。
 * 核心问题：解决不同山峰贴图的不同移动速度问题。
 * 解决方法：在原来注释的基础上，只给各个贴图相应的注释参数"x"和"y"值乘一个PARAM
 *          即可：
 *          (比如如果贴图原先位于相对于地图的(0, 0)处，就做出如下改动：)
 *             "x": "this.rx(0)*PARAM",
 *             "y": "this.ry(0)*PARAM",
 *          其中，PARAM 是一个数字。
 *        - 对于 距离镜头近 的贴图：PARAM 最好是一个1以上的数字。
 *          数字越大，贴图随玩家移动的速度越快，所演绎的贴图与镜头的距离就越近。
 *          记得将z层级设为4以上。
 *        - 对于 距离镜头远 的贴图：PARAM 最好是一个0到1之间的小数。
 *          小数越小，贴图随玩家移动的速度越慢，所演绎的贴图与镜头的距离就越远。
 *          记得将z层级设为3以下。
 *
 *
 * = 关于动态帧图层 =
 *
 * 设想情景：玩家走到一处风景宜人的桃源乡暂且歇脚。湖泊中流水潺潺，好一幅生机
 *          勃勃之景。
 * 表现形式：用多帧图层来表现动态的湖水。
 * 核心问题：如何按照指定帧数依次显示湖水的各个图层。
 * 解决方法：假设图层相对于地图位于(144, 144)，共有3帧(湖泊_1, 湖泊_2, 湖泊_3)，
 *          则创建以以下格式书写的地图注释：
 * <ulds> {
 *     "name": "湖泊_1",
 *     "x": "this.rx(144)",
 *     "y": "this.ry(144)",
 *     "z": 1.5,
 *     "visible": "v.value(10) === 0"
 * } </ulds>
 * <ulds> {
 *     "name": "湖泊_2",
 *     "x": "this.rx(144)",
 *     "y": "this.ry(144)",
 *     "z": 1.5,
 *     "visible": "v.value(10) === 1"
 * } </ulds>
 * <ulds> {
 *     "name": "湖泊_3",
 *     "x": "this.rx(144)",
 *     "y": "this.ry(144)",
 *     "z": 1.5,
 *     "visible": "v.value(10) === 2"
 * } </ulds>
 *        在这个例子中，属性"visible"中的条件占用了变量#10。
 *        如果想替换为别的变量，直接将所有出现的"10"替换为所使用的变量ID即可。
 *        随后，在地图上创建一个并行处理的事件，内容如下：
 *            ◆等待：n 帧
 *            ◆变量操作：#0010 = 1
 *            ◆等待：n 帧
 *            ◆变量操作：#0010 = 2
 *            ◆等待：n 帧
 *            ◆变量操作：#0010 = 0
 *        n 是图层的帧间隔。
 *
 *
 * = 关于简易光源 =
 *
 * 设想情景：玩家/跟随者/事件在黑暗中行走，只有柔和的光源相伴左右，营造出一种静
 *          谧的氛围。
 *
 * 注意，这一例子主要是讲解将图片绑定在玩家/跟随者/事件上的方法和介绍图片锚点属
 * 性。
 * 这一部分所制作的光源一个地图只能使用一张，局限性非常大，如果有需求的话还是要
 * 使用插件。
 * 不过通过将图片绑定在玩家/跟随者/事件上与动态帧图层方法结合起来，可以制作类似
 * 角色行走图特效等的效果。
 *
 * 0.光源图片的配置
 *
 * 这一部分所要用到的光源图片并非一张简单的有色光源图片，而是背景为纯黑色，只有
 * 中心部分镂空作为光源的一张图片。
 * 图片的尺寸下限以游戏分辨率为准。一格默认为48像素x48像素，如果分辨率为17格x13
 * 格（816像素x624像素），那么图片的大小至少应当是(17x2-1)格x(13x2-1)格，
 * 即1584像素x1200像素。
 * 在这一情况下，考虑到图片文件的大小，可以适当缩小图片，使用时设置"scale.x"和
 * "scale.y"属性调整缩放值即可。
 *
 * 1.简易圆形光源 (烛光)
 *
 * 表现形式：以玩家/跟随者/事件为中心，周身环绕着圆形的光源。
 * 核心问题：如何将圆形光源图片绑定在玩家/跟随者/事件身上。
 * 解决方法：假设圆形光源图片名为 light.png ，为了将图片绑定到*玩家*身上，
 *          则创建以以下格式书写的地图注释：
 * <ulds> {
 *     "name": "light",
 *     "x": "this.rx(($gamePlayer._realX+1/2)*$gameMap.tileWidth())",
 *     "y": "this.ry(($gamePlayer._realY+1/2)*$gameMap.tileHeight())",
 *     "z": 5,
 *     "anchor.x": 0.5,
 *     "anchor.y": 0.5,
 *     "visible": "v.value(11) == 1"
 * } </ulds>
 *        将变量#11的值设为1时图片就会显现出来。
 *
 *        其中，"anchor.x"和"anchor.y"属性是指图片的锚点。锚点的位置将会影响图片
 *        的旋转和缩放效果。
 *        锚点在左上角时"anchor.x"和"anchor.y"分别为0, 0, 在中央时分别为
 *        0.5, 0.5,在右下角时分别为1, 1, 以此类推。
 *
 *        ※如果想将光源图片绑定到*跟随者*上的话，就将"x""y"属性中的$gamePlayer
 *        替换成$gamePlayer.followers().visibleFollowers()[INDEX]。
 *        INDEX从零开始计数，第一个跟随者（地图上玩家身后的角色）索引是0。
 *        ※如果想将光源图片绑定到*事件*上的话，就将"x""y"属性中的$gamePlayer
 *        替换成$gameMap.event(EVENT_ID)。
 *        EVENT_ID是事件ID。
 *
 * 2.简易手电筒
 *
 * 表现形式：手电筒的光源将会永远朝向玩家/跟随者/事件的正前方。
 * 核心问题：如何让手电筒光源图片的旋转角度与玩家的朝向相关联。
 * 解决方法：假设手电筒光源图片名为flashlight.png，图片中手电筒光源朝下，为了将
 *          图片绑定到*玩家*身上，则创建以以下格式书写的地图注释：
 * <ulds> {
 *     "name": "flashlight",
 *     "x": "this.rx(($gamePlayer._realX+1/2)*$gameMap.tileWidth())",
 *     "y": "this.ry(($gamePlayer._realY+1/2)*$gameMap.tileHeight())",
 *     "z": 5,
 *     "anchor.x": 0.5,
 *     "anchor.y": 0.5,
 *     "visible": "v.value(11) == 2",
 *     "rotation": "(function(){var obj = $gamePlayer;if(obj.direction()==2) return 0;if(obj.direction()==4) return 1/2*Math.PI;if(obj.direction()==8) return Math.PI;if(obj.direction()==6) return -1/2*Math.PI;})()"
 * } </ulds>
 *        将变量#11的值设为2时图片就会显现出来。
 *
 * 对于将手电筒光源图片绑定到跟随者/事件上的方法，参见 1.简易圆形光源 (烛光) 
 * 部分。
 * 记得将"rotation"属性值中的$gamePlayer也替换掉。
 * 
 * 
 * = 关于淡入淡出 =
 *
 * 1. 立即淡入淡出
 *
 * 设想情景：玩家甫一进入洋馆客房，房间墙壁和地毯上竟慢慢浮现出大块大块狰狞的暗
 *          褐色污渍。
 * 表现形式：玩家进入地图时，血迹贴图渐渐由透明变为不透明（淡入）。
 * 核心问题：如何使血迹贴图的不透明度随时间推移而增大。
 * 解决方法：假设血液贴图的名称为 blood.png ，以图片左上角为锚点，
 *          贴图位于 (123, 456)，需要在 1.5s 内显现，
 *          则创建以以下格式书写的地图注释：
 * <ulds> {
 *     "name": "blood",
 *     "x": "this.rx(123)",
 *     "y": "this.ry(456)",
 *     "z": 3.5,
 *     "opacity": "(function(){var duration=1.5;var f=duration*60;var val=255/f;if(t<f){return t*val;}else{return 255;}})()"
 * } </ulds>
 *        如果想自定义时长，可以将参数 opacity 中的变量 duration 的值从 1.5 
 *        改成别的数。
 *
 *        ※ 如果要表现玩家一进入洋馆客房，墙壁上狰狞的暗褐色污渍渐渐淡去（淡出），
 *        则创建以以下格式书写的地图注释：
 * <ulds> {
 *     "name": "blood",
 *     "x": "this.rx(123)",
 *     "y": "this.ry(456)",
 *     "z": 3.5,
 *     "opacity": "(function(){var duration=1.5;var f=duration*60;var val=255/f;if(t<f){return 255-t*val;}else{return 0;}})()"
 * } </ulds>
 *        如果想自定义时长，可以将参数 opacity 中的变量 duration 的值从 1.5 
 *        改成别的数。
 *
 * 2. 与开关相联的淡入/淡出(仅能同时实现一种)
 *
 * 设想情景：玩家最终找到了真相，在幻象消失之际，怨魂渐渐现身。
 * 表现形式：打开指定开关后，怨魂贴图渐渐由透明变为不透明（淡入）。
 * 核心问题：如何在等到指定开关打开后，相关贴图的不透明度随时间推移而增大。
 * 解决方法：假设怨魂贴图的名称为 phantom.png ，以图片左上角为锚点，
 *          贴图位于 (123, 456)，需要在 1.5s 内消失，
 *          则创建以以下格式书写的地图注释：
 * <ulds> {
 *     "name": "phantom",
 *     "x": "this.rx(123)",
 *     "y": "this.ry(456)",
 *     "z": 3.5,
 *     "opacity": "(function(){var duration=1.5;var sId_show=20;var sId_prevent=21;var vId=13;var f=duration*60;var val=255/f;if(s.value(sId_show)){if(!v.value(vId)){v.setValue(vId, t);};var rt=t-v.value(vId);if(!s.value(sId_prevent)&&(rt<f)){return rt*val;}else{return 225;};}else{return 0;};})()"
 * } </ulds>
 *       ！注意！这个注释占用了两个开关(#20, #21)和一个变量(#13)。
 *       开关#20打开时，贴图就会慢慢显现。变量#13存储开关#20打开时 t 的值，
 *       用以与之后的 t 进行比较。
 *       开关#21是为了防止每次进入地图时贴图都会显现一次。
 *       所以在执行淡入时，可以设置事件：
 *         ◆开关操作：#0020 = ON
 *         ◆等待：90帧
 *         ◆开关操作：#0021 = ON
 *       90帧 = 1.5s，即所设置的淡入时长。
 *       必须先打开用于显现图片的开关(#20)，等待所设置的淡入时长后，再打开
 *       防止贴图重新显现的开关(#21)。
 *       如果想再次执行淡入，在进入地图之前将两个开关关掉，再在进入地图后将两个
 *       开关按如上设置打开即可。
 *       如果想自定义开关ID和变量ID，可以将参数 opacity 中的 sId_show 的值从 20 
 *       改成别的开关ID用以显示贴图，
 *       sId_prevent 用于防止贴图重新显现，vId 的值从 13 改为别的变量ID。
 *       如果想自定义时长，可以将参数 opacity 中的变量 duration 的值从 1.5 改成
 *       别的数，单位秒。
 *       在事件中，记得打开两个开关之间等待的时长要和这里的值换算成帧数的最终结
 *       果相同。
 *
 *       ※ 如果要表现幻象渐渐消失，整个洋馆终于露出了它真实的样子（淡出），
 *       则创建以以下格式书写的地图注释：
 * <ulds> {
 *     "name": "phantom",
 *     "x": "this.rx(123)",
 *     "y": "this.ry(456)",
 *     "z": 3.5,
 *     "opacity": "(function(){var duration=1.5;var sId_show=20;var sId_prevent=21;var vId=13;var f=duration*60;var val=255/f;if(s.value(sId_show)){if(!v.value(vId)){v.setValue(vId, t);};var rt=t-v.value(vId);if(!s.value(sId_prevent)&&(rt<f)){return 255-rt*val;}else{return 0;};}else{return 255;};})()"
 * } </ulds>
 *       ！注意！这个注释占用了两个开关(#20, #21)和一个变量(#13)。
 *       开关#20打开时，贴图就会慢慢消失。变量#13存储开关#20打开时 t 的值，
 *       用以与之后的 t 进行比较。
 *       开关#21是为了防止每次进入地图时贴图都会消失一次。
 *       所以在执行淡出时，可以设置事件：
 *         ◆开关操作：#0020 = ON
 *         ◆等待：90帧
 *         ◆开关操作：#0021 = ON
 *       90帧 = 1.5s，即所设置的淡出时长。
 *       必须先打开用于淡出图片的开关(#20)，等待所设置的淡出时长后，再打开
 *       防止贴图重新消失的开关(#21)。
 *       如果想再次执行淡出，在进入地图之前将两个开关关掉，再在进入地图后将两个
 *       开关按如上设置打开即可。
 *       如果想自定义开关ID和变量ID，可以将参数 opacity 中的 sId_show 的值从 20 
 *       改成别的开关ID用以淡出贴图，
 *       sId_prevent 用于防止贴图重新消失，vId 的值从 13 改为别的变量ID。
 *       如果想自定义时长，可以将参数 opacity 中的变量 duration 的值从 1.5 改成
 *       别的数，单位秒。
 *       在事件中，记得打开两个开关之间等待的时长要和这里的值换算成帧数的最终结
 *       果相同。
 *
 * 3. 与开关相关联的自由淡入淡出(两种皆可实现)
 *
 * 设想情景：临近傍晚时分，街上的路灯一盏盏亮起；而至次日黎明，又会一盏盏暗去。
 * 表现形式：打开用于淡入的开关后，路灯灯光贴图渐渐由透明变为不透明；打开用于淡
 *          出的开关后，路灯灯光贴图渐渐由不透明变为透明。
 * 核心问题：如何将用于淡入的开关和用于淡出的开关同时绑定到灯光贴图上。
 * 解决方法：假设路灯灯光贴图的名称为 streetlight.png，以图片左上角为锚点，贴图
 *          位于 (123, 456)，淡入淡出时长为 1.5s，
 *          则创建以以下格式书写的地图注释：
 * <ulds> {
 *     "name": "streetlight",
 *     "x": "this.rx(123)",
 *     "y": "this.ry(456)",
 *     "z": 3.5,
 *     "opacity": "(function(){var duration=1.5;var init_opacity=0;var sId_show=4;var sId_hide=5;var sId_prevent=20;var vId_target=15;var vId_opacity=16;var f=duration*60;var val=255/f;if(!v.value(vId_opacity)){v.setValue(vId_opacity,0);}if(s.value(sId_show)){v.setValue(vId_target,255);}else if(s.value(sId_hide)){v.setValue(vId_target,0);}var result=v.value(vId_target)==255?Math.min(v.value(vId_target),v.value(vId_opacity)+val):Math.max(v.value(vId_target),v.value(vId_opacity)-val);if((s.value(sId_show)||s.value(sId_hide))&&s.value(sId_prevent)){return v.value(vId_target);}v.setValue(vId_opacity,result);return result||init_opacity;})()"
 * } </ulds>
 *          ！注意！这个注释占用了三个开关(#4, #5, #20)和两个变量(#15, #16)。
 *          变量#15存储贴图的目标不透明度(0或255)，变量#16存储贴图的当前不透明
 *          度，是动态变化的。这两个变量均只读。
 *          开关#4是淡入贴图的开关，开关#5是淡出贴图的开关，开关#21是为了防止每
 *          次进入地图时贴图都会消失一次的开关。
 *          在执行淡入时，可以设置事件：
 *              ◆开关操作：#0020 防止每次淡入淡出 = OFF
 *              ◆开关操作：#0005 开始淡出 = OFF
 *              ◆开关操作：#0004 开始淡入 = ON
 *              ◆等待：90帧
 *              ◆开关操作：#0020 防止每次淡入淡出 = ON
 *          在执行淡出时，可以设置事件：
 *              ◆开关操作：#0020 防止每次淡入淡出 = OFF
 *              ◆开关操作：#0004 开始淡入 = OFF
 *              ◆开关操作：#0005 开始淡出 = ON
 *              ◆等待：90帧
 *              ◆开关操作：#0020 防止每次淡入淡出 = ON
 *          90帧 = 1.5s，即所设置的淡入淡出时长。
 *          注意，如果淡入淡出前没有关掉防止每次淡入淡出的开关#20，那么就无法淡
 *          入淡出。
 *          在参数opacity的参数值中，sId_show 是淡入贴图的开关ID，sId_hide 是淡
 *          出贴图的开关ID，sId_prevent 是防止再次淡入淡出的开关ID，
 *          vId_target 是存储贴图的目标不透明度的变量ID，vId_opacity 是存储贴图
 *          的当前不透明度的变量ID，
 *          最开始的 duration 是淡入淡出时长，单位秒；init_opacity 是贴图的初始
 *          不透明度。
 *
 *
 * = 关于遮罩房间 =
 * 
 * 设想情景：玩家只能看到自己当前所在的房间，其他房间在玩家看来一片漆黑。
 * 表现形式：只有踩在特定ID的区域内，相应的房间贴图才会显示。
 * 核心问题：如何将特定ID的区域与房间贴图的显隐相关联。
 * 解决方法：创建以以下格式书写的地图注释：
 * <ulds> {
 *     "name": "streetlight",
 *     "x": "this.rx(123)",
 *     "y": "this.ry(456)",
 *     "z": 3.5,
 *     "opacity": "(function(){var regionId=200;if($gamePlayer.regionId()==regionId){return true;}else{return false};})()"
 * } </ulds>
 *           ！注意！这个注释占用了区域#200。
 *           当玩家踩在区域#200上时，房间贴图才会显现，否则会消失。
 *           若想自定义区域ID，请设置 regionId 的值。
 *
 *           ※如果想在某个*跟随者*踩到特定ID的区域时显示房间贴图，就将"visible"
 *           属性中的$gamePlayer
 *           替换成$gamePlayer.followers().visibleFollowers()[INDEX]。
 *           INDEX从零开始计数，第一个跟随者（地图上玩家身后的角色）索引是0。
 *           ※如果想在某个*事件*踩到特定ID的区域时显示房间贴图，就将"visible"
 *           属性中的$gamePlayer
 *           替换成$gameMap.event(EVENT_ID)。
 *           EVENT_ID是事件ID。
 * 
 * 
 * 
 * == ※ 技巧 - 新增参数 ==
 * 
 * 
 * = 关于动态帧图层 = [1张*从左到右*摆放动画帧图片, 1条注释]
 * - "frame"
 * 
 *    假设图层相对于地图位于(144, 144)，使用 Water_Animated.png 作为图像，
 *    图片中动画共有3帧，每帧间隔20帧 (1/3秒)，
 *    图片动画帧*从左到右*摆放，且要*循环播放*，
 *    则创建以以下格式书写的地图注释：
 * <ulds>{
 *     "name": "Water_Animated",
 *     "x": "this.rx(144)",
 *     "y": "this.ry(144)",
 *     "z": 1,
 *     "frame": "{y: 0, w: 96, h: 96, x: (function(){var frameCount = 3; var frameInverval = 20; var size = 96; var isCharAnime = false; var result=0;var f=Math.floor(t/frameInverval);var realFrameCount=isCharAnime?(frameCount-1)*2:frameCount;var currentFrameUnderTurn=Math.floor(f%realFrameCount);if(isCharAnime){if(currentFrameUnderTurn<frameCount){result=currentFrameUnderTurn*size;}else{result=(realFrameCount-currentFrameUnderTurn)*size;}}else{result=currentFrameUnderTurn*size;}return result;})()}"
 * }</ulds>
 *     在这个例子中，w 和 h 分别为一帧动画的宽高，
 *     frameCount 指的是图片中包含几帧动画，frameInverval 是帧间隔。
 *     size 则应该等于 w，即一帧动画的宽度。
 * 
 *     isCharAnime 控制播放顺序。
 *     当图片中的动画帧这样摆放：[1][2][3]
 *     如果将 isCharAnime 设为 false (如上例)，那么播放顺序为：
 *     > [1][2][3][1][2][3][1][2]...
 *     如果将 isCharAnime 设为 true，播放顺序则为：
 *     > [1][2][3][2][1][2][3][2][1][2]...
 * 
 *     ※ 同样的例子，
 *     如果动画图片中的动画帧是*从上到下*摆放的，
 *     那么将 frame 参数中的 y 和 x 的位置交换就可以了。
 *     即：
 *     "frame": "{x: 0, w: 96, h: 96, y: (function(){var frameCount = 3; var frameInverval = 20; var size = 96; var isCharAnime = false; var result=0;var f=Math.floor(t/frameInverval);var realFrameCount=isCharAnime?(frameCount-1)*2:frameCount;var currentFrameUnderTurn=Math.floor(f%realFrameCount);if(isCharAnime){if(currentFrameUnderTurn<frameCount){result=currentFrameUnderTurn*size;}else{result=(realFrameCount-currentFrameUnderTurn)*size;}}else{result=currentFrameUnderTurn*size;}return result;})()}"
 * 
 * 
 * = 关于角色头顶状态 - 图标 =
 * - "bitmapIcon"
 * 
 *    假设玩家可以赋予“神力加持”状态，当被赋予这个状态时，开关#5就会打开，
 *    此时头上的图标会从普通印记（图标索引#17）变为神之印记（图标索引#18），
 *    而失去这个状态时情况相反。图标来源于 img/system/ 下的 StateIcons.png。
 *    那么图层注释可以这样写：
 * <ulds>{
 *     "name": "StateIcons",
 *     "path": "system",
 *     "x": "this.rx(($gamePlayer._realX+1/2)*$gameMap.tileWidth())",
 *     "y": "this.ry(($gamePlayer._realY)*$gameMap.tileHeight())",
 *     "z": 5,
 *     "anchor.x": 0.5,
 *     "anchor.y": 1,
 *     "bitmapIcon": "(function(){var sId=5; var index1=17; var index2=18;if(s.value(sId)){return index2;}return index1;})()"
 * }</ulds>
 *    ※ 如果行走图不止一格宽（自定义宽度），就将 x 参数改为：
 *        "x": "this.rx(CHAR_WIDTH*1/2+($gamePlayer._realX)*$gameMap.tileWidth())"
 *       CHAR_WIDTH 是行走图一帧的宽度，单位像素。
 *    ※ 如果行走图不止一格高（自定义高度），就将 y 参数改为：
 *        "y": "this.ry(CHAR_HEIGHT+($gamePlayer._realY+1)*$gameMap.tileHeight())"
 *       CHAR_HEIGHT 是行走图一帧的高度，单位像素。
 * 
 *     ※ 如果想将文字绑定到玩家或跟随者头顶，用对应的代码替换 $gamePlayer 即可。
 *     详情见 “5. 技巧” 的 “关于遮罩房间” 部分。
 * 
 * 
 * = 关于角色头顶文字标识 =
 * - "bitmapText"
 * 
 *     若想在事件#15头顶显示“商人”字样，则创建以下格式的地图注释：
 * <ulds>{
 *    "x": "this.rx(($gameMap.event(15)._realX+1/2)*$gameMap.tileWidth())",
 *    "y": "this.ry(($gameMap.event(15)._realY)*$gameMap.tileHeight())",
 *    "z": 5,
 *    "anchor.x": 0.5,
 *    "anchor.y": 1,
 *    "bitmapText": {text: "商人"}
 * }</ulds>
 *     ※ 如果行走图不止一格宽（自定义宽度），就将 x 参数改为：
 *        "x": "this.rx(CHAR_WIDTH*1/2+($gameMap.event(15)._realX)*$gameMap.tileWidth())"
 *        CHAR_WIDTH 是行走图一帧的宽度，单位像素。
 *     ※ 如果行走图不止一格高（自定义高度），就将 y 参数改为：
 *        "y": "this.ry(CHAR_HEIGHT+($gameMap.event(15)._realY+1)*$gameMap.tileHeight())"
 *        CHAR_HEIGHT 是行走图一帧的高度，单位像素。
 * 
 *     ※ 如果想将文字绑定到玩家或跟随者头顶，用对应的代码替换 $gameMap.event(15) 即可。
 *     详情见 “5. 技巧” 的 “关于遮罩房间” 部分。
 * 
 * 
 * = 关于角色头顶状态 - 动态(单行)文字 =
 * - "bitmapText"
 * 
 *     假设玩家可以赋予“神力加持”状态，当被赋予这个状态时，开关#5就会打开，
 *     此时头上的文字会从“修养中”变为“神力加持中”，而失去这个状态时情况相反。
 *     那么图层注释可以这样写：
 * <ulds>{
 *     "x": "this.rx(($gamePlayer._realX+1/2)*$gameMap.tileWidth())",
 *     "y": "this.ry(($gamePlayer._realY)*$gameMap.tileHeight())",
 *     "z": 5,
 *     "anchor.x": 0.5,
 *     "anchor.y": 1,
 *     "bitmapText": "{text: (function(){var sId=5; var t_off=\"修养中\"; var t_on=\"神力加持中\";if(!s.value(sId)){return t_off;}else{return t_on;}})()}"
 * }</ulds>
 *     ※ 如果想将文字绑定到玩家或跟随者头顶，用对应的代码替换 $gamePlayer 即可。
 *     详情见 “5. 技巧” 的 “关于遮罩房间” 部分。
 * 
 * 
 * = 关于角色头顶数值 - 动态(多行)文字 =
 * - "bitmapText"
 * 
 *     假设玩家头顶要显示两行数值，一项“精神力”，另一项“净化值”，
 *     “精神力”绑定变量#6，“净化值”绑定变量#7，
 *     要在玩家头顶显示的文字排列如下：
 *     “精神力：[数值]”
 *     “净化值：[数值]”
 *     那么图层注释可以这样写：
 * <ulds> {
 *     "x": "this.rx(($gamePlayer._realX+1/2)*$gameMap.tileWidth())",
 *     "y": "this.ry(($gamePlayer._realY)*$gameMap.tileHeight())",
 *     "z": 5,
 *     "anchor.x": 0.5,
 *     "anchor.y": 1,
 *     "bitmapText": "[{text: \"精神力：\"+String(v.value(6))}, {text: \"净化值：\"+String(v.value(7))}]"
 * } </ulds>
 *     ※ 如果想将文字绑定到玩家或跟随者头顶，用对应的代码替换 $gamePlayer 即可。
 *     详情见 “5. 技巧” 的 “关于遮罩房间” 部分。
 * 
 * 
 * = 类新闻屏幕底部滚动文字 =
 * - "bitmapText" & "viewport"
 * 
 *     假设想复刻新闻底部滚动文字一样的效果，
 *     在屏幕底部循环播放“这是滚动文本”的字样，字号 22 像素，
 *     则创建以下格式的地图注释：
 * <ulds>{
 *   "bitmapText": "{text: \"这是滚动文本           \", fontSize: 22}",
 *   "x": "this.rx(-t)",
 *   "loop": true,
 *   "anchor.y": 1,
 *   "viewport": "{x: 0, y: Graphics.height, w: Graphics.width, h: 26}"
 * }</ulds>
 *     在注释中，viewport 的参数 h 应该是 bitmapText 中所设文字的行高减去字号，
 *     除以 2，再加上字号。
 *     如果没有设置行高，行高默认比字号大 8 像素，所以 h 的值设为 字号+4 即可。
 * 
 *     ！注意！每条滚动文本之间的空挡，实际是通过在文本之后手动添加空格来实现的。
 *     如果希望增加或减少每条文本之间的距离，
 *     可以添加或减少 bitmapText 的 text 参数中文字后面的空格。
 * 
 * 
 * 
 * = 关于透视效果 =
 * - "maskID" & "withMask"
 * 
 *     假设想做出透视效果，即给玩家展示一张图，鼠标移动到哪里，
 *     哪里就能显现出图片背后真正的图片信息。
 *     而现在有一张用于直接展示给玩家的图片 base.png ，
 *     一张带有信息的图片 info.png（大小和 base.png 相同），
 *     和一张用于绑定到鼠标上，决定图片信息显示范围的 mask.png，
 *     上述图片均放在 img/parallaxes/ 文件夹下，
 *     要求可透视图层整体处于相对于屏幕的 (0, 0)。
 *     那么地图注释可以这样写：
 * <ulds>{
 *   "name": "base",
 *   "x": 0,
 *   "y": 0
 * }</ulds>
 * 
 * <ulds>{
 *   "name": "mask",
 *   "x": "TouchInput._x",
 *   "y": "TouchInput._y",
 *   "maskID": "photoscope",
 *   "anchor.x": 0.5,
 *   "anchor.y": 0.5
 * }</ulds>
 * 
 * <ulds>{
 *   "name": "info",
 *   "x": 0,
 *   "y": 0,
 *   "withMask": "{id: \"photoscope\"}"
 * }</ulds>
 *     这样，mask.png 就被预设成了 ID 为 photoscope 的蒙版图层，
 *     应用到 info.png 这一图层。
 * 
 *     ！注意！实际操作方面，在 RMMZ 中，只需移动鼠标即可控制蒙版图层的位置，
 *     但对于 RMMV，则需要按住左键+移动鼠标（拖动图层）才可控制蒙版图层。
 *     如果希望 RMMV 也只需移动鼠标即可控制，可以找找插件。
 * 
 *     ！注意！作为直接展示给玩家的 base.png 图片必须处于 info.png 之下，
 *     否则 info.png 会被遮挡住。上述注释虽然都没有设置 z 属性，
 *     但 base.png 图层的设置早于 info.png，所以后者会盖在前者上面，符合条件。
 * 
 *
 *
 * === 使用条款 ===
 *
 * https://blog.taroxd.com/rgss/rules/
 *
 */


void function() {

    var assign = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                target[key] = source[key];
            }
        }
        return target;
    };

    var RE = /<ulds>([^]*?)<\/ulds>/ig;
    var parameters = PluginManager.parameters('ULDS');
    var DEFAULT_SETTINGS = {
        z: parseFloat(parameters['Default Z']),
        path: parameters['Default Path'],
        smooth: true
    };

    // Feel free to add your own helper.
    var Helper = {
        t: 0,

        // Converts a coordinate on the map to the corresponding coordinate on the screen.
        rx: function(x, scrollRate) {
            if (scrollRate == null) {
                scrollRate = $gameMap.tileWidth();
            }

            if (scrollRate === 0) {
                return x;
            } else {
                return $gameMap.adjustX(x / scrollRate) * scrollRate;
            }
        },

        ry: function(y, scrollRate) {
            if (scrollRate == null) {
                scrollRate = $gameMap.tileHeight();
            }

            if (scrollRate === 0) {
                return y;
            } else {
                return $gameMap.adjustY(y / scrollRate) * scrollRate;
            }
        },

        update: function() {
            ++this.t;
            this._updater(this.t, $gameSwitches, $gameVariables);
        },

        assignSettings: function(settings) {
            var code = '';
            for (var key in settings) {
                var value = settings[key];
                if (typeof(value) === 'string') {
                    // this.x = (formula);
                    // this.scale.x = (formula); // key is "scale.x"
                    code += 'this.' + key + ' = (' + value + ');\n';
                } else {
                    // if key is "scale.x"
                    // keys is ["scale", "x"]
                    var keys = key.split('.');
                    // set key to "x"
                    key = keys.pop();

                    var target = this;
                    keys.forEach(function(k) {
                        if (typeof(target) !== 'object') {
                            target[k] = {};
                        }
                        target = target[k];
                    });

                    target[key] = value;
                }
            }
            // You may log the code for debugging purpose.
            // console.log(code);
            this._updater = new Function('t', 's', 'v', code);
        }
    };

    // NOT a class constructor
    function ULDS(settings) {
        settings = assign({}, DEFAULT_SETTINGS, settings);
        var spriteClass = settings.loop ? ULDS.TilingSprite : ULDS.Sprite;
        var bitmap = ImageManager.loadBitmap('img/' + settings.path + '/',
            settings.name, settings.hue, settings.smooth);
        var sprite = new spriteClass(bitmap);
        
        // Modification
        // for maskID property
        if(settings.maskID) {
            $gameULDSMasks.registerSprite(settings.maskID, sprite);
        }
        delete settings.maskID;
        // Modification End

        delete settings.path;
        delete settings.name;
        delete settings.loop;
        delete settings.hue;
        delete settings.smooth;

        sprite.assignSettings(settings);

        return sprite;
    }

    ULDS.Sprite = function(bitmap) {
        Sprite.call(this, bitmap);
    };

    ULDS.Sprite.prototype = Object.create(Sprite.prototype);
    ULDS.Sprite.prototype.constructor = ULDS.Sprite;
    assign(ULDS.Sprite.prototype, Helper);

    // Modification
    ULDS.TilingSprite = function(bitmap) {
        TilingSprite.call(this, bitmap);
        bitmap.addLoadListener(function() {
            // Bug Fix: TilingSprite with bitmap, whose width and/or height are/is smaller than the game viewport width and/or height, works inproperly (the display size only equals to the bitmap size).
            this.move(0, 0, Math.max(bitmap.width, Graphics.width), Math.max(bitmap.height, Graphics.height));
            // Modification End
        }.bind(this));
    };

    ULDS.TilingSprite.prototype = Object.create(TilingSprite.prototype);
    ULDS.TilingSprite.prototype.constructor = ULDS.TilingSprite;
    assign(ULDS.TilingSprite.prototype, Helper);

    Object.defineProperties(ULDS.TilingSprite.prototype, {
        x: {
            get: function() { return -this.origin.x; },
            set: function(x) { this.origin.x = -x; }
        },
        y: {
            get: function() { return -this.origin.y; },
            set: function(y) { this.origin.y = -y; }
        }
    });

    var ct = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        ct.call(this);
        // Modification
        // initialize masks data per map
        $gameULDSMasks.clear();
        // Modification End
        $dataMap.note.replace(RE, function(_match, settings) {
            var isValid = false;
            try {
                settings = JSON.parse(settings);
                isValid = typeof(settings) === 'object';
                if (!isValid) {
                    throw 'ULDS settings should be an object';
                }
            } catch (e) {
                console.error(e);
                console.log(settings);
            }
            if (isValid) {
                this._tilemap.addChild(ULDS(settings));
            }
        }.bind(this));
    };



    //==================================================================================
    // ULDS - Utilities
    // added by Rose_shadows
    //==================================================================================

    let _RSSD_ULDS_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _RSSD_ULDS_DataManager_createGameObjects.call(this);
        $gameULDSMasks = new Game_ULDSMasks();
    };

    /**
     * Game_ULDSMasks
     * The game object class for containing ready-for-use mask sprites.
     */

    window.$gameULDSMasks = null;

    function Game_ULDSMasks() {
        this.initialize.apply(this, arguments);
    }

    Game_ULDSMasks.prototype.initialize = function() {
        this.clear();
    };

    Game_ULDSMasks.prototype.clear = function() {
        this._data_s = {};
        this._data_g = [];
    };

    Game_ULDSMasks.prototype.sprites = function() {
        return this._data_s;
    };

    Game_ULDSMasks.prototype.graphics = function() {
        return this._data_g;
    };

    Game_ULDSMasks.prototype.mask = function(id) {
        return this._data_s[id] || null;
    };

    Game_ULDSMasks.prototype.registerSprite = function(id, sprite) {
        this._data_s[id] = sprite;
    };

    Game_ULDSMasks.prototype.registerGraphics = function(graphics) { // graphics: the sprite to which the graphics instance converted.
        this._data_g.push(graphics);
    };

    //==================================================================================
    // ULDS - Patches
    // added by Rose_shadows
    //==================================================================================

    // Get more details in the definition of property "vx", "vy" and "viewport"
    ULDS.TilingSprite.prototype.move = function(x, y, width, height) {
        this.vx = x || 0;
        this.vy = y || 0;
        this._width = width || 0;
        this._height = height || 0;
    };

    //==================================================================================
    // ULDS - Custom Properties
    // added by Rose_shadows
    //==================================================================================

    // requisites
    let _RSSD_ULDS_Sprite_initialize = Sprite.prototype.initialize;
    Sprite.prototype.initialize = function(bitmap) {
        _RSSD_ULDS_Sprite_initialize.call(this, bitmap);
        this.initULDSEntendedParams();
    };
    Sprite.prototype.initULDSEntendedParams = function() {
        if(this instanceof ULDS.Sprite || this instanceof ULDS.TilingSprite) {
            this._ULDS_bitmapText = "";
            this._ULDS_bitmapIcon = null;
            this._ULDS_withMask = "";
            this._ULDS_tiling_viewport = null;
        }
    };

    // define properties
    /**
     * Properties for both sprite classes
     */
    var newProperties = {

        /**---------------------------------------------------------------------------------
         * "frame": "{tx: tile_x, ty: tile_y, tw: tile_width, th: tile_height}"
         * "frame": "{x: x, y: y, w: width, h: height}" (in pixels)
         * 
         * - Allows you to use just a part of the image source in case you have too many doodads
         *   and you don't want to use them as seperated image files.
         */
        /**
         * The property for frame.
         *
         * @type object
         * @name ULDS.Sprite#frame
         */
        "frame": {
            "get": function() {
                return this._frame;
            },
            "set": function(params) {
                const frame = this._frame;
                if(params instanceof Object) {
                    if(params.tx !== undefined) {
                        // in tileSizes
                        const tileWidth = $gameMap.tileWidth();
                        const tileHeight = $gameMap.tileHeight();
                        const x = (+params.tx - 1) * tileWidth;
                        const y = (+params.ty - 1) * tileHeight;
                        const w = (+(params.tw || "1")) * tileWidth;
                        const h = (+(params.th || "1")) * tileHeight;
                        if(frame.x !== x || frame.y !== y || frame.width !== w || frame.height !== h) {
                            this._frame.x = x;
                            this._frame.y = y;
                            this._frame.width = w;
                            this._frame.height = h;
                            this._refresh();
                        }
                    } else {
                        // in pixels
                        if(frame.x !== params.x || frame.y !== params.y || frame.width !== params.w || frame.height !== params.h) {
                            this._frame.x = +params.x;
                            this._frame.y = +params.y;
                            this._frame.width = +params.w;
                            this._frame.height = +params.h;
                            this._refresh();
                        }
                    }
                } else {
                    throw new Error('The property of ULDS Sprite "frame" should be an object.')
                }
            },
            configurable: true
        },

        /**---------------------------------------------------------------------------------
         * "bitmapIcon": iconIndex
         * "bitmapIcon": "{i: iconIndex, w: iconWidth, h: iconHeight}"
         * 
         * - Allows you to draw an icon which may be controlled as a ULDS layer.
         */
        /**
         * The property for drawing bitmap icon.
         *
         * @type number || object
         * @name ULDS.Sprite#bitmapIcon
         */
        "bitmapIcon": {
            "get": function() {
                return this._ULDS_bitmapIcon;
            },
            "set": function(icon) {
                if(icon) {
                    if(!isNaN(+icon)) {
                        const iconIndex = +icon;
                        this._ULDS_bitmapIcon = {i:iconIndex, f:16};
                        const pw = Utils.RPGMAKER_NAME === 'MZ' ? ImageManager.iconWidth : Window_Base._iconWidth;
                        const ph = Utils.RPGMAKER_NAME === 'MZ' ? ImageManager.iconHeight : Window_Base._iconHeight;
                        const sx = (iconIndex % 16) * pw;
                        const sy = Math.floor(iconIndex / 16) * ph;
                        const bitmap = new Bitmap(pw, ph);
                        bitmap.blt(this.bitmap, sx, sy, pw, ph, 0, 0);
                        this.bitmap = bitmap;
                    } else if(icon instanceof Object) {
                        const iconIndex = +icon.i;
                        icon.i = iconIndex;
                        this._ULDS_bitmapIcon = icon;
                        const pw = icon.w || (Utils.RPGMAKER_NAME === 'MZ' ? ImageManager.iconWidth : Window_Base._iconWidth);
                        const ph = icon.h || (Utils.RPGMAKER_NAME === 'MZ' ? ImageManager.iconHeight : Window_Base._iconHeight);
                        const f = icon.f || 16;
                        const sx = (iconIndex % f) * pw;
                        const sy = Math.floor(iconIndex / f) * ph;
                        const bitmap = new Bitmap(pw, ph);
                        bitmap.blt(this.bitmap, sx, sy, pw, ph, 0, 0);
                        this.bitmap = bitmap;
                    } else {
                        throw new Error('The property of ULDS Sprite "bitmapIcon" should be a number or an object.')
                    }
                }
            },
            configurable: true
        },
        
        /**---------------------------------------------------------------------------------
         * "bitmapText": "{text: TEXT, fontSize: FONTSIZE, ...}"
         * "bitmapText": "[{text: TEXT_1}, {text: TEXT_2, fontSize: FONTSIZE}, ...]"
         * 
         * - Allows you to draw single or multiple line(s) of text
         *   which may be controlled as a ULDS layer.
         */
        /**
         * The property for bitmap text.
         * 
         * @type object
         * @name ULDS.Sprite#bitmapText
         */
        "bitmapText": {
            "get": function() {
                return this._ULDS_bitmapText;
            },
            "set": function(textSettings) {
                if(!textSettings) {
                    this._ULDS_bitmapText = '';
                    return;
                }
                /**
                 * {text: text, lineHeight: lineHeight, fontSize: fontSize, fontFace: fontFace, fontBold: fontBold, ...}
                 */
                const ts = textSettings;
                if(Array.isArray(ts)) {
                    // Multi-Lines
                    const bitmap = new Bitmap(1, 1);
                    const textArray = [];
                    let bx = 0, by = 0, bw = 0, bh = 0;
                    let fontSize = 16, lineHeight = fontSize+8, maxWidth = 0, align = 'left', x = 0, y = 0;
                    ts.forEach(s => {
                        textArray.push(s.text);
                        fontSize = s.fontSize ? +s.fontSize : fontSize;
                        lineHeight = s.lineHeight ? +s.lineHeight : lineHeight;
                        maxWidth = s.maxWidth ? +s.maxWidth : maxWidth;
                        align = s.align ? s.align : align;
                        x = s.x ? +s.x : x;
                        y = s.y ? +s.y : y;
                        bitmap.fontSize = fontSize;
                        const textWidth = bitmap.measureTextWidth(s.text)+8; // for safety
                        bitmap.fontSize = 16;
                        bx += x; by += y;
                        bw = (maxWidth&&Math.max(bw, maxWidth)) || Math.max(bw, bx + textWidth);
                        bh += y + lineHeight;
                        by += lineHeight;
                    });
                    const fullText = textArray.join('\n');
                    if(fullText !== this._ULDS_bitmapText) {
                        this._ULDS_bitmapText = fullText;
                        bitmap.resize(bw, bh);
                        bx = 0, by = 0;
                        fontSize = 16, lineHeight = fontSize+8, maxWidth = 0, align = 'left', x = 0, y = 0;
                        ts.forEach(s => {
                            bitmap.fontSize = s.fontSize ? +s.fontSize : bitmap.fontSize;
                            bitmap.fontFace = s.fontFace ? s.fontFace : bitmap.fontFace;
                            bitmap.fontBold = s.fontBold ? s.fontBold === 'true' : bitmap.fontBold;
                            bitmap.fontItalic = s.fontItalic ? s.fontItalic === 'true' : bitmap.fontItalic;
                            bitmap.textColor = s.textColor ? s.textColor : bitmap.textColor;
                            bitmap.outlineColor = s.outlineColor ? s.outlineColor : bitmap.outlineColor;
                            bitmap.outlineWidth = s.outlineWidth ? +s.outlineWidth : bitmap.outlineWidth;
                            lineHeight = s.lineHeight ? +s.lineHeight : lineHeight;
                            maxWidth = s.maxWidth ? +s.maxWidth : maxWidth;
                            align = s.align ? s.align : align;
                            x = s.x ? +s.x : x;
                            y = s.y ? +s.y : y;
                            const textWidth = bitmap.measureTextWidth(s.text)+8; // for safety
                            bx += x; by += y;
                            bitmap.drawText(s.text, bx, by, maxWidth, lineHeight, align);
                            by += lineHeight;
                        });
                        if(Utils.RPGMAKER_NAME === 'MZ') this.bitmap.destroy();
                        this.bitmap = bitmap;
                        this._refresh();
                    }
                }else if(ts instanceof Object) {
                    // Single-Line
                    const text = ts.text;
                    if(text && text !== this._ULDS_bitmapText) {
                        this._ULDS_bitmapText = text;
                        const bitmap = new Bitmap(1, 1);
                        if(ts.fontSize) bitmap.fontSize = +ts.fontSize;
                        if(ts.fontFace) bitmap.fontFace = ts.fontFace;
                        if(ts.fontBold) bitmap.fontBold = ts.fontBold === 'true';
                        if(ts.fontItalic) bitmap.fontItalic = ts.fontItalic === 'true';
                        if(ts.textColor) bitmap.textColor = ts.textColor;
                        if(ts.outlineColor) bitmap.outlineColor = ts.outlineColor;
                        if(ts.outlineWidth) bitmap.outlineWidth = +ts.outlineWidth;
                        let lineHeight = bitmap.fontSize/4*5, maxWidth = 0, align = 'left', x = 0, y = 0;
                        if(ts.lineHeight) lineHeight = +ts.lineHeight;
                        const textWidth = bitmap.measureTextWidth(text)+8; // for safety
                        bitmap.resize(textWidth, lineHeight);
                        bitmap.drawText(text, x, y, maxWidth, lineHeight, align);
                        if(Utils.RPGMAKER_NAME === 'MZ') this.bitmap.destroy();
                        this.bitmap = bitmap;
                        this._refresh();
                    }
                }else{
                    throw new Error('The property of ULDS Sprite "bitmapText" should be an object or an array.')
                }
            },
            configurable: true
        },

        /**---------------------------------------------------------------------------------
         * "maskID": MASK_KEY                                                           // The layer as a mask (See function ULDS())
         * "withMask": "{type: \"sprite\", id: MASK_KEY}"                               // The layer that needs a mask sprite (Sprite())
         * "withMask": "{type: \"graphic\", render: \"mask.FUNC1();mask.FUNC2();...\"}" // The layer that needs a mask graphic (PIXI.Graphics())
         * 
         * - Allows you to register a layer as a mask and use it on another layer.
         */
        /**
         * The property for applying mask.
         * 
         * @type object
         * @name ULDS.Sprite#withMask
         */
        "withMask": {
            "get": function() {
                return this._ULDS_withMask;
            },
            "set": function(settings) {
                if(settings instanceof Object) {
                    const type = settings.type;
                    const id = settings.id;
                    const render = settings.render;
                    if(!type || type.toUpperCase() === 'SPRITE' || type.toUpperCase() === 'S') {
                        if(id && this._ULDS_withMask !== id && $gameULDSMasks.mask(id)) { // id: string
                            this._ULDS_withMask = id;
                            this.mask = $gameULDSMasks.mask(id);
                        }
                    } else if(type.toUpperCase() === 'GRAPHICS' || type.toUpperCase() === 'G') {
                        if(render && this._ULDS_withMask !== '_GRAPHICS_'+render) {
                            this._ULDS_withMask = '_GRAPHICS_'+render;
                            var mask = new PIXI.Graphics();
                            try {
                                eval(render);
                            } catch(e) {
                                console.error(e);
                                console.log(`ULDS render function Error: "${render}"`);
                            }
                            const renderTexture = PIXI.RenderTexture.create(Graphics.width,Graphics.height);
                            const renderer = Utils.RPGMAKER_NAME === 'MZ' ? Graphics.app.renderer : Graphics._renderer;
                            renderer.render(mask, renderTexture);
                            const maskSprite = new PIXI.Sprite(renderTexture);
                            const PIXI_V = +PIXI.VERSION.split('.').shift();
                            if(PIXI_V >= 5) {
                                maskSprite.position.copyFrom(mask.position);
                            } else {
                                maskSprite.position.copy(mask.position);
                            }
                            this.mask = maskSprite;
                            $gameULDSMasks.registerGraphics(maskSprite);

                            // RM game code does not use PIXI.Stage() (The Stage() defined in the core script file actually extends PIXI.Container()),
                            // so without being added to a stage, the mask graphics is interpreted as an Off-screen Mask, 
                            // which means the final image has hard edges even after the PIXI.Graphics() instance is converted to a PIXI.Sprite() instance.
                        }
                    }
                } else {
                    throw new Error('The property of ULDS Sprite "withMask" should be an object.')
                }
            }
        }
    };

    newProperties_sprite = {};

    newProperties_tilingSprite = {
        // Bug Fix: Cannot set TilingSprite's x and y properly.
        // As the ULDS.TilingSprite override the definition of x and y, the actual x and y should be copied from pixi.js.
        // The viewport x and y (aka. the actual x and y of the tiling sprite)
        "vx": {
            get: function() { return this.position.x; },
            set : function(value) { this.transform.position.x = value; }
        },
        "vy": {
            get: function() { return this.position.y },
            set: function(value) { this.transform.position.y = value; }
        },

        /**---------------------------------------------------------------------------------
         * "viewport": "{x: x, y: y, w: width, h: height}"
         * 
         * - Allows you to set tiling sprite's (actual) position and size.
         */
        "viewport": {
            get: function() {
                return this._ULDS_tiling_viewport;
            },
            set: function(params) {
                const x = params.x, y = params.y, w = params.w, h = params.h;
                if(this.vx !== x || this.vy !== y || this._width !== w || this._height !== h) {
                    this._ULDS_tiling_viewport = params;
                    this.move(x, y, w, h);
                }
            },
            configurable: true
        }
    };

    // bind properties
    Object.defineProperties(ULDS.Sprite.prototype, assign(newProperties, newProperties_sprite));
    Object.defineProperties(ULDS.TilingSprite.prototype, assign(newProperties, newProperties_tilingSprite));

}();