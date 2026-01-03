# 目录
### :notebook:插件列表：
#### MV & MZ
|插件名|插件功能|
|:----:|:-----|
|**[FormationSystem_Core.js](./MVZ/FormationSystem/FormationSystem_Core.js)**|<战斗> 战斗阵列系统的核心插件。插件引入了前后排的概念，前排会优先于后排受到技能效果的影响，即插即用。详情可看插件帮助。前后排同样影响敌人敌群，可以通过在数据库书写标签来设置。技能默认作用于前排，不过允许将技能设为仅作用于后排或作用于前后排全体的范围。|
|**[BitmapExtension.js](./MVZ/BitmapExtension.js)**|<基础> 扩展位图绘制的形状。方法有外框线、填充、渐变填充。形状目前包括：圆角矩形。|
|**[EasingExtension.js](./MVZ/EasingExtension.js)**|<基础> 扩展缓动函数（Easings），用于写在update里。详情请看插件帮助。|
|**[RSSD_AutoMessageName.js](./MVZ/RSSD_AutoMessageName.js)**|<对话> 提供根据脸图自动绘制角色名称的功能。|
|**[RSSD_CEFindIdByName.js](./MVZ/RSSD_CEFindIdByName.js)**|<工具> 使用脚本调用公共事件时可以输入公共事件名称。|
|**[RSSD_ExtraLineWrap.js](./MVZ/RSSD_ExtraLineWrap.js)**|<界面> 使用标签可以设置三行或三行以上的帮助窗口文本。功能和用法等同于 YEP_MessageCore.js 里的 <LINEBREAK> 。|
|**[RSSD_HiddenParams.js](./MVZ/RSSD_HiddenParams.js)**|<玩法> 通过标签为角色/敌人自定义额外的隐藏属性。属性可绑定在角色、敌人、职业、武器、防具、物品、技能、状态共8种数据库类型，MV工程通过YEP_StatusMenuCore.js还可以将隐藏属性显示出来。|
|**[RSSD_HP_Addon_ParamGrowth.js](./MVZ/RSSD_HP_Addon_ParamGrowth.js)**|<玩法> [RSSD_HiddenParams.js](./MVZ/RSSD_HiddenParams.js) 的扩展插件。允许开发者设置成长类型，将隐藏属性设为可成长的属性。|
|**[RSSD_MessageWindowSound.js](./MVZ/RSSD_MessageWindowSound.js)**|<对话> 切换对话时播放一次指定的音效。|
|**[RSSD_MobilePhone.js](./MV/RSSD_MobilePhone.js)**|<玩法> 创造一个智能手机样式的菜单。玩家可以点击APP以进入界面、触发公共事件或运行自定义代码。|
|**[RSSD_SimplePageableBook.js](./MVZ/RSSD_SimplePageableBook.js)**|<玩法> 创建一个可翻页的书籍界面。不仅可以提供了纯文本和代码两种方式书写内容，设置翻页音效，也能从多方面控制书籍的样式。安装 [SRD_SwipeInput.js](http://sumrndm.site/swipe-input/) 作为前置插件后，还可以用鼠标/手指滑动翻页。|
|**[RSSD_SimpleScrollableInfoBoard.js](./MVZ/RSSD_SimpleScrollableInfoBoard.js)**|<玩法> 事件指令【显示滚动文本】的扩展插件。特定开关打开后，滚动文本窗口可用作一个显示长文章的可滚动的信息板。你可以使用鼠标滚轮或上下键来滚动信息，用常规方法关闭信息板。插件还允许你通过设置文本滚动速度来决定信息板背景类型是窗口还是透明。|
|**[RSSD_SSIB_Addon_TouchScroll.js](./MVZ/RSSD_SSIB_Addon_TouchScroll.js)**|<玩法> [RSSD_SimpleScrollableInfoBoard.js](./MVZ/RSSD_SimpleScrollableInfoBoard.js) 的扩展插件。安装后，长信息板可以通过手指或鼠标滑动来滚动。|
|**[RSSD_SwapTitleBackground.js](./MVZ/RSSD_SwapTitleBackground.js)**|<界面> 允许你在标题界面中动态切换多个背景图片。|
|**[RSSD_VarSwiFindIdByName.js](./MVZ/RSSD_VarSwiFindIdByName.js)**|<工具> 使用脚本获取或控制开关/变量时可以输入开关/变量名称。|
|**[TAA_BookMenu_UnreadBookTitle.js](./MVZ/TAA_BookMenu_UnreadBookTitle.js)**|<玩法> [TAA_BookMenu.js](https://taaspider.itch.io) 的扩展插件。在未习得书籍时，书籍菜单列表中待阅书籍的名字和内容会隐藏。可以自定义书籍未习得时显示的名称和内容文本。|
#### 限定 MZ
|插件名|插件功能|
|:----:|:-----|
|**[RSSD_MultiPriorityFade.js](./MZ/RSSD_MultiPriorityFade.js)**|<屏幕效果> 可以选择淡入淡出的层级。默认情况下，淡入淡出只影响背景层 + 图片层（不包括对话框），使用这个插件，不仅可以单独控制这两层，还可以控制整个屏幕层（包括对话框）的淡入淡出效果。|
|**[RSSD_ReliabilityGauge.js](./MZ/RSSD_ReliabilityGauge.js)**|<玩法> 复刻逆转裁判123样式的可信度血条（右上角每次回答/举证时出现的条）。血条可以用控制字符或插件指令来控制，减少可信度时还会演出预先设好的动画。具体可看插件帮助。插件中使用的 Window_RpGauge.png 参见[这里](./img/RSSD_ReliabilityGauge/Window_RpGauge.png)。|
|**[RSSD_QoL_RoundedItemBackRect.js](./MZ/RSSD_QoL_RoundedItemBackRect.js)**|<QoL> 将带棱角的矩形指令选项背景更换为圆角矩形。|
|**[RSSD_SlicingUI.js](./MZ/RSSD_SlicingUI.js)**|<界面> 允许你对窗口皮肤、选择光标、对话暂停光标使用九宫格切片（9-slicing）格式的UI图像。对于示例图，去看 [img/RSSD_SlicingUI/](./img/RSSD_SlicingUI/) 。另外还扩展了Bitmap的方法，提供绘制九宫格、横/纵三宫格格式UI图像的功能。|
#### 限定 MV
|插件名|插件功能|
|:----:|:-----|
|**[RSSD_DisableMapAndMessageInput.js](./MV/RSSD_DisableMapAndMessageInput.js)**|<工具> 特定开关打开时，禁用地图玩家移动/消息处理。主要用于图片事件菜单。注意，一定要慎用，否则游戏可能会卡住。|
|**[RSSD_HideDestinationSprite.js](./MV/RSSD_HideDestinationSprite.js)**|<地图> 用一个开关来控制目的地光标的显示与隐藏。开关打开，光标隐藏。熟悉了一下update的用法。|
|**[RSSD_VXFacesets.js](./MV/RSSD_VXFacesets.js)**|<对话> 允许你调整脸图的大小和在窗口中的偏移位置。|
|**[TMRingCommand_Upgraded.js](./MV/TMRingCommand_Upgraded.js)**|<玩法> 在tomoaky的 [TMRingCommand.js](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMRingCommand.js) 插件的基础上修改的新一版的插件。原来的插件具有局限性，指令是固定的。但在修改版的插件中，可以用开关来控制各个指令的显示与隐藏；可以添加最多十个公共事件到轮盘中；轮盘不仅能绑定到玩家身上，还可以绑定在屏幕上；在外观设置这一栏里添加了一些更细节的设置，等等。|
|**[TMXpCharacter_Patch.js](./MV/TMXpCharacter_Patch.js)**|<行走图> [TMXpCharacter.js](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMXpCharacter.js) 的补丁插件。修复了以下问题：1. XP行走图初始帧显示了错误的图像；2. 在窗口中不正确绘制了XP行走图。|
|**[UditaUI.js](./MV/UditaUI.js)**|<界面> 允许你在 RMMV 中使用 Wolf RPG Editor 格式的窗口皮肤、对话暂停光标和选择光标。对于示例图，去看 [img/UditaUI](./img/UditaUI/) 。|
### :notebook:使用条款：
- MIT 协议
