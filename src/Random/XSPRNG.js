function XSPRNG(seed) {
    this.seed(seed);
    //Max signed 32-bit integer + 1
    this.max = 0x7FFFFFFF + 1;
}

XSPRNG.prototype.seed = function(seed) {
    if(!Number.isInteger(seed)) {
        throw "Seed should be integer.";
    }
    this.original = seed;
    this.previous = seed;
};

XSPRNG.prototype.random = function() {
    var next = XSPRNG.xorshift32plusstar(this.previous);
    this.previous = next;
    return next / this.max;
};

XSPRNG.xorshift32plusstar = function(number) {
    number += 113566;
    number *= 5172511;
    number ^= number << 13;
    number ^= number << 5;
    number ^= number >> 17;
    return number >>> 0;
};
