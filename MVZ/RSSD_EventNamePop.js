//=============================================================================
// RSSD_EventNamePop.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.0.0 - 事件头顶名称
 * @author Rose_shadows
 * @target MZ MV
 * @help 
 * === 介绍 ===
 * 
 * 使用该插件，可以在事件头顶显示事件名或自定义文字。
 * 插件会根据行走图的高度自动调整文字的纵轴位置。
 * 另外，事件头顶文字可随事件页变更而变更。
 * 
 * 该插件没有插件指令。
 * 
 * 
 * === 使用方法 ===
 * 
 * 在事件页的第一行显示注释，并将以下任意一种标签填入注释，
 * 区分大小写（NAMEPOP必须为全大写）：
 * 
 * <NAMEPOP>
 * - 在事件头顶上显示事件名。
 * 
 * <NAMEPOP:文本内容,偏移Y,字号,字体颜色>
 * - 更详细地设定事件头顶上的名称。
 *   “文本内容”：要显示在事件头顶的文本。不填则使用事件名。
 *   “偏移Y”：文字在纵轴方向的偏移。单位像素。负数时向上偏移，正数则向下。
 *   “字号”：字体大小。不填则默认为 18。
 *   “字体颜色”：字体的CSS颜色。默认为 #FFFFFF（白色）。
 * 
 * 注意，使用后一种写法时，分隔参数的英文逗号不可省略。
 * 
 * 例：
 * <NAMEPOP>
 * <NAMEPOP:我是事件名,27,22,#00FF00>
 * <NAMEPOP:,,20,>
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
 */
Imported = Imported || {};
Imported.RSSD_EventNamePop = true;

var RSSD = RSSD || {};
RSSD.ENP = {};
RSSD.ENP.pluginName = 'RSSD_EventNamePop';

RSSD.ENP.RE = /\<NAMEPOP:([^]*?)\>/;
RSSD.ENP.RE_2 = /\<NAMEPOP\>/;
RSSD.ENP.seperator = ',';
RSSD.ENP.isMZ = Utils.RPGMAKER_NAME === 'MZ';
RSSD.ENP._tempBitmap = new Bitmap(1, 1);

//=============================================================================
// Game_Event
//=============================================================================

let __ENP_Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
    __ENP_Game_Event_initMembers.call(this);
    this.initPopMembers();
};

Game_Event.prototype.initPopMembers = function() {
    this._popName = '';
    this._popOffsetY = 0;
    this._popFontSize = 18;
    this._popCssColor = '#FFFFFF';
};

let __ENP_Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    __ENP_Game_Event_setupPage.call(this);
    this.setupPopName();
};

Game_Event.prototype.setupPopName = function() {
    this.initPopMembers();
    if(this.isPopNameEnabled()) {
        const comment = this.list()[0].parameters[0];
        if(comment.match(RSSD.ENP.RE_2)) {
            this._popName = this.event().name;
        } else if(comment.match(RSSD.ENP.RE)) {
            comment.replace(RSSD.ENP.RE, this.popNameSettingsCallback.bind(this));
        }
    }
};

Game_Event.prototype.isPopNameEnabled = function() {
    return this.page() && this.list() && this.list()[0].code === 108 && 
    (this.list()[0].parameters[0].match(RSSD.ENP.RE_2) || this.list()[0].parameters[0].match(RSSD.ENP.RE));
};

Game_Event.prototype.popNameSettingsCallback = function(_match, data){
    const dataset = data.split(RSSD.ENP.seperator).map((datum)=>datum.trim());
    this._popName     = dataset[0] || this.event().name;
    this._popOffsetY  = Number(dataset[1]) || this._popOffsetY;
    this._popFontSize = Number(dataset[2]) || this._popFontSize;
    this._popCssColor = dataset[3] || this._popCssColor;
};

Game_Event.prototype.popName = function() {
    return this._popName;
};

Game_Event.prototype.popOffsetY = function() {
    return this._popOffsetY;
};

Game_Event.prototype.popFontSize = function() {
    return this._popFontSize;
};

Game_Event.prototype.popCssColor = function() {
    return this._popCssColor;
};

//=============================================================================
// Sprite_Character
//=============================================================================

let __ENP_Sprite_Character_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    __ENP_Sprite_Character_initialize.call(this, character);
    this.initPopNameStuffForEvent();
};

Sprite_Character.prototype.initPopNameStuffForEvent = function() {
    if(this._character instanceof Game_Event) {
        this._popName = '';
        this.createNamePopSprite();
        this.updateNamePop();
    }
};

Sprite_Character.prototype.createNamePopSprite = function() {
    this._namePopSprite = new Sprite();
    this.addChild(this._namePopSprite);
};

let __ENP_Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    __ENP_Sprite_Character_update.call(this);
    this.updateNamePop();
};

Sprite_Character.prototype.updateNamePop = function() {
    const character = this._character;
    if(character && character instanceof Game_Event) {
        const popName = character.popName();
        if (this._popName !== popName) {
            this._popName = popName;
            this.refreshNamePopSprite();
        }
        this.visible = true;
    } else {
        this._popName = "";
        if(this._namePopSprite) {
            this._namePopSprite.bitmap = null;
            this._namePopSprite.visible = false;
        }
    }
};

Sprite_Character.prototype.refreshNamePopSprite = function() {
    const event = this._character;
    const outlineWidth = 4;
    const outlineColor = "rgba(0, 0, 0, 0.8)";
    const m = outlineWidth;
    const h = event.popFontSize() + 2 * m;
    const name = event.popName();
    const tempBitmap = RSSD.ENP._tempBitmap;
    tempBitmap.fontSize = event.popFontSize();
    const maxWidth = tempBitmap.measureTextWidth(name) + 2 * m;
    const sprite = this._namePopSprite;
    sprite.bitmap = new Bitmap(maxWidth, h);
    sprite.bitmap.fontSize = event.popFontSize();
    sprite.bitmap.outlineColor = outlineColor;
    sprite.bitmap.outlineWidth = outlineWidth;
    sprite.bitmap.textColor = event.popCssColor();
    sprite.bitmap.drawText(name, 0, 0, maxWidth, h, 'center');
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 1;
};

let __ENP_Sprite_Character_prototype_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
Sprite_Character.prototype.setCharacterBitmap = function() {
    __ENP_Sprite_Character_prototype_setCharacterBitmap.call(this);
    this.refreshNamePopPosition();
    this.checkNamePopVisibilityByPage();
};

Sprite_Character.prototype.refreshNamePopPosition = function() {
    if(this._character instanceof Game_Event && this._namePopSprite) {
        this.bitmap.addLoadListener(()=>{
            const height = this.bitmap.height;
            const realHeight = this._isBigCharacter ? Math.floor(height / 4) : Math.floor(height / 8);
            this._namePopSprite.y = -realHeight - this._character.popOffsetY();
        });
    }
};

Sprite_Character.prototype.checkNamePopVisibilityByPage = function() {
    if(this._character instanceof Game_Event && this._namePopSprite) {
        const pageIndex = this._character.findProperPageIndex();
        this._namePopSprite.visible = pageIndex > -1 ? true : false;
    }
};