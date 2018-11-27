//async function, returns a promise => resolves if arguments are numbers, else rejects
const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b)
      } else {
        reject('Arguments must be numbers!')
      }
    }, 1500)
  })
}

//call function and handle data returned, return new promise, call function again
asyncAdd(5, 7).then((res) => {
  return asyncAdd(res, 33)
}).then((res) => {
  console.log(`Result should be 45, Actual result: ${res}`)
}).catch((errorMessage) => {
  console.log(errorMessage)
})

// let somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hi it worked!')  //value promise was fulfilled with
//     reject('Unable to fulfill promise')
//   }, 2500)
// })

// somePromise.then((message) => {  //function will only be called when promise is fulfiled
//   console.log('Success: ', message)
// }, (errorMessage) => {
//   console.log(errorMessage)
// })