//==============================================================================
// FormationSystem_Core.js
// Author: Rose_shadows
//==============================================================================
/*:
 * @plugindesc 1.1.1 - 战斗阵列系统 - 核心
 * @author Rose_shadows
 * @target MV MZ
 * @help
 * === 介绍 ===
 * 
 * 该插件引入了战斗前后排的概念。每一排默认各有3个位置，一共6个位置，即插即用。
 * 前排会代替后排优先受到敌方的伤害，直到所有前排成员全部死亡为止。
 * 
 * 此外该插件也可实现目标特定为前排全体或后排全体的技能。
 * 如果后排不存在符合技能条件的队员，前排队员就会受到仅作用于后排的技能的影响。
 * 同理，如果前排不存在符合技能条件的队员，后排队员就会受到仅作用于前排的技能的
 * 影响。
 * 
 * 该插件还改变了技能作用于全体时效果的附加顺序。
 * 安装插件后，技能效果会按照ID由小到大的阵列槽的顺序附加在战斗者上。
 * 
 * 开始游戏时，开场的队员会按顺序放入阵列槽内。
 * 在每次战斗中，敌人会按照设置随机出现在前排或后排的位置。
 * 
 * 需要注意的是，操作队列（加减队员、交换队员）时，阵列也会做出相应改动。
 * ·添加队员：如果添加后，队员总数小于等于战斗人数上限，则会将新添加的队员放到
 * ID最小的槽位。
 * ·移除队员：如果队员在阵列中，从阵列中移除该队员。
 * 如果移除后阵列中没有队员，则将当前的队长添加到队列中。
 * ·交换队员：如果两个队员均在阵列中，则在阵列中交换队员的位置。
 * 
 * # 敌人/队伍阵列槽ID分布如下（前排/后排各有三个位置的情况下）：
 *     [3] [0]      [0] [3]
 *    [4] [1]        [1] [4]
 *   [5] [2]          [2] [5]
 * 
 * 
 * === 数据库标签 ===
 * 
 * 物品/技能标签：
 * 
 * <For Rearguard>
 * - 仅作用于后排的技能。
 * 
 * <For All Members>
 * - 作用于全体目标，包括前排和后排。
 * 
 * 注意，如果不加任何标签，则默认作用于前排，
 * 即无论单体、随机还是全体技能都会优先对前排成员释放。
 * 
 * 敌人标签：
 * 
 * <Vanguard>
 * - 敌人固定在前排。战斗开始时会随机刷新在前排任意一个位置。
 * 
 * <Rearguard>
 * - 敌人固定在后排。战斗开始时会随机刷新在后排任意一个位置。
 * 
 * 如果敌人没有带标签，那么就会出现在前排或者后排任意一个位置。
 * 
 * 
 * === 事件脚本 ===
 * 
 * # 以下出现的 member 都是 $gameActors.actor(actorId) 
 *   或 $gameParty.member(memberId) 对象。
 * 
 * $gameParty.formationMember(slotId);
 * - 获取指定ID的阵列槽上的角色对象。如果为空阵列槽，则返回 null 。
 *   slotId: 阵列槽ID。
 * 
 * $gameParty.addMemberToSlot(member, slotId);
 * - 将角色/队员添加到指定阵列槽。如果阵列槽已有队员，则无法添加。
 *   slotId: 阵列槽ID。
 * 
 * $gameParty.addMemberToRandomSlot(member, flag);
 * - 将角色/队员添加到随机的空阵列槽。
 *   flag:   0 - 随机前排后排, 1 - 随机前排, 2 - 随机后排
 * 
 * $gameParty.removeMemberFromSlot(slotId);
 * - 从阵列槽移除角色/队员。
 *   slotId: 阵列槽ID。
 * 
 * $gameParty.swapMembersBetweenSlots(slotId1, slotId2);
 * - 交换位于两个阵列槽的角色/队员。对于空槽位也有效果。
 *   slotId1, slotId2: 阵列槽ID。
 * 
 * $gameParty.vanguardRearguardMaxMembers();
 * - 前后排的槽位数。和插件参数一致。
 * 
 * member.formationSlotIndex()
 * - 获取角色所在的阵列槽ID。如果没有在阵列里，则返回 -1 。
 * 
 * member.isFormationMember()
 * - 角色是否在阵列中。
 * 
 * member.isStrictVanguard()
 * - 角色是否为前排角色。与角色所在阵列槽ID有关。
 * 
 * member.isStrictRearguard()
 * - 角色是否为后排角色。与角色所在阵列槽ID有关。
 * 
 * member.isVanguard()
 * - 角色当前是否为前排属性。
 *   “前排属性”是指，假设该角色为后排角色，但前排队员全部死亡，
 *   那么角色就会被当作前排角色对待，即获得了“前排属性”。
 * 
 * member.isRearguard()
 * - 角色当前是否为后排属性。
 *   “后排属性”是指，假设该角色为前排角色，但后排队员全部死亡，
 *   那么角色就会被当作后排角色对待，即获得了“后排属性”。
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
 * 1.0.1 - 添加了与MZ的兼容性。
 * 1.0.2 - 新增函数，更新帮助文档。
 * 1.1.0 - 修复 Bug，添加对 MZ 的兼容性。
 * 1.1.1 - 修复目标为己方队员的技能实际选择敌方成员作为目标的问题。
 * 
 * @param Max Member
 * @text 前后排槽位数
 * @type number
 * @desc 前排/后排各自的位置数量。默认为 3。
 * @default 3
 * 
 * @param Slot For Member Alone
 * @text 单人队伍阵列槽ID
 * @type number
 * @desc 队伍只有一个人时，将队长放到哪个槽位？
 * @default 1
 * 
 * @param Actor Rearguard Offset X
 * @text 角色前后排间距
 * @type number
 * @min 0
 * @desc 角色队伍的后排队员相对于前排偏移多少像素的距离？
 * @default 48
 * 
 * @param Enemy Rearguard Offset X
 * @text 敌人前后排间距
 * @type number
 * @min 0
 * @desc 敌人敌群的后排队员相对于前排偏移多少像素的距离？
 * @default 96
 * 
 * @param First Formation X
 * @text 槽位0位置X坐标
 * @type number
 * @desc 位于ID为0的槽位的战斗者图像的X坐标。
 * @default 580
 * 
 * @param First Formation Y
 * @text 槽位0位置Y坐标
 * @type number
 * @desc 位于ID为0的槽位的战斗者图像的Y坐标。
 * @default 280
 * 
 * @param Formation Offset X
 * @text 前后排战斗者X偏移
 * @type number
 * @desc 前排/后排战斗者相对于上一个战斗者的图像的X偏移量。
 * @default 32
 * 
 * @param Formation Offset Y
 * @text 前后排战斗者Y偏移
 * @type number
 * @desc 前排/后排战斗者相对于上一个战斗者的图像的Y偏移量。
 * @default 64
 */

