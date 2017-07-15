function InfiniteStreamType(head, tail) {
    this._head = head;
    this._tail = tail;
}


const Cons = head => tail =>
    new InfiniteStreamType(head, tail);


InfiniteStreamType.prototype.head = function () {
    return this._head;
};


InfiniteStreamType.prototype.tail = function () {
    return this._tail();
};


InfiniteStreamType.prototype.map = function (f) {
    return new InfiniteStreamType(f(this._head), () => this._tail().map(f));
};


InfiniteStreamType.prototype.foldn = function (n) {
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


InfiniteStreamType.prototype.takeAsArray = function (n) {
    const result = [];
    let cursor = this;
    for (let lp = 0; lp < n; lp += 1) {
        result.push(cursor.head());
        cursor = cursor.tail();
    }
    return result;
};


InfiniteStreamType.prototype.drop = function (n) {
    let cursor = this;
    for (let lp = 0; lp < n; lp += 1) {
        cursor = cursor.tail();
    }
    return cursor;
};


InfiniteStreamType.prototype.zip = function (other) {
    return Cons([this.head(), other.head()])(() => this.tail().zip(other.tail()));
};


module.exports = {
    Cons
};