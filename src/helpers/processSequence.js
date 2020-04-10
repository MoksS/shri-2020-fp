/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import { 
    prop,
    equals,
    not,
    and, 
    length, 
    values,
    filter, 
    gt,
    or,
    where,
    partial,
    pipe,
    defaultTo,
    test
} from 'ramda';

const api = new Api();

/**
 * Я – пример, удали меня
 */
const wait = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

const log = async log => console.log(await log);

const less10 = (str) => gt(10, length(...str));
const more2 = (str) =>  gt(length(...str), 2);
const onlyNumber = (str) => test(/^[0-9]+$/, str) 
// const strToNum = (str) 

// const validator = 

const processSequence = async ({value, writeLog, handleSuccess, handleError}) => {
    
    const f = pipe(
        defaultTo(writeLog), 
        log,

    );
    f(value);

    api.get('https://api.tech/numbers/base', {from: 2, to: 10, number: '01011010101'}).then(({result}) => {
        writeLog(result);
    });

    wait(2500).then(() => {
        writeLog('SecondLog')

        return wait(1500);
    }).then(() => {
        writeLog('ThirdLog');

        return wait(400);
    }).then(() => {
        handleSuccess('Done');
    });
}

export default processSequence;