var Imported = Imported || {};
Imported.FormationSystem_Core = true;

var RSSD = RSSD || {};
RSSD.FS_C = {};

RSSD.FS_C.pluginName = 'FormationSystem_Core';
RSSD.FS_C.parameters = PluginManager.parameters(RSSD.FS_C.pluginName);
var parameters = RSSD.FS_C.parameters;

RSSD.FS_C.maxMembers = parameters['Max Member'] !== undefined ? +parameters['Max Member'] : 3;
RSSD.FS_C.singleSlotId = parameters['Slot For Member Alone'] !== undefined ? +parameters['Slot For Member Alone'] : 1;
RSSD.FS_C.rearguardActorX = parameters['Actor Rearguard Offset X'] !== undefined ? +parameters['Actor Rearguard Offset X'] : 48;
RSSD.FS_C.rearguardEnemyX = parameters['Enemy Rearguard Offset X'] !== undefined ? +parameters['Enemy Rearguard Offset X'] : 96;
RSSD.FS_C.firstFormationX = parameters['First Formation X'] !== undefined ? +parameters['First Formation X'] : 580;
RSSD.FS_C.firstFormationY = parameters['First Formation Y'] !== undefined ? +parameters['First Formation Y'] : 280;
RSSD.FS_C.formationX = parameters['Formation Offset X'] !== undefined ? +parameters['Formation Offset X'] : 32;
RSSD.FS_C.formationY = parameters['Formation Offset Y'] !== undefined ? +parameters['Formation Offset Y'] : 64;

