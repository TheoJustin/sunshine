import User "canister:sunshine_backend";
import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Vector "mo:vector/Class";
// import Types "mo:fuzz/types";

actor {
    type Chat = {
        id : Text;
        message : Text;
        user : User.User;
        timestamp : Time.Time;
        status : Text;
    };

    let chats = TrieMap.TrieMap<Text, Chat>(Text.equal, Text.hash);

    // generate UUID
    public shared func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    };

    // Create Chat with user inputs
    public shared func createChat(newChat : Text, userId: Principal) : async Result.Result<Chat, Text> {
        let newId = await generateUUID();

        let user_id = userId;

        if (Principal.isAnonymous(user_id)) {
            return #err("Unauthorized");
        };

        // get user
        let currUser = await User.getUserById(user_id);

        switch (currUser) {
            case (#ok(currUser)) {
                let chat : Chat = {
                    id = newId;
                    timestamp = Time.now();
                    status = "delivered";
                    user = currUser;
                    message = newChat;
                };

                chats.put(newId, chat);
                return #ok(chat);

            };
            case (#err(error)) {
                return #err("not found!");
            };
        };

    };

    public shared query (msg) func whoami() : async Principal {
        msg.caller;
    };

    public shared query func getAllChats() : async Result.Result<[(Text, Text, Int)], Text> {
        var allChats = Vector.Vector<(Text, Text, Int)>();

        for (chat in chats.vals()) {
            allChats.add(chat.user.name, chat.message, chat.timestamp);
        };

        return #ok(Vector.toArray(allChats));
    };
};
