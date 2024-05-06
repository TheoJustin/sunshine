import User "canister:sunshine_backend";
import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import Array "mo:base/Array";
import Vector "mo:vector/Class";
// import Types "mo:fuzz/types";

actor {
    type Chat = {
        id : Text;
        message : Text;
        user : Principal;
        timestamp : Time.Time;
        status : Text;
    };

    type Group = {
        id : Text;
        creatorUser : Principal;
        groupName : Text;
        timestamp : Time.Time;
        groupMembers : [Principal];
        messages : [Chat];
    };

    let groups = TrieMap.TrieMap<Text, Group>(Text.equal, Text.hash);
    let chats = TrieMap.TrieMap<Text, Chat>(Text.equal, Text.hash);
    var currGroup = "";

    // changing currentGroup
    public shared func focusGroup(groupId: Text): async Result.Result<Text, Text> {
        // let group = groups.get(groupId);
        currGroup := groupId;
        return #ok("Group Changed");
    };

    // getting current group
    public shared func getCurrentGroup(): async Result.Result<Text, Text> {
        let group = groups.get(currGroup);
        switch(group){
            case (?group){
                return #ok(currGroup);
            };
            case (null){
                return #err("Error fetching current group!");
            };
        };
    };

    // generate UUID
    public shared func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    };

    

    // bikin group
    public shared func createGroup(groupName : Text, userCreator : Principal) : async Result.Result<(), Text> {
        let newId = await generateUUID();
        let user = await User.getUserById(userCreator);
        if (Principal.isAnonymous(userCreator)) {
            return #err("Unauthorized");
        };
        switch (user) {
            case (#ok(user)) {
                let groupMem = Vector.Vector<Principal>();
                groupMem.add(userCreator);
                let newGroup : Group = {
                    id = newId;
                    creatorUser = userCreator;
                    groupName = groupName;
                    timestamp = Time.now();
                    groupMembers = Vector.toArray(groupMem);
                    messages = [];
                };
                // newGroup.groupMembers.add(userCreator);
                groups.put(newId, newGroup);
                return #ok();
            };
            case (#err(errorMsg)) {
                return #err("Failed to create group!");
            };
        };
    };

    public query func checkResult (result: Result.Result<(), Text>): async Bool{
        switch(result){
            case(#ok(result)){
                return true;
            };
            case (#err(errorMsg)){
                return false;
            };
        };
    };

    public shared func deleteAllGroup(): async Result.Result<Text, Text> {
        for(group in groups.vals()){
            ignore groups.remove(group.id);
        };
        return #ok("Deleted successfully");
    };

    // generate dummy data for groups
    public shared func generateDummyGroup(userCreator: Principal) : async Result.Result<(), Text>{

        if (Principal.isAnonymous(userCreator)) {
            return #err("Unauthorized");
        };
        ignore await deleteAllGroup();
        var test = await createGroup("Nihility", userCreator);
        if (await checkResult(test)){
            test := await createGroup("Erudition", userCreator);
            if(await checkResult(test)){
                test := await createGroup("Abundance", userCreator);
                if(await checkResult(test)){
                    return #ok();
                } else{
                    return #err("Error in generating");
                }
            } else {
                return #err("Error in generating");
            }
        } else {
            return #err("Error in generating");
        };
        // createGroup("Erudition", userCreator);
        // createGroup("Abundance", userCreator);
    };

    public shared query func getGroupById(groupId : Text): async Result.Result<Group, Text>{
        let group = groups.get(groupId);
        switch(group){
            case(?group){
                return #ok(group);
            };
            case (null){
                return #err("Failed to get group");
            };
        };
    };

    // Create Chat with user inputs
    public shared func createChat(newChat : Text, userId : Principal) : async Result.Result<Chat, Text> {
        let newId = await generateUUID();
        let groupId = currGroup;
        let user_id = userId;

        if (Principal.isAnonymous(user_id)) {
            return #err("Unauthorized");
        };

        // get user
        let currUser = await User.getUserById(user_id);
        // let currGroup = await getGroupById(groupId);
        switch (currUser) {
            case (#ok(currUser)) {
                let chat : Chat = {
                    id = newId;
                    timestamp = Time.now();
                    status = "delivered";
                    user = userId;
                    message = newChat;
                };
                let group = await getGroupById(groupId);
                switch(group){
                    case (#ok(group)){
                        let chats = group.messages;
                        let newChat = Array.append<Chat>(chats, [chat]);
                        let newGroup : Group = {
                            id = group.id;
                            creatorUser = group.creatorUser;
                            groupName = group.groupName;
                            timestamp = group.timestamp;
                            groupMembers = group.groupMembers;
                            messages = newChat;
                        };
                        groups.put(groupId, newGroup);
                    };
                    case (#err(msg)){
                        return #err("Group error");
                    };
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

    // buat ambil chat semua
    public shared func getAllChats() : async Result.Result<[(Text, Text, Int)], Text> {
        var allChats = Vector.Vector<(Text, Text, Int)>();

        for (chat in chats.vals()) {
            let sender = await User.getUserById(chat.user);
                var senderName = "";
                switch(sender){
                    case (#ok(sender)){
                        senderName := sender.name;
                    };
                    case (#err(msg)){
                        senderName := "Not found!";
                    };
                };
            allChats.add(senderName, chat.message, chat.timestamp);
        };

        return #ok(Vector.toArray(allChats));
    };

    // buat ambil chat per group
    public shared func getAllChatsAccordingToGroup() : async Result.Result<[(Text, Text, Int)], Text> {
        let groupId = currGroup;
        var allChats = Vector.Vector<(Text, Text, Int)>();
        let group = groups.get(groupId);
        switch(group){
            case (?group){
                for (chat in group.messages.vals()) {
                    // if (chat.groupId == groupId) {
                        let sender = await User.getUserById(chat.user);
                        var senderName = "";
                        switch(sender){
                            case (#ok(sender)){
                                senderName := sender.name;
                            };
                            case (#err(msg)){
                                senderName := "Not found!";
                            };
                        };
                        allChats.add(senderName, chat.message, chat.timestamp);
                    // };
                };
            };
            case (null){

            };
        };

        return #ok(Vector.toArray(allChats));
    };
    public shared query func getAllGroups() : async Result.Result<[(Text, Text, Text)], Text> {
        var allGroups = Vector.Vector<(Text, Text, Text)>();

        for (group in groups.vals()) {
            // if (group.groupId == groupId) {
            let size = Array.size(group.messages);
            if(size != 0){
                let msg = group.messages[0].message;
                allGroups.add(group.groupName, msg, group.id);
            }
            else{
                let msg = "";
                allGroups.add(group.groupName, msg, group.id);
            };
            // };
        };

        return #ok(Vector.toArray(allGroups));
    };
};
