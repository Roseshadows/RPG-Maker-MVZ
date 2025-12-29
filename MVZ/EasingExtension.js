/*:
 * @plugindesc 缓动函数扩展
 * @author Rose_shadows
 * @target MV MZ
 * @help
 * 缓动函数参考: https://easings.net
 *
 *
 * 脚本:
 *
 * Easings.EASING_FUCTION(帧变量, 初始值, 变化量总数, 时长)
 * - 写在update函数里。根据帧变量返回缓动的位置数值。
 *
 * e.g.
 * picture.x = Easings.easeLinear(this._frameCount, 0, 300, 600)
 * - 随着this._frameCount每帧+1，图片的X坐标从0开始，以easeLinear的缓动变化方式，
 *   在600帧(10秒)内向右移动300像素。
 */

function Easings() {
    throw new Error('This is a static class');
};

Easings.easeLinear = function(t, b, c, d) {
    return c * t / d + b;
};

Easings.easeInQuad = function(t, b, c, d) {
    return c * (t /= d) * t + b;
};

Easings.easeOutQuad = function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
};

Easings.easeInOutQuad = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b; 
};

Easings.easeInSine = function(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
};

Easings.easeOutSine = function(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
};

Easings.easeInOutSine = function(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};

Easings.easeInExpo = function(t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
};

Easings.easeOutExpo = function(t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
};

Easings.easeInOutExpo = function(t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b; 
};

Easings.easeInCirc = function(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};

Easings.easeOutCirc = function(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
};

Easings.easeInOutCirc = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};

Easings.easeInCubic = function(t, b, c, d) {
    return c * (t /= d) * t * t + b;
};

Easings.easeOutCubic = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
};

Easings.easeInOutCubic = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b; 
};

Easings.easeInQuart = function(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
};

Easings.easeOutQuart = function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

Easings.easeInOutQuart = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};

Easings.easeInQuint = function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
};

Easings.easeOutQuint = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
};

Easings.easeInOutQuint = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
};

Easings.easeInElastic = function(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    }
    else s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
};

Easings.easeOutElastic = function(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    }
    else s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
};

Easings.easeInOutElastic = function(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    }
    else s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
};

Easings.easeInBack = function(t, b, c, d) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b; 
};

Easings.easeOutBack = function(t, b, c, d) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};

Easings.easeInOutBack = function(t, b, c, d) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
};

Easings.easeInBounce = function(t, b, c, d) {
    return c - this.easeOutBounce(d - t, 0, c, d) + b;
};

Easings.easeOutBounce = function(t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
};

Easings.easeInOutBounce = function(t, b, c, d) {
    if (t < d/2) return easeInBounce (t*2, 0, c, d) * .5 + b;
    return easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
};