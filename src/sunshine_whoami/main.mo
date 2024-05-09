import Principal "mo:base/Principal";

actor {
    //  shared func test(test: Principal) : async Result.Result<User.User, Text> {
    //     let asd = await User.getUserById(test);
    //     switch(asd){
    //         case (#ok(asd)){
    //             return #ok(asd);
    //         };
    //         case (#err(errorMssg)){
    //             // return asd;
    //             return #err("no")
    //         };
    //     }
    //     // return asd;
    // };
    public shared query (msg) func whoami() : async Principal {
        msg.caller
    };
};