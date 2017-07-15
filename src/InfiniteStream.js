function InfiniteStreamType(head, tail) {
    this._head = head;
    this._tail = tail;
}


const Cons = head => tail =>
    new InfiniteStreamType(head, tail);


InfiniteStreamType.prototype.head = function() {
    return this._head;
};


InfiniteStreamType.prototype.tail = function() {
    return this._tail();
};


InfiniteStreamType.prototype.map = function (f) {
    return new InfiniteStreamType(f(this._head), () => this._tail().map(f));
};


InfiniteStreamType.prototype.foldn = function(n) {
    return initialValue => iterationFunction => {
        let count = 0;
        let result = initialValue;
        let current = this;

        while (count < n) {
            result = iterationFunction(result)(current.head());
            current = current.tail();
            count += 1;
        }

        return result;
    };
};

module.exports = {
    Cons
};