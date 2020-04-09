/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { 
    prop,
    equals,
    not,
    and, 
    length, 
    values,
    filter, 
    gte,
    or,
    where,
    partial
} from 'ramda';

const getLength = (obj, color) =>  length(filter(equals(color), values(obj)));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = where({
    star: equals("red"),
    square: equals("green"),
    triangle: equals("white"),
    circle: equals("white")
});

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (obj) => {
    return gte(getLength(obj, "green"), 2);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (obj) => {
    // хотел через reduce массива за один проход но не разобрался как возвращать acc, если условия не подходят
    const lengthEl = partial(getLength, [obj]);
    const redFigure = lengthEl("red");
    const blueFigure = lengthEl("blue");
    return and(equals(redFigure, blueFigure), not(equals(redFigure, 0)));
}

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = where({
    star: equals("red"),
    square: equals("orange"),
    circle: equals("blue")
});;

// 5. Три фигуры одного любого цвета кроме белого.
export const validateFieldN5 = (obj) => {
    // знаю ужасно, жду разбора
    const lengthEl = partial(getLength, [obj]);
    const redFigure = equals(lengthEl("red"), 3);
    const orangeFigure = equals(lengthEl("orange"), 3);
    const greenFigure = equals(lengthEl("green"), 3);
    const blueFigure = equals(lengthEl("blue"), 3);

    return or(or(redFigure, orangeFigure), or(greenFigure, blueFigure));
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (obj) => {
    const lengthEl = partial(getLength, [obj]);
    const triangle = equals("green", prop("triangle", obj));
    const greenFigure = equals(lengthEl("green"), 2);
    const redFigure = equals(lengthEl("red"), 1);
    
    return and(greenFigure, and(triangle, redFigure));
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (obj) => equals(getLength(obj, "orange"), 4);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (obj) => {
    const notRed = not(equals("red", prop("star", obj)));
    const notWhite =  not(equals("white", prop("star", obj)))
    return  and(notRed, notWhite);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (obj) => equals(getLength(obj, "green"), 4);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (obj) => {
    const triangle = prop("triangle", obj);
    const square = prop("square", obj);
    const white =  or(equals("white", prop("triangle", obj)), equals("white", prop("square", obj)));
    return and(not(white), equals(triangle, square));
};