//==============================================================================
// Game_Battler
//==============================================================================

Game_Battler.prototype.isStrictVanguard = function() {
    return this.friendsUnit().strictVanguardMembers().contains(this);
};

Game_Battler.prototype.isStrictRearguard = function() {
    return this.friendsUnit().strictRearguardMembers().contains(this);
};

Game_Battler.prototype.isVanguard = function() {
    return this.friendsUnit().vanguardAliveMembers().contains(this);
};

Game_Battler.prototype.isRearguard = function() {
    return this.friendsUnit().rearguardAliveMembers().contains(this);
};

Game_Battler.prototype.isFormationMember = function() {
    return this.formationSlotIndex() > -1;
};

Game_Battler.prototype.formationSlotIndex = function() {
    return this.friendsUnit()._formationSlots.indexOf(this);
};

Game_Battler.prototype.rearguardOffsetX = function() {
    return RSSD.FS_C.rearguardActorX;
};

//==============================================================================
// Game_Enemy
//==============================================================================

Game_Enemy.prototype.isSetVanguard = function() {
    return this.enemy().meta['Vanguard'] !== undefined;
};

Game_Enemy.prototype.isSetRearguard = function() {
    return this.enemy().meta['Rearguard'] !== undefined;
};

Game_Enemy.prototype.rearguardOffsetX = function() {
    return RSSD.FS_C.rearguardEnemyX;
};

//==============================================================================
// Game_Unit
//==============================================================================

let __RSSD_FS_C_Game_Unit_initialize = Game_Unit.prototype.initialize;
Game_Unit.prototype.initialize = function() {
    __RSSD_FS_C_Game_Unit_initialize.call(this);
    this._formationTargetType = '';
    this.refreshFormationSlots();
};

Game_Unit.prototype.setFormationTargetType = function(type) {
    this._formationTargetType = type;
};

let __RSSD_FS_C_Game_Unit_aliveMembers = Game_Unit.prototype.aliveMembers;
Game_Unit.prototype.aliveFormationMembers = function() {
    return __RSSD_FS_C_Game_Unit_aliveMembers.call(this).sort((a, b)=>{
        return a.formationSlotIndex() - b.formationSlotIndex();
    });
};

Game_Unit.prototype.aliveMembers = function() {
    if(this.needsAliveRearguard()) return this.rearguardAliveMembers();
    if(this.isAllStrictVanguardDied() || this.isAllStrictRearguardDied() || this.needsAliveAll()) return this.aliveFormationMembers();
    return this.vanguardAliveMembers();
};

Game_Unit.prototype.needsAliveRearguard = function() {
    return this._formationTargetType === 'rearguard' && !this.isAllStrictRearguardDied();
};

Game_Unit.prototype.needsAliveAll = function() {
    return this._formationTargetType === 'all';
};

let __RSSD_FS_C_Game_Unit_deadMembers = Game_Unit.prototype.deadMembers;
Game_Unit.prototype.deadFormationMembers = function() {
    return __RSSD_FS_C_Game_Unit_deadMembers.call(this).sort((a, b)=>{
        return a.formationSlotIndex() - b.formationSlotIndex();
    });
};

Game_Unit.prototype.deadMembers = function() {
    if(this.needsDeadRearguard()) return this.rearguardDeadMembers();
    if(this.isAllStrictVanguardAlive() || this.isAllStrictRearguardAlive() || this.needsDeadAll()) return this.deadFormationMembers();
    return this.vanguardDeadMembers();
};

