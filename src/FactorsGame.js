function FactorsGame(levels, config, storageManager, score, canvas) {
    this.levels = levels;
    this.config = config;
    this.storageManager = storageManager;
    this.score = score;
    this.canvas = canvas;
    this.brush = canvas.getContext('2d');
    this.brush.clearAll = function() {
        this.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.states = {
        TUTORIAL: new TutorialState(this),
        PLAYING: new PlayingState(this),
        COMPLETE: new CompleteState(this),
        SELECT: new SelectState(this)
    };
    this.state = null;
}

FactorsGame.prototype.start = function() {
    var completedTutorial = this.storageManager.getCurrentLevel() !== 1;
    this.transition(completedTutorial ? 'PLAYING' : 'TUTORIAL');
};

FactorsGame.prototype.transition = function(nextState) {
    var context;
    if(this.state) {
        context = this.state.onLeave();
    }
    if(this.states[nextState]) {
        this.state = this.states[nextState];
    }
    this.state.onEnter(context);
};
