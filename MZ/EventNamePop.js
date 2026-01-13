/*:
 * @plugindesc Namepop Ver 1.10 NPC名称显示（MZ特供版）
 * @author Morpho(dongdongDJH)
 * @target MZ
 * @help 
 * （该版插件由Rose_shadows修改）
 * 
 * 在地图事件注释栏内填入 <NAMEPOP> 或 <NAMEPOP:高度修正值,字号,字体颜色>
 * 高度修正值单位为像素，字体颜色为css颜色。
 * 使用后一种写法时，分隔参数的英文逗号不可省略。
 * 例：
 * <NAMEPOP>
 * <NAMEPOP:27,18,#00FF00>
 * <NAMEPOP:,20,>
 */
(function() {
    const RE = /\<NAMEPOP:([^]*?)\>/;
    const RE_2 = /\<NAMEPOP\>/;

    let _Sprite_Character_prototype_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function(character) {
        _Sprite_Character_prototype_initialize.call(this, character);
        this._tempCharacter = character;
        if (character instanceof Game_Event) {
            const note = character.event().note;
            const y = 0, fs = 18, c = "#FFFFFF";
            if(RE_2.test(note)) {
                this._namepopY = y;
                this._fontSize = fs;
                this._BYcolor  = c;
                this.createNamepopSet();
            } else {
                note.replace(RE, (function(_match, data){
                    const dataset = data.split(',').map((datum)=> datum.trim());
                    this._namepopY = Number(dataset[0]) || y;
                    this._fontSize = Number(dataset[1]) || fs;
                    this._BYcolor  = dataset[2] || c;
                    this.createNamepopSet();
                }).bind(this))
            }
        }
    };

    Sprite_Character.prototype.createNamepopSet = function() {
        // Config Area
        const outlineWidth = 4;
        const outlineColor = "rgba(0, 0, 0, 0.8)";
        // Config Area End
        const m = outlineWidth;
        const h = this._fontSize + 2 * m;
        const name = this._tempCharacter.event().name;
        const tempBitmap = new Bitmap(1, 1);
        tempBitmap.fontSize = h;
        const maxWidth = tempBitmap.measureTextWidth(name) + 2 * m;
        this._namepopSprite = new Sprite();
        this._namepopSprite.bitmap = new Bitmap(maxWidth, h);
        this._namepopSprite.bitmap.fontSize = this._fontSize;
        this._namepopSprite.bitmap.outlineColor = outlineColor;
        this._namepopSprite.bitmap.outlineWidth = outlineWidth;
        this._namepopSprite.bitmap.textColor = this._BYcolor;
        this._namepopSprite.bitmap.drawText(name, 0, 0, maxWidth, h, 'center');
        this._namepopSprite.anchor.x = 0.5;
        this._namepopSprite.anchor.y = 1;
        this.addChild(this._namepopSprite);
        tempBitmap.destroy();
    };

    // ---- 新增跟随事件显示 ----
    let _Sprite_Character_prototype_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
    Sprite_Character.prototype.setCharacterBitmap = function() {
        _Sprite_Character_prototype_setCharacterBitmap.call(this);
        if(this._tempCharacter instanceof Game_Event && this._namepopSprite) {
            this.bitmap.addLoadListener(()=>{
                const height = this.bitmap.height;
                const realHeight = this._isBigCharacter ? Math.floor(height / 4) : Math.floor(height / 8);
                this._namepopSprite.y = -realHeight - this._namepopY;
            });
            this._BYconditions = this._tempCharacter.findProperPageIndex();
            if(this._BYconditions >= 0){
                this._namepopSprite.visible = true;
            }else{
                this._namepopSprite.visible = false;
            }
        }
    };
}());