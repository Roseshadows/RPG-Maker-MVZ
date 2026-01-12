/*:
 * @plugindesc YEP消息核心 - CJK字符自动换行补丁
 * @author Rose_shadows
 * @help
 * 修复 YEP_MessageCore.js 无法对CJK字符自动换行的错误。
 * 
 * 将该插件放在消息核心插件之后。
 */
if(Imported.YEP_MessageCore) {

    let __Window_Base_processNormalCharacter = Window_Base.prototype.processNormalCharacter;
    Window_Base.prototype.processNormalCharacter = function(textState) {
        if (this.checkWordWrap(textState)) {
            const hasCJK = /[\u4E00-\u9FFF\u3400-\u4DBF]/;
            if(hasCJK.test(textState.text)) textState.index--;
            return this.processNewLine(textState);
        }
        __Window_Base_processNormalCharacter.call(this, textState);
    };

    let __Window_Base_checkWordWrap = Window_Base.prototype.checkWordWrap;
    Window_Base.prototype.checkWordWrap = function(textState) {
        if (!textState) return false;
        if (!this._wordWrap) return false;
        const res = __Window_Base_checkWordWrap.call(this, textState);
        const hasCJK = /[\u4E00-\u9FFF\u3400-\u4DBF]/;
        if(!hasCJK.test(textState.text)) return res;
        const word = textState.text.substring(textState.index, textState.index + 1);
        const size = this.textWidthExCheck(word);
        return (size + textState.x > this.wordwrapWidth());
    };

}