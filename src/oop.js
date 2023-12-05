/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Со звездочкой: реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
    constructor(X, Y) {
        this.x = 0;
        this.y = 0;
        if (!isNaN(X)) this.x = X;
        if (!isNaN(Y)) this.y = Y;
    }
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    constructor(X, Y, Z=0) {
        super(X, Y)
        this.z = 0;
        if (!isNaN(Z)) this.z = Z;
    }
    static vectorLength(a, b) {
        return Math.sqrt(
            (a.x - b.x)**2 + (a.y - b.y)**2 + (a.z - b.z)**2
        );
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Со звездочкой: написать тесты методы класса (oop.spec.js)
 */
class Queue {
    constructor(elems_array = null) {
        if (elems_array) this.array = new Array(...elems_array);
        else this.array = new Array();
    }

    push(...el) {
        el.forEach(element => {
            this.array.push(element);
        });
    }

    pop() {
        return this.array.shift();
    }

    get size() {
        return this.array.length;
    }

    clear() {
        this.array = new Array();
    }

}

module.exports = {
    Point,
    Point3D,
    Queue,
};