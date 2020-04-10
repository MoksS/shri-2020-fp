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
import { equals, and, length, gte, pipeP, test, tap } from 'ramda';

const api = new Api();

const less10 = str => gte(9, length(str));
const more2 = str => gte(length(str), 3);
const onlyNumber = str => test(/^[0-9]+\.?[0-9]+$/, str);
const postvNum = str => gte(parseFloat(str), 0);
const getNumber = async str => Math.round(parseFloat(str));
const validator = async value => and(and(less10(value), more2(value)), and(onlyNumber(value), postvNum(value))) ?
value :
Promise.reject("invaled");

const getTransf = async value => api.get("https://api.tech/numbers/base", {
    from: 10,
    to: 2,
    number: value,
}).then ( ({result}) => result);
const getAnimals = async id => api.get(`https://animals.tech/${id}`, {}).then(({result}) => result);
const sqrNum = async num => Math.pow(num, 2);
const balance = async num => num % 3;

const processSequence = async ({ value, writeLog, handleSuccess, handleError }) => {

    const log = async l => tap(writeLog, l);

    const f = pipeP(
        log,
        validator,
        getNumber,
        log,
        getTransf,
        log,
        length,
        log,
        sqrNum,
        log,
        balance,
        log,
        getAnimals,
        handleSuccess
    );

    f(value).catch(err => equals(err, "invaled") ? handleError("ValidationError") : handleError(err));
}

export default processSequence;
