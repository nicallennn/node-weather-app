console.log('Starting up')

//callback waits 2 seconds
//prints after other code as 2 second delay
setTimeout(() => {
  console.log('Inside of callback')
}, 2000)

/*
still runs after next conosle.log statement, even though delay is 0 -> this is b'cos there is still another statement in the main function. the callback function can not be moved into the call stack until the call stack is empty -> ie. all current functions in the callstack have been completed -> i.e. main function. 
*/

setTimeout(() => {
  console.log('Inside of callback 2')
}, 0)

console.log('Finishing up')