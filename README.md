# Protocol Buffers Benchmarks

Simple benchmarks of [Protocol Buffer](https://developers.google.com/protocol-buffers) vs. JSON serialization and deserialization and payload size in Go and Node.js. No gzip.

Go benchmark code based on code in [this talk](https://www.youtube.com/watch?v=27swR9HACWU).

For Node.js benchmarks both `protoc` generated code and code using [protobuf.js](https://github.com/dcodeIO/ProtoBuf.js/).

## Installation

```sh
$ cd node && npm install && cd ..
```

## Run

#### Go

```sh
$ cd go
$ go test -bench .
```

#### Node.js

```sh
$ cd node
$ node .
```

## Results

```
MacBook Pro (Retina, 15-inch, Mid 2014)
2.5 GHz Intel Core i7
16 GB 1600 MHz DDR3
macOS Sierra (10.12.6)
```

#### Go

```sh
goos: darwin
goarch: amd64
BenchmarkUserProto3Marshal-8     	 3000000	       557 ns/op
BenchmarkUserJSONMarshal-8       	 1000000	      1531 ns/op
BenchmarkUserProto3Unmarshal-8   	 2000000	       599 ns/op
BenchmarkUserJSONUnmarshal-8     	  300000	      4570 ns/op
```

#### Node.js

```sh
Protobufjs decode x 1,149,081 ops/sec ±1.28% (86 runs sampled)
protoc deserialize x 567,928 ops/sec ±1.56% (87 runs sampled)
JSON parse x 698,089 ops/sec ±1.98% (86 runs sampled)
Fastest is Protobufjs decode
Slowest is protoc deserialize
Protobufjs decode x 1,165,148 ops/sec ±1.21% (88 runs sampled)
protoc deserialize x 553,889 ops/sec ±1.24% (86 runs sampled)
JSON parse x 712,985 ops/sec ±1.21% (86 runs sampled)
Fastest is Protobufjs decode
Slowest is protoc deserialize
Size:
Multiplier: 1 JSON size: 166 Protocol Buffer size: 89
Multiplier: 10 JSON size: 805 Protocol Buffer size: 730
Multiplier: 100 JSON size: 7195 Protocol Buffer size: 7126
Multiplier: 1000 JSON size: 71095 Protocol Buffer size: 71026
Array size: 1 JSON size: 178 Protocol Buffer size: 91
Array size: 10 JSON size: 1681 Protocol Buffer size: 910
Array size: 100 JSON size: 16711 Protocol Buffer size: 9100
Array size: 1000 JSON size: 167011 Protocol Buffer size: 91000
```
