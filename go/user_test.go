package usertest

import (
	"encoding/json"
	"testing"

	"github.com/golang/protobuf/proto"
)

var user = &User{
	Id:      1,
	Name:    "Bojan",
	Email:   "dbojan@gmail.com",
	Twitter: "bojantweets",
	Street:  "123 Fake Street",
	City:    "Freddy",
	State:   "NB",
	Zip:     "E3A 1H2",
	Phone:   "555555555",
}

func BenchmarkUserProto3Marshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_, err := proto.Marshal(user)
		if err != nil {
			b.Fatalf("marshaling err: %v", err)
		}
	}
}

func BenchmarkUserJSONMarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_, err := json.Marshal(user)
		if err != nil {
			b.Fatalf("marshaling err: %v", err)
		}
	}
}

func BenchmarkUserProto3Unmarshal(b *testing.B) {
	data, err := proto.Marshal(user)
	if err != nil {
		b.Fatalf("unmarshaling err: %v", err)
	}
	for i := 0; i < b.N; i++ {
		var user User
		err := proto.Unmarshal(data, &user)
		if err != nil {
			b.Fatalf("unmarshaling err: %v", err)
		}
	}
}

func BenchmarkUserJSONUnmarshal(b *testing.B) {
	data, err := json.Marshal(user)
	if err != nil {
		b.Fatalf("unmarshaling err: %v", err)
	}
	for i := 0; i < b.N; i++ {
		var user User
		err := json.Unmarshal(data, &user)
		if err != nil {
			b.Fatalf("unmarshaling err: %v", err)
		}
	}
}
