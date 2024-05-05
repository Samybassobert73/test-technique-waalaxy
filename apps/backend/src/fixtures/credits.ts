const MAX_VALUE = 10

const generateCreditValue = ():number => {
  const minRange = MAX_VALUE * 0.8;
  const maxRange = MAX_VALUE;
  let randomNumber = Math.random() * (maxRange - minRange) + minRange;
  randomNumber = Math.round(randomNumber);
  return randomNumber
}

module.exports = [
  {
    type: 'A',
    value: generateCreditValue(),
    createdAt: new Date() ,
    updatedAt: new Date(),
    __v: 0
  },
  {

    type: 'B',
    value: generateCreditValue(),
    createdAt: new Date() ,
    updatedAt: new Date(),
    __v: 0
  },
  {
    type: "C",
    value: generateCreditValue(),
    createdAt: new Date() ,
    updatedAt: new Date(),
    __v: 0
  },
];