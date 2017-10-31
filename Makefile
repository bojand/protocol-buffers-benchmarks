generate-proto:
	protoc -I=./protos --go_out=./go ./protos/user.proto && \
    protoc -I=./protos --js_out=import_style=commonjs,binary:./node ./protos/user.proto

