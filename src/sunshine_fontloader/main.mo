// with fontloading as a canister we allow the specific font version
// that we choose, and we minimalize internet connection failure because
// the fontloader is in a new canister
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor FontLoader {
    var fontNames: Buffer.Buffer<Text> = Buffer.Buffer<Text>(10); // Initial capacity set to 10
    var fontDatas: Buffer.Buffer<Blob> = Buffer.Buffer<Blob>(10); // Initial capacity set to 10

    // Public function to simply upload a new font
    public func uploadFont(name: Text, data: Blob) : async () {
        fontNames.add(name);
        fontDatas.add(data);
    };

    // Public query function to get a font by name
    public query func getFont(fontName: Text) : async ?Blob {
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

    // Helper function to find the index of a font by name
    private func findFontIndex(name: Text) : ?Nat {
        for (index in Iter.range(0, fontNames.size())) {
            if (fontNames.get(index) == name) {
                return ?index;
            };
        };

        return null;
    };

    // Returns a list of names for the fonts
    // public func getFontName() : async ?Buffer<Text>{
    //     return fontNames;
    // }
}