Game_Unit.prototype.needsDeadRearguard = function() {
    return this._formationTargetType === 'rearguard' && !this.isAllStrictRearguardAlive();
};

Game_Unit.prototype.needsDeadAll = function() {
    return this._formationTargetType === 'all';
};

Game_Unit.prototype.refreshFormationSlots = function() {
    this._formationSlots = [];
    const num = 2 * this.vanguardRearguardMaxMembers();
    for(let i = 0; i < num; i++) {
        this._formationSlots.push(null);
    }
};

Game_Unit.prototype.formationMember = function(slotIndex) {
    return this._formationSlots[slotIndex] || null;
};

Game_Unit.prototype.setMemberAtSlot = function(member, slotIndex) {
    this._formationSlots[slotIndex] = member;
};

Game_Unit.prototype.addMemberToSlot = function(member, slotIndex) {
    const index = this._formationSlots.indexOf(member);
    if(index !== slotIndex && this.isMemberAddableToSlot(member, slotIndex)) {
        if(index > -1) this.removeMemberFromSlot(index);
        this.setMemberAtSlot(member, slotIndex);
    }
};

Game_Unit.prototype.addMemberToRandomSlot = function(member, type=0) {
    switch(type) {
        case 1: // Vanguard
            for(;;) {
                let slotIndex = Math.randomInt(this.vanguardRearguardMaxMembers());
                if(this.isMemberAddableToSlot(member, slotIndex)) {
                    this.addMemberToSlot(member, slotIndex);
                    break;
                }
            }
            break;
        case 2: // Rearguard
            for(;;) {
                let slotIndex = this.vanguardRearguardMaxMembers() + Math.randomInt(this.vanguardRearguardMaxMembers());
                if(this.isMemberAddableToSlot(member, slotIndex)) {
                    this.addMemberToSlot(member, slotIndex);
                    break;
                }
            }
            break;
        default:
            for(;;) {
                let slotIndex = Math.randomInt(this.vanguardRearguardMaxMembers() * 2);
                if(this.isMemberAddableToSlot(member, slotIndex)) {
                    this.addMemberToSlot(member, slotIndex);
                    break;
                }
            }
            break;
            
    }
};

Game_Unit.prototype.removeMemberFromSlot = function(member) {
    if(this.isMemberRemoveableFromSlot(member)) {
        var index = this._formationSlots.indexOf(member);
        this.setMemberAtSlot(null, index);
    }
};

Game_Unit.prototype.swapMembersBetweenSlots = function(slotIndex1, slotIndex2) {
    if(slotIndex1 === slotIndex2) return;
    const member1 = this._formationSlots[slotIndex1];
    const member2 = this._formationSlots[slotIndex2];
    this.setMemberAtSlot(member1, slotIndex2);
    this.setMemberAtSlot(member2, slotIndex1);
};

Game_Unit.prototype.isMemberRemoveableFromSlot = function(member) {
    if(member === this.leader()) return false;
    if(this._formationSlots.contains(member)) {
        return true;
    }
    return false;
};

Game_Unit.prototype.isMemberAddableToSlot = function(member, slotIndex) {
    return this._formationSlots[slotIndex] === null;
};

Game_Unit.prototype.minBlankSlotIndex = function() {
    for(let i = 0; i < this._formationSlots; i++) {
        const member = this._formationSlots[i];
        if(member === null) return i;
    }
};

Game_Unit.prototype.isAllStrictVanguardDied = function() {
    for(let i = 0; i < this.vanguardRearguardMaxMembers(); i++) {
        const member = this._formationSlots[i];
        if(member && member.isAlive()) return false;
    }
    return true;
};

Game_Unit.prototype.isAllStrictRearguardDied = function() {
    for(let i = this.vanguardRearguardMaxMembers(); i < this.vanguardRearguardMaxMembers() * 2; i++) {
        const member = this._formationSlots[i];
        if(member && member.isAlive()) return false;
    }
    return true;
};

