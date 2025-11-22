//=============================================================================
// RSSD_MessageWindowSound.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.0.1 - 自定义隐藏属性 - 扩展 - 可成长属性
 * @author Rose_shadows
 * @target MV MZ
 * @help
 * === 介绍 ===
 * 
 * 该插件为 RSSD_HiddenParams.js 的扩展插件，旨在允许开发者设置可随等级增长的隐
 * 藏属性。
 * 该插件只作用于角色，因为原生RMMV中敌人没有等级概念。
 * 
 * !注意! 当前版本不兼容版本 1.1.2 及以下版本的 RSSD_HiddenParams.js 插件。
 * 
 * 
 * === 特性 ===
 * 
 * 1. 可以独立设置多个成长类型的详细设置，以便用于不同角色的不同属性。
 * 2. 除了设置每级固定增长的属性值和公式之外，也可以手动设置每个等级增长的属性
 *    值。
 * 
 * 
 * === 使用方法 - 插件参数 ===
 * 
 * 1. 首先，在插件参数列表中的“成长类型列表”中设置成长类型。
 *    相关参数如下：
 * 
 * “成长类型标识符”
 * - 每种成长类型的标识符。必须是独一无二的。
 * 
 * “默认每级变更属性值”
 * - 每级变更的属性值。默认是0.
 * 
 * “成长公式”
 * - 用于计算每一级所得的属性值。提供了一些预设的变量：
 *    base - 1级的属性值。“成长参数值列表”的第1项参数。
 *    flat - “默认每级变更属性值”中设置的值。
 *    level - 角色当前等级。
 *    actor - 角色对象。
 *   例如：
 *    base + (level - 1) * flat
 *    如果 base 为 0，flat 为 5，
 *    当5级时，等级附加的属性值为 0+(5-1)*5 = 20，
 *    当24级时，等级附加的属性值为 0+(24-1)*5 = 115。
 *   !注意!如果同时设置了“成长公式”和“成长参数值列表”，优先使用“成长公式”作为
 *   计算属性值的方式。
 *   如果这一项设为空，则会采用将“默认每级变更属性值”据等级累加起来的计算方式。
 * 
 * “成长参数值列表” 
 * - 详细设置每一级变更的属性值。
 *   在列表中，第1项参数是指角色1级时的属性值，所以必须保留，不能删除。
 *   如果设置了第2项，那么就会将所有设置在列表中的参数全部加起来，求出总和作为
 *   角色的属性成长值。
 *   也就是说，每一项的参数值都代表从一个等级升到下一个等级时会变更的属性值。
 *   例如，第1项是指从等级0升到等级1时变更的属性值。等级0时属性值为0，所以第1项
 *   参数值就相当于等级1时的属性值。
 *   第2项是指从等级1升到等级2时变更的属性值。所以角色为等级2时，所变更的属性值
 *   总值就等于第1项+第2项的值。
 *   如果没有设置对应等级所需变更的属性值，则使用“默认每级变更属性值”。
 * 
 * 2. 其次，需要在“可成长属性列表”中注册可成长属性的相关设置。
 * 
 * ！注意！在列表中，必须将所有可能成为可成长属性的属性都一并注册进去。
 * 
 * 如果你希望在游戏中途 *将某个不可成长属性变更为可成长属性* ，
 * 可以先在“成长类型列表”中新注册一个成长类型，将“成长参数值列表”的第1项和“默认
 * 每级变更属性值”均设为0，
 * 然后在“可成长属性列表”中注册这个属性的相关设置，将“默认成长类型标识符”设为刚
 * 刚设置的成长类型的标识符，
 * 然后在游戏中使用插件指令或脚本更改成长类型即可。
 * 
 * 
 * === 使用方法 - 数据库标签 ===
 * 
 * 该插件同样可以通过在数据库中书写标签来设置可成长属性的成长类型。
 * 
 * 角色、职业标签：
 * <p_[SHORT_NAME]_growth: [GROWTH_TYPE_FLAG]>
 * - 设置该角色/职业的特定属性的成长类型。必须先在插件参数中设置好属性，才能使
 *   标签起作用。
 *   [SHORT_NAME] - 属性短名。
 *   [GROWTH_TYPE_FLAG] - 成长类型标识符。
 * 
 * 例如，如果一个属性的短名为np，使用的成长类型的标识符为growth1，则如下书写：
 * <p_np_growth: growth1>
 * 
 * 同样，“p_”是标签名的前缀，和 RSSD_HiddenParams.js 中的设定保持一致。
 * “_growth”是标签的后缀，如果有需要的话也可以在插件参数列表中更改。
 * 
 * 
 * === 插件指令（MV） ===
 * 
 * ::RSSD_HP_PG change actor[ACTOR_ID] param[SHORT_NAME] growth[FLAG]
 * - 更改角色#ACTOR_ID下，短名为 SHORT_NAME 的属性的成长方式，方式标识符为FLAG。
 *   只对已注册过的可成长属性起作用。
 * 
 * ::RSSD_HP_PG change class[CLASS_ID] param[SHORT_NAME] growth[FLAG]
 * - 更改职业为职业#CLASS_ID的所有角色下，短名为 SHORT_NAME 的属性的成长方式，
 *   方式标识符为 FLAG。
 *   只对已注册过的可成长属性起作用。
 * 
 * ::RSSD_HP_PG change all_actors param[SHORT_NAME] growth[FLAG]
 * - 更改所有角色下，短名为 SHORT_NAME 的属性的成长方式，方式标识符为 FLAG
 *   只对已注册过的可成长属性起作用。
 * 
 * ::RSSD_HP_PG remove param[SHORT_NAME]
 * - 使短名为 SHORT_NAME 的属性成为不可成长的属性。
 *   只对已注册过的可成长属性起作用。
 * 
 * 
 * === 脚本 ===
 * 
 * 提前说明，以下出现的 character 是 $gameActors.actor(actorId)
 * 或 $gameParty.members()[memberIndex] 对象
 * 
 * character.levelCusparam(SHORT_NAME);
 * - 获取根据等级成长的属性短名为 SHORT_NAME 的属性值。
 * 
 * character.cusparamGrowthType(SHORT_NAME);
 * - 获取属性短名为 SHORT_NAME 的属性的成长类型的标识符 FLAG。
 *   如果该属性不属于可成长属性（没有在插件中注册），则返回 null 。
 * 
 * character.changeCusparamGrowthType(SHORT_NAME, FLAG);
 * - 更改属性短名为 SHORT_NAME 的属性的成长类型，类型的标识符为 FLAG 。
 *   如果想让某个属性不再属于可成长属性，请将 FLAG 设为 null 。
 *   只对已注册过的可成长属性起作用。
 * 
 * $gameActors.changeCusparamGrowthTypeForAll(SHORT_NAME, FLAG);
 * - 将所有角色的短名为 SHORT_NAME 属性的成长类型统一改为 FLAG 类型。
 *   如果想让某个属性不再属于可成长属性，请将 FLAG 设为 null 。
 *   只对已注册过的可成长属性起作用。
 * 
 * 
 * === 兼容性 ===
 * 
 * 请将该插件放到 RSSD_HiddenParams.js 之下。
 * !注意! 当前版本不兼容版本 1.1.2 及以下版本的  RSSD_HiddenParams.js 插件。
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT协议
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 * 1.0.1 - 修改部分代码以兼容新版（1.1.5及以上）前置插件。
 * 
 * @command Change Growth Type
 * @text 更改属性成长类型
 * @desc 更改某角色/某职业的属性的成长类型。
 * 
 * @arg Actor ID
 * @text 角色ID
 * @desc 角色ID。
 * @default 
 * 
 * @arg Class ID
 * @text 职业ID
 * @desc 职业ID。两项都填的话，优先使用角色ID。
 * @default 
 * 
 * @arg Param Short Name
 * @text 属性短名
 * @desc 要更改成长类型的属性短名。必须已经在插件参数中注册好设置才能更改。
 * @default 
 * 
 * @arg Growth Flag
 * @text 成长类型标识符
 * @desc 成长类型的标识符。
 * @default 
 * 
 * @command Change Growth Type For All
 * @text 统一更改属性成长类型
 * @desc 更改所有角色下特定属性的成长方式。
 * 
 * @arg Param Short Name
 * @text 属性短名
 * @desc 要更改成长类型的属性短名。必须已经在插件参数中注册好设置才能更改。
 * @default 
 * 
 * @arg Growth Flag
 * @text 成长类型标识符
 * @desc 成长类型的标识符。
 * @default 
 * 
 * @command Remove Growth Type
 * @text 移除属性成长类型
 * @desc 将可成长属性变为不可成长属性。
 * 
 * @arg Param Short Name
 * @text 属性短名
 * @desc 要更改成长类型的属性短名。必须已经在插件参数中注册好设置才能移除。
 * @default 
 * 
 * @param Tag Suffix
 * @text 标签后缀
 * @desc 写在数据库备注栏中的标签后缀。
 * @default _growth
 * 
 * @param Growth Type List
 * @text 成长类型列表
 * @type struct<growthtype>[]
 * @desc 存放成长类型各项设置的列表。
 * @default []
 * 
 * @param Global Growth List
 * @text 可成长属性列表
 * @type struct<globalgrowth>[]
 * @desc 作用于所有角色的可成长属性的列表。
 * @default []
 */
