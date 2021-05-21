import moment from "moment";

const getFactTimeUTC = () => {
    const date = new Date();
    return {
        yearUtc: date.getUTCFullYear(),
        monthUtc: date.getUTCMonth(),
        dateUtc: date.getUTCDate(),
        hoursUtc: date.getUTCHours(),
        minutesUtc: date.getUTCMinutes(),
        secondsUtc: date.getUTCSeconds(),
    }
};

const timeParser = (time) => {
    const timeArguments = ['year', 'month', 'day', 'hour', 'minute', 'second']
    return time.split('-').reduce((acc, val, id) => {
        return {[timeArguments[id]]: val, ...acc};
    }, {})
};

const timeDifference = (t) => {
    const time = timeParser(t);
    var dateFns = require("date-fns");
    const utc = getFactTimeUTC();
    let x = new Date(utc.yearUtc, utc.monthUtc, utc.dateUtc, utc.hoursUtc, utc.minutesUtc, utc.secondsUtc);
    const y = new Date(time.year, time.month, time.day, time.hour, time.minute, time.second);
    let temp;
    temp = dateFns.differenceInYears(y, x);
    let result = temp + " years ";
    x = dateFns.addYears(x, temp);
    temp = dateFns.differenceInMonths(y, x);
    result = result + temp + " months ";
    x = dateFns.addMonths(x, temp);
    temp = dateFns.differenceInDays(y, x);
    result = result + temp + " days ";
    x = dateFns.addDays(x, temp);
    temp = dateFns.differenceInHours(y, x);
    result = result + temp + " hours ";
    x = dateFns.addHours(x, temp);
    temp = dateFns.differenceInMinutes(y, x);
    result = result + temp + " minutes ";
    x = dateFns.addMinutes(x, temp);
    temp = dateFns.differenceInSeconds(y, x);
    result = result + temp + " seconds";
    return result;
};

export const dateTime = () => {
    const currentTime = moment().format('YYYY-MM-DD');
    const utc = getFactTimeUTC();
    return {
        getTime: currentTime,
        getTimeUTC: `${utc.yearUtc}-${utc.monthUtc}-${utc.dateUtc}-${utc.hoursUtc}-${utc.minutesUtc}-${utc.secondsUtc}`,
        getTimeFromTaskCreation: timeDifference,
    }
}
