# Protocol Buffers Benchmarks

Simple benchmarks of [Protocol Buffer](https://developers.google.com/protocol-buffers) and JSON.

In Go serialization and deserialization speed is benchmarked. Go benchmark code based on code in [this talk](https://www.youtube.com/watch?v=27swR9HACWU).

For Node.js benchmarks serialization and deserialization speeds using both `protoc` and [protobuf.js](https://github.com/dcodeIO/ProtoBuf.js/). Also benchmarks serialized sizes for a few scenarios. No compression is applied.

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
Protobufjs encode() x 747,715 ops/sec ±1.02% (89 runs sampled)
protoc serializeBinary() x 380,575 ops/sec ±1.29% (90 runs sampled)
JSON stringify() x 974,705 ops/sec ±1.02% (90 runs sampled)
Fastest is JSON stringify()
Slowest is protoc serializeBinary()
Protobufjs decode() x 1,148,161 ops/sec ±1.13% (91 runs sampled)
protoc deserializeBinary() x 578,055 ops/sec ±1.25% (89 runs sampled)
JSON parse() x 753,434 ops/sec ±0.90% (87 runs sampled)
Fastest is Protobufjs decode()
Slowest is protoc deserializeBinary()
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
