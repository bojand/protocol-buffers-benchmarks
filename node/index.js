const Benchmark = require('benchmark')
const protobuf = require('protobufjs')
const path = require('path')
const UserPB = require('./user_pb').User
const Users = require('./user_pb').Users
const _ = require('lodash')

const payload = {
  id: 1,
  name: 'Bojan',
  email: 'dbojan@gmail.com',
  twitter: 'bojantweets',
  street: '123 Fake Street',
  city: 'Freddy',
  state: 'NB',
  zip: 'E3A 1H2',
  phone: '555555555'
}

const PROTO_PATH = path.resolve(__dirname, '../protos/user.proto')

async function main () {
  await benchSerializePerf()
  await benchDeserializePerf()
  console.log('Size:')
  benchSize()
}

main()

function createPBUser (data, m) {
  const o = new UserPB()
  _.forOwn(data, (v, n) => {
    const method = 'set' + _.upperFirst(n)
    if (m && typeof v === 'string') {
      v = _.repeat(v, m)
    }
    o[method](v)
  })

  return o
}

async function benchSerializePerf () {
  return new Promise(async(resolve, reject) => {
    const root = await protobuf.load(PROTO_PATH)
    const User = root.lookupType('usertest.User')
    const message = User.create(payload)
    const pbuser = createPBUser(payload)

    const suite = new Benchmark.Suite()

    suite.add('Protobufjs encode()', function () {
      User.encode(message).finish()
    })
      .add('protoc serializeBinary()', function () {
        pbuser.serializeBinary()
      })
      .add('JSON stringify()', function () {
        JSON.stringify(payload)
      })
      .on('cycle', function (event) {
        console.log(String(event.target))
      })
      .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
        console.log('Slowest is ' + this.filter('slowest').map('name'))

        resolve()
      })
      .run()
  })
}

async function benchDeserializePerf () {
  return new Promise(async(resolve, reject) => {
    const root = await protobuf.load(PROTO_PATH)
    const User = root.lookupType('usertest.User')
    const message = User.create(payload)
    const userBuffer = User.encode(message).finish()
    const pbuser = createPBUser(payload)
    const pbbuffer = pbuser.serializeBinary()
    const userJSON = JSON.stringify(payload)

    const suite = new Benchmark.Suite()

    suite.add('Protobufjs decode()', function () {
      User.decode(userBuffer)
    })
      .add('protoc deserializeBinary()', function () {
        UserPB.deserializeBinary(pbbuffer)
      })
      .add('JSON parse()', function () {
        JSON.parse(userJSON)
      })
      .on('cycle', function (event) {
        console.log(String(event.target))
      })
      .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
        console.log('Slowest is ' + this.filter('slowest').map('name'))

        resolve()
      })
      .run()
  })
}

function benchSize () {
  compareObjects(1)
  compareObjects(10)
  compareObjects(100)
  compareObjects(1000)
  compareArray(1)
  compareArray(10)
  compareArray(100)
  compareArray(1000)
}

function compareObjects (n) {
  const pbu = createPBUser(payload, n)
  const pbo = pbu.toObject()

  const jsonStr = JSON.stringify(pbo)
  const jsonSize = Buffer.byteLength(jsonStr, 'utf8')

  const pbf = pbu.serializeBinary()
  const pbSize = pbf.length

  console.log(`Multiplier: ${n} JSON size: ${jsonSize} Protocol Buffer size: ${pbSize}`)
}

function compareArray (n) {
  const jsonData = []
  const pbData = []
  for (let i = 0; i < n; i++) {
    jsonData.push(payload)
    pbData.push(createPBUser(payload))
  }

  const jsonStr = JSON.stringify({ users: jsonData })
  const jsonSize = Buffer.byteLength(jsonStr, 'utf8')

  const pbo = new Users()
  pbo.setUsersList(pbData)
  const pbf = pbo.serializeBinary()
  const pbSize = pbf.length

  console.log(`Array size: ${n} JSON size: ${jsonSize} Protocol Buffer size: ${pbSize}`)
}
