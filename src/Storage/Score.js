function Score(results) {
  this.results = results;
}

Score.prototype.totalLevelsPlayed = function() {
  return this.results.length;
};

Score.prototype.compositeFrom = function(firstLevel, lastLevel) {
  var totalLevelsPlayed = this.totalLevelsPlayed();
  if(firstLevel < 1 || lastLevel < 1) {
      throw "Level must be greater than 0.";
  }
  if(firstLevel > lastLevel) {
    throw "First level cannot be greater than last level.";
  }
  if(lastLevel > totalLevelsPlayed) {
      throw "Last level is greater than total levels played.";
  }
  var composite = 0;
  for(var i = firstLevel - 1; i < lastLevel; i += 1) {
    composite += this.results[i].number;
  }
  return composite;
};

Score.prototype.compositeThrough = function(levelsPlayed) {
  return this.compositeFrom(1, levelsPlayed);
};

Score.prototype.averageFrom = function(firstLevel, lastLevel) {
  var totalLevels = lastLevel - firstLevel + 1;
  return this.compositeFrom(firstLevel, lastLevel) / totalLevels;
};

Score.prototype.averageThrough = function(levelsPlayed) {
    return this.averageFrom(1, levelsPlayed);
};

Score.prototype.composite = function() {
  return this.compositeThrough(this.totalLevelsPlayed());
};

Score.prototype.average = function() {
  return this.averageThrough(this.totalLevelsPlayed());
};