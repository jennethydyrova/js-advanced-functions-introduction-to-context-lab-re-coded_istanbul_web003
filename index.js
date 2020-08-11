// Your code here

const createEmployeeRecord = (arr) => {
  const obj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return obj;
};

const createEmployeeRecords = (arr) => {
  let arrOfObj = [];
  arr.forEach((e) => {
    arrOfObj.push(createEmployeeRecord(e));
  });
  return arrOfObj;
};

const createTimeInEvent = (obj, timeStamp) => {
  let hour = parseInt(timeStamp.split(" ")[1]);
  let date = timeStamp.split(" ")[0];
  obj.timeInEvents.push({ type: "TimeIn", hour: hour, date: date });
  return obj;
};

const createTimeOutEvent = (obj, timeStamp) => {
  let hour = parseInt(timeStamp.split(" ")[1]);
  let date = timeStamp.split(" ")[0];
  obj.timeOutEvents.push({ type: "TimeOut", hour: hour, date: date });
  return obj;
};

const hoursWorkedOnDate = (obj, timeStamp) => {
  let timeIn = obj.timeInEvents.find((e) => e.date === timeStamp);
  let timeOut = obj.timeOutEvents.find((e) => e.date === timeStamp);
  let result = (timeOut.hour - timeIn.hour) / 100;
  return result;
};

const wagesEarnedOnDate = (obj, timeStamp) => {
  return hoursWorkedOnDate(obj, timeStamp) * obj.payPerHour;
};

const allWagesFor = (obj) => {
  let availableDates = obj.timeInEvents.map(function (e) {
    return e.date;
  });

  let toPay = availableDates.reduce(function (acc, curr) {
    return acc + wagesEarnedOnDate(obj, curr);
  }, 0);

  return toPay;
};
const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find((e) => {
    return e.firstName === firstName;
  });
};

function calculatePayroll(arr) {
  let total = arr.map((e) => allWagesFor(e));
  return total.reduce((num, total) => num + total);
}