Game_Unit.prototype.isAllStrictVanguardAlive = function() {
    for(let i = 0; i < this.vanguardRearguardMaxMembers(); i++) {
        const member = this._formationSlots[i];
        if(member && member.isDead()) return false;
    }
    return true;
};

Game_Unit.prototype.isAllStrictRearguardAlive = function() {
    for(let i = this.vanguardRearguardMaxMembers(); i < this.vanguardRearguardMaxMembers() * 2; i++) {
        const member = this._formationSlots[i];
        if(member && member.isDead()) return false;
    }
    return true;
};

Game_Unit.prototype.strictVanguardMembers = function() {
    const arr = [];
    for(let i = 0; i < this.vanguardRearguardMaxMembers(); i++) {
        const member = this._formationSlots[i];
        if(member) {
            arr.push(member);
        }
    }
    return arr;
};

Game_Unit.prototype.strictRearguardMembers = function() {
    const arr = [];
    for(let i = this.vanguardRearguardMaxMembers(); i < this.vanguardRearguardMaxMembers() * 2; i++) {
        const member = this._formationSlots[i];
        if(member) {
            arr.push(member);
        }
    }
    return arr;
};

Game_Unit.prototype.vanguardAliveMembers = function() {
    const arr = [];
    this.strictVanguardMembers().forEach((member)=>{
        if(member.isAlive()) arr.push(member);
    });
    if(JSON.stringify(arr) === '[]') {
        this.strictRearguardMembers().forEach((member)=>{
            if(member.isAlive()) arr.push(member);
        });
    }
    return arr;
};

Game_Unit.prototype.rearguardAliveMembers = function() {
    const arr = [];
    this.strictRearguardMembers().forEach((member)=>{
        if(member.isAlive()) arr.push(member);
    });
    if(JSON.stringify(arr) === '[]') {
        this.strictVanguardMembers().forEach((member)=>{
            if(member.isAlive()) arr.push(member);
        });
    }
    return arr;
};

Game_Unit.prototype.vanguardDeadMembers = function() {
    const arr = [];
    this.strictVanguardMembers().forEach((member)=>{
        if(member.isDead()) arr.push(member);
    });
    if(JSON.stringify(arr) === '[]') {
        this.strictRearguardMembers().forEach((member)=>{
            if(member.isDead()) arr.push(member);
        });
    }
    return arr;
};

Game_Unit.prototype.rearguardDeadMembers = function() {
    const arr = [];
    this.strictRearguardMembers().forEach((member)=>{
        if(member.isDead()) arr.push(member);
    });
    if(JSON.stringify(arr) === '[]') {
        this.strictVanguardMembers().forEach((member)=>{
            if(member.isDead()) arr.push(member);
        });
    }
    return arr;
};

Game_Unit.prototype.existingFormationMembers = function() {
    return this._formationSlots.filter((member)=>{
        return member !== null;
    });
};

Game_Unit.prototype.vanguardRearguardMaxMembers = function() {
    return RSSD.FS_C.maxMembers;
};

Game_Unit.prototype.singleFormationSlotIndex = function() {
    return RSSD.FS_C.singleSlotId;
};

//==============================================================================
// Game_Party
//==============================================================================

let __RSSD_FS_C_Game_Unit_isMemberAddableToSlot = Game_Unit.prototype.isMemberAddableToSlot;
Game_Party.prototype.isMemberAddableToSlot = function(member, slotId) {
    return __RSSD_FS_C_Game_Unit_isMemberAddableToSlot.call(this, member, slotId) && this.existingFormationMembers().length < this.battleMembers().length;
};

let __RSSD_FS_C_Game_Party_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() {
    __RSSD_FS_C_Game_Party_setupStartingMembers.call(this);
    this.setupStartingFormation();
};

Game_Party.prototype.setupStartingFormation = function() {
    if(this.battleMembers().length === 1) {
        this.addMemberToSlot(this.leader(), this.singleFormationSlotIndex());
    } else {
        for(let i = 0; i < this.battleMembers().length; i++) {
            const member = this.battleMembers()[i];
            this.addMemberToSlot(member, i);
        }
    }
};

