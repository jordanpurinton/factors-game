function LevelSelectView (brush, renderRegion, storageManager, prng, monochromaticPaletteBuilder, numberColor, blockSize, xPad) {
  this.brush = brush;
  this.renderRegion = renderRegion;
  this.storageManager = storageManager;
  this.prng = prng;
  this.monochromaticPaletteBuilder = monochromaticPaletteBuilder;
  this.numberColor = numberColor;
  this.sliderY = this.renderRegion.height * .5
  this.blockSize = blockSize;
  this.xPad = xPad || 0;
}

LevelSelectView.prototype.drawLevelResults = function (value) {
  var results = this.storageManager.getLevelResult(value);
  if (!results) {
    return;
  }

  var number = results.endNumber;
  if (number === 1) {
    result = 'ACE!';
  } else {
    result = number < 10 ? 'LOW!' : 'High';
  }

  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.fillText(result, this.renderRegion.width / 2, this.renderRegion.height * 0.40);

  this.brush.font = 'bold ' + this.blockSize * 0.25 + 'px sans-serif';
  this.brush.fillText('End Number: ' + number, this.renderRegion.width / 2, this.renderRegion.height * .6);
  if(number === 1) {
      this.brush.fillText('Moves: ' + results.path.length, this.renderRegion.width / 2, this.renderRegion.height * .6675);
  }
};

LevelSelectView.prototype.drawNumber = function (value, blockColor) {
  this.brush.fillStyle = blockColor;
  this.brush.fillRect((this.renderRegion.width / 2) - (this.blockSize / 2), this.renderRegion.height * .15, this.blockSize, this.blockSize);

  if (value < 1) {
    value = '?';
  }

  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.fillStyle = this.numberColor;
  this.brush.fillText('' + value, this.renderRegion.width / 2, (this.renderRegion.height * .15) + (this.blockSize / 2));
};

LevelSelectView.prototype.drawSlider = function (value, x, y, color) {
  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.strokeStyle = color;
  this.brush.lineWidth = 5;
  this.brush.beginPath();

  this.brush.moveTo(0 + this.xPad / 4, this.sliderY);
  this.brush.lineTo(this.renderRegion.width - this.xPad / 4, this.sliderY);
  this.brush.stroke();

  var radius = this.blockSize / 6;
  this.brush.beginPath();
  this.brush.arc(x, this.sliderY, radius, 2 * Math.PI, false);

  this.brush.stroke();
};

LevelSelectView.prototype.drawButton = function (color) {
  this.brush.fillStyle = color;
  this.brush.fillRect(this.xPad, this.renderRegion.height * .75, this.renderRegion.width - (this.xPad * 2), this.renderRegion.height * .15);
  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.fillStyle = this.numberColor;
  this.brush.fillText('Play', this.renderRegion.width / 2, this.renderRegion.height * .75 + this.renderRegion.height * .075);
};

LevelSelectView.prototype.getButtonBoundingBox = function() {
    return new BoundingBox(this.xPad, this.renderRegion.height * .75, this.renderRegion.width - (this.xPad * 2), this.renderRegion.height * .15);
};

LevelSelectView.prototype.draw = function (value, x, y, end) {
  this.brush.textAlign = 'center';
  this.brush.textBaseline = 'middle';

  var blockColor = '#808080';

  if (end && value > 0) {
    if (typeof this.prng.seed === 'function') {
      this.prng.seed(value);
    }
    var hue = Math.floor(this.prng.random() * 360);
    var saturation = Math.floor(this.prng.random() * 20) + 80;
    this.monochromaticPaletteBuilder.hue = hue;
    this.monochromaticPaletteBuilder.saturation = saturation;
    boardColors = this.monochromaticPaletteBuilder.build(16, 70);
    blockColor = HSL.complement(boardColors[Math.floor(this.prng.random() * 16)]).toString();
  }

  this.brush.font = 'bold ' + this.blockSize * 0.25 + 'px sans-serif';
  this.brush.fillStyle = this.numberColor;
  this.brush.fillText('LEVEL', this.renderRegion.width / 2, this.renderRegion.height * 0.10);
  this.drawNumber(value, blockColor);
  this.drawLevelResults(value);
  this.drawSlider(value, x, y, this.numberColor);
  this.drawButton(blockColor);
};

LevelSelectView.prototype.redraw = function (value, x, y, end) {
  this.brush.clearRect(0, 0, this.renderRegion.width, this.renderRegion.height);
  this.draw(value, x, y, end);
};
