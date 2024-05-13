
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";

actor {
    var fontNames : Buffer.Buffer<Text> = Buffer.Buffer<Text>(10);
    var fontDatas : Buffer.Buffer<Blob> = Buffer.Buffer<Blob>(10);

    public func uploadFont(name : Text, data : Blob) : async () {
        fontNames.add(name);
        fontDatas.add(data);
    };

    public query func getFont(fontName : Text) : async ?Blob {
        let index = findFontIndex(fontName);
        switch(index){
            case(?index){
                return ?fontDatas.get(index);
            };
            case(null){
                return null;
            };
        }
    };

    private func findFontIndex(name : Text) : ?Nat {
        for (index in Iter.range(0, fontNames.size())) {
            if (fontNames.get(index) == name) {
                return ?index;
            };
        };
        return null;
    };

    public func getFontName() : async [Text]{
        return Buffer.toArray<Text>(fontNames);
    }
}