let __RSSD_FS_C_Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    __RSSD_FS_C_Game_Party_addActor.call(this, actorId);
    if(!this._actors.contains(actorId)) {
        this.updateAddFormationSlots($gameActors.actor(actorId));
    }
};

let __RSSD_FS_C_Game_Party_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    __RSSD_FS_C_Game_Party_removeActor.call(this, actorId);
    if(this._actors.contains(actorId)) {
        this.updateRemoveFormationSlots($gameActors.actor(actorId));
    }
};

let __RSSD_FS_C_Game_Party_swapOrder = Game_Party.prototype.swapOrder;
Game_Party.prototype.swapOrder = function(index1, index2) {
    __RSSD_FS_C_Game_Party_swapOrder.call(this, index1, index2);
    const member1 = this._actors[index1];
    const member2 = this._actors[index2];
    this.updateSwapFormationSlots(member1, member2);
};

Game_Party.prototype.updateAddFormationSlots = function(member) {
    if(this.allMembers().length <= this.battleMembers().length) {
        this.addMemberToSlot(member, this.minBlankSlotIndex());
    }
};

Game_Party.prototype.updateRemoveFormationSlots = function(member) {
    if(this.allMembers().length <= this.battleMembers().length - 1) {
        this.removeMemberFromSlot(member);
        if(JSON.stringify(this.existingFormationMembers()) === '[]') {
            this.addMemberToSlot(this.leader(), this.singleFormationSlotIndex());
        }
    }
};

Game_Party.prototype.updateSwapFormationSlots = function(member1, member2) {
    if(this.battleMembers().contains(member1) && this.battleMembers().contains(member2)) {
        const slot1 = member1.formationSlotIndex();
        const slot2 = member2.formationSlotIndex();
        this.swapMembersBetweenSlots(slot1, slot2);
    } else if(this.battleMembers().contains(member1)) {
        this.removeMemberFromSlot(member1);
        this.addMemberToSlot(member2, this.minBlankSlotIndex());
    } else if(this.battleMembers().contains(member2)) {
        this.removeMemberFromSlot(member2);
        this.addMemberToSlot(member1, this.minBlankSlotIndex());
    }
}
//==============================================================================
// Game_Troop
//==============================================================================

let __RSSD_FS_C_Game_Troop_onBattleEnd = Game_Unit.prototype.onBattleEnd;
Game_Troop.prototype.onBattleEnd = function() {
    __RSSD_FS_C_Game_Troop_onBattleEnd.call(this);
    this.refreshFormationSlots();
};

let __RSSD_FS_C_Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
    __RSSD_FS_C_Game_Troop_setup.call(this, troopId);
    this.refreshFormation();
};

Game_Troop.prototype.refreshFormation = function() {
    this.members().forEach((member)=>{
        const type = member.isSetVanguard() ? 1 : (member.isSetRearguard() ? 2 : 0);
        this.addMemberToRandomSlot(member, type);
    });
};

//==============================================================================
// Game_Action
//==============================================================================

Game_Action.prototype.isForRearguard = function() {
    return this.item().meta['For Rearguard'] !== undefined;
};

Game_Action.prototype.isForAllFormationMembers = function() {
    return this.item().meta['For All Members'] !== undefined;
};

Game_Action.prototype.isForFormationMembers = function() {
    return this.isForRearguard() || this.isForAllFormationMembers();
};

let __RSSD_FS_C_Game_Action_targetsForOpponents = Game_Action.prototype.targetsForOpponents;
Game_Action.prototype.targetsForOpponents = function() {
    const targets = [];
    const unit = this.opponentsUnit();
    unit.setFormationTargetType('');
    if(this.isForFormationMembers()) {
        if(this.isForRearguard()) {
            unit.setFormationTargetType('rearguard');
        } else if(this.isForAllFormationMembers()) {
            unit.setFormationTargetType('all');
        }
    }
    return __RSSD_FS_C_Game_Action_targetsForOpponents.call(this);
};

