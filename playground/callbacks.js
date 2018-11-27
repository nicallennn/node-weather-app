//callback functions -> behind the scenes -> creating a callback function using synchronous
// 13 / 10 / 18

const getUser = (id, callback) => {
  const user = {
    id: id,
    name: 'Nick'
  }

  setTimeout(() => {
    callback(user)
  }, 3000)              //3 second delay, simulated delay for web api

}

getUser(31, (user) => {
  console.log(user)
})