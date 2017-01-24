function TouchInput(inputController, element) {
    this.inputController = inputController;
    this.element = typeof element !== 'undefined' ? element : document;
}

TouchInput.prototype.listen = function() {
    this.element.addEventListener('touchstart', this.startTouch.bind(this));
    this.element.addEventListener('touchmove', this.detectSwipe.bind(this));
};

TouchInput.prototype.startTouch = function(event) {
    event.preventDefault();
    this.xStart = event.touches[0].clientX;
    this.yStart = event.touches[0].clientY;
};

TouchInput.prototype.detectSwipe = function(event) {
    event.preventDefault();
    if( this.xStart === null || this.yStart === null) {
        return;
    }

    var xEnd = event.touches[0].clientX;
    var yEnd = event.touches[0].clientY;

    var deltaX = xEnd - this.xStart;
    var deltaY = yEnd - this.yStart;

    var isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

    if(isHorizontalSwipe) {
        deltaX < 0 ? this.inputController.left(): this.inputController.right();
    } else if(deltaY > 0) {
        this.inputController.down();
    }

    this.xStart = null;
    this.yStart = null;
};