let __RSSD_FS_C_Game_Action_targetsForFriends = Game_Action.prototype.targetsForFriends;
Game_Action.prototype.targetsForFriends = function() {
    const targets = [];
    const unit = this.friendsUnit();
    unit.setFormationTargetType('');
    if(this.isForFormationMembers()) {
        if(this.isForRearguard()) {
            unit.setFormationTargetType('rearguard');
        } else if(this.isForAllFormationMembers()) {
            unit.setFormationTargetType('all');
        }
    }
    return __RSSD_FS_C_Game_Action_targetsForFriends.call(this);
};

//==============================================================================
// Sprite_Battler
//==============================================================================

Sprite_Battler.prototype.firstFormationX = function() {
    return RSSD.FS_C.firstFormationX;
};

Sprite_Battler.prototype.firstFormationY = function() {
    return RSSD.FS_C.firstFormationY;
};

Sprite_Battler.prototype.formationOffsetX = function() {
    return RSSD.FS_C.formationX;
};

Sprite_Battler.prototype.formationOffsetY = function() {
    return RSSD.FS_C.formationY;
};

//==============================================================================
// Sprite_Actor
//==============================================================================

let __RSSD_FS_C_Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    __RSSD_FS_C_Sprite_Actor_setActorHome.call(this, index);
    this.setFormationPosition(this._actor);
};

Sprite_Actor.prototype.setFormationPosition = function(battler) {
    const slotIndex = battler.formationSlotIndex();
    const maxNumber = battler.friendsUnit().vanguardRearguardMaxMembers();
    let id = 0, offsetX = 0;
    if(battler.isStrictVanguard()) id = slotIndex;
    if(battler.isStrictRearguard()) {
        id = slotIndex - maxNumber;
        offsetX = battler.rearguardOffsetX();
    }
    this.setHome(this.firstFormationX() + id * this.formationOffsetX() + offsetX, this.firstFormationY() + id * this.formationOffsetY());
};

//==============================================================================
// Sprite_Enemy
//==============================================================================

Sprite_Enemy.prototype.firstFormationX = function() {
    const screenWidth = Utils.RPGMAKER_NAME === 'MZ' ? Graphics.width : SceneManager._screenWidth;
    return screenWidth - Sprite_Battler.prototype.firstFormationX.call(this);
};

let __RSSD_FS_C_Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    __RSSD_FS_C_Sprite_Enemy_setBattler.call(this, battler);
    if(this.isAutoFormationPositionEnabled()) {
        this.setFormationPosition(battler);
    }
};

Sprite_Enemy.prototype.setFormationPosition = function(battler) {
    const slotIndex = battler.formationSlotIndex();
    const maxNumber = battler.friendsUnit().vanguardRearguardMaxMembers();
    let id = 0, offsetX = 0;
    if(battler.isStrictVanguard()) id = slotIndex;
    if(battler.isStrictRearguard()) {
        id = slotIndex - maxNumber;
        offsetX = battler.rearguardOffsetX();
    }
    this.setHome(this.firstFormationX() - id * this.formationOffsetX() - offsetX, this.firstFormationY() + id * this.formationOffsetY());
};

Sprite_Enemy.prototype.isAutoFormationPositionEnabled = function() {
    return true;
};

//==============================================================================
// Game_Item
//==============================================================================

Game_Item.prototype.isForBattleRearguard = function() {
    return this.isUsableItem() && this.object().meta['For Rearguard'] !== undefined;
};

Game_Item.prototype.isForBattleAllMembers = function() {
    return this.isUsableItem() && this.object().meta['For All Members'] !== undefined;
};

Game_Item.prototype.isForBattleVanguard = function() {
    return !this.isForBattleRearguard() && !this.isForBattleAllMembers();
};

//==============================================================================
// Window_BattleActor
//==============================================================================

