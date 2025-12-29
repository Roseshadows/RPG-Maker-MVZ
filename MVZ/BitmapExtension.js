/*:
 * @plugindesc Bitmap 类扩展
 * @author 离影玫 | Rose_shadows
 * @target MZ
 * @help
 * 
 * Bitmap.strokeRoundRect(
 *     x, y, width, height, radius, color
 * )
 * - 绘制出圆角矩形的轮廓
 * 
 * Bitmap.fillRoundRect(
 *     x, y, width, height, radius, color
 * )
 * - 填充出圆角矩形
 * 
 * Bitmap.gradientFillRoundRect(
 *     x, y, width, height, radius, color1, color2, vertical
 * )
 * - 以渐变色填充出圆角矩形
 */
Bitmap.prototype.strokeRoundRect = function(x, y, width, height, radius, color) {
    const context = this.context;
    context.fillStyle = color;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.stroke();
};

Bitmap.prototype.fillRoundRect = function(x, y, width, height, radius, color) {
    const context = this.context;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
};

Bitmap.prototype.gradientFillRoundRect = function(
    x, y, width, height, radius, color1, color2, vertical
) {
    const context = this.context;
    const x1 = vertical ? x : x + width;
    const y1 = vertical ? y + height : y;
    const grad = context.createLinearGradient(x, y, x1, y1);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
    context.restore();
    this._baseTexture.update();
};