/*~struct~growthtype:
 * @param Notes
 * @text 备注
 * @desc 该成长类型的备注。对插件没有任何作用。
 * @default 成长类型1
 * 
 * @param Flag
 * @text 成长类型标识符
 * @desc 该成长类型的标识符。相对于其他成长类型标识符，必须是独一无二的。
 * @default growth1
 * 
 * @param Default Flat Growth per Level
 * @text 默认每级变更属性值
 * @type number
 * @decimals 4
 * @desc 默认每级增长的属性值。当成长参数列表值只有一个参数或某等级的参数未设定时会使用。
 * @default 0
 * 
 * @param Formula
 * @text 成长公式
 * @desc 该属性值的成长公式。相较于“成长参数值列表”，优先使用这一项设置。具体见帮助文档。
 * @default 
 * 
 * @param Growth Set
 * @text 成长参数值列表
 * @type number[]
 * @decimals 4
 * @desc 详细设置每级成长的参数值。具体见帮助文档。第一个参数为1级时的属性值，默认为0。
 * @default ["0"]
 */
/*~struct~globalgrowth:
 * @param Short Name
 * @text 属性短名
 * @desc 可成长属性的属性短名。必须填写。
 * @default 
 * 
 * @param Flag
 * @text 默认成长类型标识符
 * @desc 用于可成长属性的默认成长类型。必须填写。在游戏中可用插件指令或脚本更改。
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.RSSD_HP_PG = true;

var RSSD = RSSD || {};
RSSD.HP_PG = {};
RSSD.HP_PG.pluginName = 'RSSD_HP_Addon_ParamGrowth';

(function(_){
    _.parameters = PluginManager.parameters(RSSD.HP_PG.pluginName);
    let temp_arr = JSON.parse(_.parameters['Growth Type List']) || [];
    _.growthList = {};
    temp_arr.forEach((type)=>{
        const growth = JSON.parse(type);
        const obj = {};
        const flag = growth['Flag'];
        obj.defaultFlat = +growth['Default Flat Growth per Level'] || 0;
        obj.formula = growth['Formula'] || '';
        obj.group = JSON.parse(growth['Growth Set']).map((item)=>{return +item});
        _.growthList[flag] = obj;
    });
    var temp_arr2 = JSON.parse(_.parameters['Global Growth List']) || [];
    _.globalGrowthParams = {};
    temp_arr2.forEach((config)=>{
        const configs = JSON.parse(config);
        const s_name = configs['Short Name'];
        const flag = configs['Flag'];
        if(s_name && flag) _.globalGrowthParams[s_name] = flag;
    });
    _.suffix = _.parameters['Tag Suffix'] || '_growth';

    if(Imported.RSSD_HP) {
        _.prefix = RSSD.HP.prefix;
        _.floatAcc = RSSD.HP.floatAcc;
        _.paramList = JsonEx.makeDeepCopy(RSSD.HP.paramList);

        _.parseForFloat = function(num, acc=_.floatAcc) {
            let accStr = '1';
            for(let i = 0; i < acc; i++) {
                accStr += '0';
            };
            const accNum = Number(accStr);
            return +(Math.floor(num * accNum) / accNum).toFixed(acc);
        };

        //=============================================================================
        // Game_Battler
        //=============================================================================

        var __Game_Battler_refreshCusparamSettings = Game_Battler.prototype.refreshCusparamSettings;
        Game_Battler.prototype.refreshCusparamSettings = function() {
            __Game_Battler_refreshCusparamSettings.call(this);
            this.refreshCusparamLevelSettings();
        };

        Game_Battler.prototype.refreshCusparamLevelSettings = function() {
            this._cusparamsGrowthType = {};
            const keys = Object.keys(_.paramList);
            for(let i = 0; i < keys.length; i++) {
                const s_name = keys[i];
                this._cusparamSettings[s_name]._level = 0;
            };
            this.refreshCusparamsGrowthType();
        };

        Game_Battler.prototype.refreshCusparamsGrowthType = function() {
            const keys = Object.keys(_.globalGrowthParams);
            for(let i = 0; i < keys.length; i++) {
                const s_name = keys[i];
                const flag = _.globalGrowthParams[s_name];
                this._cusparamsGrowthType[s_name] = flag;
            };
        };

        Game_Battler.prototype.cusparamDatabaseGrowthType = function(s_name) {
            const obj = this.isActor() ? this.actor() : this.enemy();
            return obj.meta[_.prefix+s_name+_.suffix] === undefined ? '' : obj.meta[_.prefix+s_name+_.suffix].trim();
        };

        Game_Battler.prototype.cusparamGrowthType = function(s_name) {
            if(Object.keys(_.globalGrowthParams).contains(s_name)) {
                return this._cusparamsGrowthType[s_name];
            }
            return null;
        };

        Game_Battler.prototype.cusparamGrowthForLevel = function(s_name, level) {
            if(Object.keys(_.globalGrowthParams).contains(s_name)) {
                const flag = this.cusparamGrowthType(s_name);
                const growth = _.growthList[flag];
                if(growth.group[level - 1] !== undefined) {
                    return growth.group[level - 1];
                } else {
                    return growth.defaultFlat || 0;
                }
            }
            return 0;
        };

        Game_Battler.prototype.cusparamGrowthFormula = function(s_name) {
            if(Object.keys(_.globalGrowthParams).contains(s_name)) {
                const flag = this.cusparamGrowthType(s_name);
                const growth = _.growthList[flag];
                return growth.formula || '';
            }
            return '';
        };

        Game_Battler.prototype.levelCusparam = function(s_name) {
            const cusparam = this._cusparamSettings[s_name];
            return _.parseForFloat(cusparam._level);
        };

        //=============================================================================
        // Game_Actor
        //=============================================================================

        var __Game_Actor_setup = Game_Actor.prototype.setup;
        Game_Actor.prototype.setup = function(actorId) {
            __Game_Actor_setup.call(this, actorId);
            this.refreshCusparamsPrivateGrowthType();
            this.refreshCusparamsOnLevelChange();
        };

        Game_Actor.prototype.refreshCusparamsPrivateGrowthType = function() {
            const keys = Object.keys(_.paramList);
            for(let i = 0; i < keys.length; i++) {
                const s_name = keys[i];
                const flag = this.cusparamDatabaseGrowthType(s_name);
                if(flag) this._cusparamsGrowthType[s_name] = flag;
            };
        };

        Game_Actor.prototype.cusparamDatabaseGrowthType = function(s_name) {
            return Game_Battler.prototype.cusparamDatabaseGrowthType.call(this, s_name)
             || (this.currentClass().meta[_.prefix+s_name+_.suffix] === undefined ? '' : this.currentClass().meta[_.prefix+s_name+_.suffix].trim());
        };

        Game_Actor.prototype.changeCusparamGrowthType = function(s_name, type) {
            if(Object.keys(_.globalGrowthParams).contains(s_name)) {
                this._cusparamsGrowthType[s_name] = type;
                this.refreshCusparamOnLevelChange(s_name, this._level);
                this.refreshCusparam(s_name);
            }
        };

        var __Game_Actor_levelUp = Game_Actor.prototype.levelUp;
        Game_Actor.prototype.levelUp = function() {
            __Game_Actor_levelUp.call(this);
            this.refreshCusparamsOnLevelChange();
        };

        var __Game_Actor_levelDown = Game_Actor.prototype.levelDown;
        Game_Actor.prototype.levelDown = function() {
            __Game_Actor_levelDown.call(this);
            this.refreshCusparamsOnLevelChange();
        };

        Game_Actor.prototype.refreshCusparamsOnLevelChange = function() {
            const level = this._level;
            const keys = Object.keys(_.paramList);
            for(let i = 0; i < keys.length; i++) {
                const s_name = keys[i];
                this.refreshCusparamOnLevelChange(s_name, level);
            };
        };

        Game_Actor.prototype.refreshCusparamOnLevelChange = function(s_name, level) {
            if(this.cusparamGrowthType(s_name) !== null) {
                this._cusparamSettings[s_name]._level = this.cusparamGrowthSumForLevel(s_name, level);
            } else {
                this._cusparamSettings[s_name]._level = 0;
            }
        };

        Game_Actor.prototype.cusparamGrowthSumForLevel = function(s_name, level) {
            if(Object.keys(_.globalGrowthParams).contains(s_name)) {
                const flag = this.cusparamGrowthType(s_name);
                const group = _.growthList[flag].group;
                if(group.length < 2) {
                    if(!_.growthList[flag].formula) {
                        return this.calcDefaultGrowthForLevel(s_name, level);
                    } else {
                        return this.calcFormulaGrowthForLevel(s_name, level);
                    }
                } else {
                    return this.calcCustomGrowthForLevel(s_name, level);
                }
            }
            return 0;
        };

        Game_Actor.prototype.calcDefaultGrowthForLevel = function(s_name, level) {
            const flag = this.cusparamGrowthType(s_name);
            const growth = _.growthList[flag];
            const group = growth.group;
            const base = group[0] || 0;
            const flat = growth.defaultFlat;
            let num = base;
            for(let i = 0; i < level - 1; i++) {
                num += flat;
            }
            return num;
        };

        Game_Actor.prototype.calcCustomGrowthForLevel = function(s_name, level) {
            let num = 0;
            for(let i = 0; i < level; i++) {
                num += this.cusparamGrowthForLevel(s_name, i+1);
            }
            return num;
        };

        Game_Actor.prototype.calcFormulaGrowthForLevel = function(s_name, lv) {
            var flag = this.cusparamGrowthType(s_name);
            var growth = _.growthList[flag];
            var group = growth.group;
            var base = group[0] || 0;
            var flat = growth.defaultFlat;
            var actor = this;
            var level = lv;
            var formula = this.cusparamGrowthFormula(s_name);
            var num = eval(formula) || 0;
            return num;
        };

        var __Game_Actor_calcCusparam = Game_Actor.prototype.calcCusparam;
        Game_Actor.prototype.calcCusparam = function(s_name) {
            const value = __Game_Actor_calcCusparam.call(this, s_name) + this.levelCusparam(s_name);
            const min = _.paramList[s_name].min || -Infinity;
            const max = _.paramList[s_name].max || Infinity;
            return _.parseForFloat(value.clamp(min, max));
        };

        //=============================================================================
        // Game_Actors
        //=============================================================================

        Game_Actors.prototype.changeCusparamGrowthTypeForAll = function(s_name, flag) {
            this._data.forEach((actor)=>{
                actor.changeCusparamGrowthType(s_name, flag);
            });
        };

        // Plugin Command

        if(Utils.RPGMAKER_NAME === 'MZ') {
            PluginManager.registerCommand(_.pluginName, 'Change Growth Type', (args)=>{
                let s_name = args['Param Short Name'];
                let flag = args['Growth Flag'] || null;
                let actorId = +args['Actor ID'] || 0;
                let classId = +args['Class ID'] || 0;
                let isActor = !!actorId && !classId;
                if(Object.keys(_.globalGrowthParams).contains(s_name) && !!flag) {
                    if(isActor) {
                        $gameActors.actor(actorId).changeCusparamGrowthType(s_name, flag);
                    } else {
                        $gameActors._data.forEach((actor)=>{
                            if(actor._classId === classId) actor.changeCusparamGrowthType(s_name, flag);
                        });
                    }
                }
            });
            PluginManager.registerCommand(_.pluginName, 'Change Growth Type For All', (args)=>{
                let s_name = args['Param Short Name'];
                let flag = args['Growth Flag'] || null;
                if(Object.keys(_.globalGrowthParams).contains(s_name) && !!flag) {
                    $gameActors.changeCusparamGrowthTypeForAll(s_name, flag);
                }
            });
            PluginManager.registerCommand(_.pluginName, 'Remove Growth Type', (args)=>{
                let s_name = args['Param Short Name'];
                if(Object.keys(_.globalGrowthParams).contains(s_name)) {
                    $gameActors.changeCusparamGrowthTypeForAll(s_name, null);
                }
            });
        } else {
            Game_Interpreter.prototype.pluginCommand = function(command, args) {
                if(command.toLowerCase() === '::rssd_hp_pg') {
                    switch(args[0].toLowerCase()) {
                        case 'change':
                            var s_name = args[2].replace('param[','').replace(']','');
                            const flag = args[3].indexOf('growth') > 0 ? args[2].replace('growth[','').replace(']','') : null;
                            if(args[1].toLowerCase() === 'all_actors') {
                                $gameActors.changeCusparamGrowthTypeForAll(s_name, flag)
                            } else {
                                const actorId = args[1].indexOf('actor') > 0 ? +args[0].replace('actor[','').replace(']','') : 0;
                                const classId = args[1].indexOf('class') > 0 ? +args[0].replace('class[','').replace(']','') : 0;
                                const isActor = !!actorId && !classId;
                                if(isActor) {
                                    $gameActors.actor(actorId).changeCusparamGrowthType(s_name, flag);
                                } else {
                                    $gameActors._data.forEach((actor)=>{
                                        if(actor._classId === classId) actor.changeCusparamGrowthType(s_name, flag);
                                    });
                                }
                            }
                            break;
                        case 'remove':
                            var s_name = args[1].replace('param[','').replace(']','');
                            if(Object.keys(_.globalGrowthParams).contains(s_name)) {
                                $gameActors.changeCusparamGrowthTypeForAll(s_name, null);
                            }
                            break;
                    }
                }
            }
        }
    } else {
        console.log('RSSD_HP_Addon_ParamGrowth.js 需要 RSSD_HiddenParams.js 作为前置插件。');
    };
})(RSSD.HP_PG);