if(Utils.RPGMAKER_NAME === 'MZ') {

    Window_BattleActor.prototype.isCurrentItemEnabled = function() {
        return this.isCertainItemEnabled(this.index());
    };

    let __RSSD_FS_C_Window_BattleStatus_drawItem = Window_BattleStatus.prototype.drawItem;
    Window_BattleActor.prototype.drawItem = function(index) {
        const isEnabled = this.isCertainItemEnabled(index);
        this.changePaintOpacity(isEnabled);
        __RSSD_FS_C_Window_BattleStatus_drawItem.call(this, index);
        this.changePaintOpacity(true);
    };

    Window_BattleActor.prototype.isCertainItemEnabled = function(index) {
        const curFormationState = $gameParty._formationTargetType;
        const isRearguard = curFormationState === 'rearguard';
        const isAll = curFormationState === 'all';
        const isVanguard = !isRearguard && !isAll;
        const actor = this.actor(index);
        if(isRearguard) {
            if(actor.isRearguard()) return true;
            else return false;
        }
        if(isVanguard) {
            if(actor.isVanguard()) return true;
            else return false;
        }
        return true;
    };

}

if(Utils.RPGMAKER_NAME === 'MV' || Utils.RPGMAKER_NAME !== 'MZ') {

    Window_BattleActor.prototype.isCurrentItemEnabled = function() {
        return this.isCertainItemEnabled(this.index());
    };

    let __RSSD_FS_C_Window_BattleStatus_drawItem = Window_BattleStatus.prototype.drawItem;
    Window_BattleActor.prototype.drawItem = function(index) {
        const isEnabled = this.isCertainItemEnabled(index);
        this.changePaintOpacity(isEnabled);
        __RSSD_FS_C_Window_BattleStatus_drawItem.call(this, index);
        this.changePaintOpacity(true);
    };

    Window_BattleActor.prototype.isCertainItemEnabled = function(index) {
        const curFormationState = $gameParty._formationTargetType;
        const isRearguard = curFormationState === 'rearguard';
        const isAll = curFormationState === 'all';
        const isVanguard = !isRearguard && !isAll;
        const actor = $gameParty.members()[index];
        if(isRearguard) {
            if(actor.isRearguard()) return true;
            else return false;
        }
        if(isVanguard) {
            if(actor.isVanguard()) return true;
            else return false;
        }
        return true;
    };

}


//==============================================================================
// Scene_Battle
//==============================================================================

if(Utils.RPGMAKER_NAME === 'MV' || Utils.RPGMAKER_NAME !== 'MZ') {

    let __RSSD_FS_C_Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function() {
        const action = BattleManager.inputtingAction();
        const unit = $gameTroop;
        unit.setFormationTargetType('');
        if(action.isForRearguard()) {
            unit.setFormationTargetType('rearguard');
        } else if(action.isForAllFormationMembers()) {
            unit.setFormationTargetType('all');
        }
        __RSSD_FS_C_Scene_Battle_selectEnemySelection.call(this);
    };

    let __RSSD_FS_C_Scene_Battle_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
    Scene_Battle.prototype.selectActorSelection = function() {
        const action = BattleManager.inputtingAction();
        const unit = $gameParty;
        unit.setFormationTargetType('');
        if(action.isForRearguard()) {
            unit.setFormationTargetType('rearguard');
        } else if(action.isForAllFormationMembers()) {
            unit.setFormationTargetType('all');
        }
        __RSSD_FS_C_Scene_Battle_selectActorSelection.call(this);
    };

}

if(Utils.RPGMAKER_NAME === 'MZ') {

    let __RSSD_FS_C_Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
    Scene_Battle.prototype.onSelectAction = function() {
        this.checkFormationItemProperty();
        __RSSD_FS_C_Scene_Battle_onSelectAction.call(this);
    };

    Scene_Battle.prototype.checkFormationItemProperty = function() {
        const action = BattleManager.inputtingAction();
        const unit = action.isForFriend() ? $gameParty : $gameTroop;
        unit.setFormationTargetType('');
        if(action.isForRearguard()) {
            unit.setFormationTargetType('rearguard');
        } else if(action.isForAllFormationMembers()) {
            unit.setFormationTargetType('all');
        }
    };

};