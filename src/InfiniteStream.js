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


module.exports = {
    Cons
};