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
        variant : Text;
    };

    // type
    type Friend = {
        user1 : Principal;
        user2 : Principal;
        messages : [Chat];
    };

    type Group = {
        id : Text;
        imageUrl : Text;
        description : Text;
        creatorUser : Principal;
        groupName : Text;
        timestamp : Time.Time;
        groupMembers : [Principal];
        messages : [Chat];
    };

    let groups = TrieMap.TrieMap<Text, Group>(Text.equal, Text.hash);
    let chats = TrieMap.TrieMap<Text, Chat>(Text.equal, Text.hash);
    let friends = Vector.Vector<Friend>();
    // var currGroup = "";

    // changing currentGroup
    // public shared func focusGroup(groupId: Text): async Result.Result<Text, Text> {
    //     // let group = groups.get(groupId);
    //     currGroup := groupId;
    //     return #ok("Group Changed");
    // };

    // getting current group
    // public shared func getCurrentGroup(): async Result.Result<Text, Text> {
    //     let group = groups.get(currGroup);
    //     switch(group){
    //         case (?group){
    //             return #ok(currGroup);
    //         };
    //         case (null){
    //             return #err("Error fetching current group!");
    //         };
    //     };
    // };

    // generate UUID
    public shared func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    };

    // bikin group
    public shared func createGroup(groupName : Text, userCreator : Principal, description : Text, imageUrl : Text) : async Result.Result<(), Text> {
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
                    description = description;
                    timestamp = Time.now();
                    groupMembers = Vector.toArray(groupMem);
                    messages = [];
                    imageUrl = imageUrl;
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

    public query func checkResult(result : Result.Result<(), Text>) : async Bool {
        switch (result) {
            case (#ok(result)) {
                return true;
            };
            case (#err(errorMsg)) {
                return false;
            };
        };
    };

    public shared func deleteAllGroup() : async Result.Result<Text, Text> {
        for (group in groups.vals()) {
            ignore groups.remove(group.id);
        };
        return #ok("Deleted successfully");
    };

    // generate dummy data for groups
    // public shared func generateDummyGroup(userCreator: Principal) : async Result.Result<(), Text>{

    //     if (Principal.isAnonymous(userCreator)) {
    //         return #err("Unauthorized");
    //     };
    //     ignore await deleteAllGroup();
    //     var test = await createGroup("Nihility", userCreator, "Nihility Group");
    //     if (await checkResult(test)){
    //         test := await createGroup("Erudition", userCreator, "Erudition Group");
    //         if(await checkResult(test)){
    //             test := await createGroup("Abundance", userCreator, "Abundance Group");
    //             if(await checkResult(test)){
    //                 return #ok();
    //             } else{
    //                 return #err("Error in generating");
    //             }
    //         } else {
    //             return #err("Error in generating");
    //         }
    //     } else {
    //         return #err("Error in generating");
    //     };
    //     // createGroup("Erudition", userCreator);
    //     // createGroup("Abundance", userCreator);
    // };

    public shared query func getGroupById(groupId : Text) : async Result.Result<Group, Text> {
        let group = groups.get(groupId);
        switch (group) {
            case (?group) {
                return #ok(group);
            };
            case (null) {
                return #err("Failed to get group");
            };
        };
    };

    // Create group Chat with user inputs
    public shared func createChat(newChat : Text, userId : Principal, currGroup : Text) : async Result.Result<Chat, Text> {
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
                    variant = "chat";
                    message = newChat;
                };
                let group = await getGroupById(groupId);
                switch (group) {
                    case (#ok(group)) {
                        let chats = group.messages;
                        let newChat = Array.append<Chat>(chats, [chat]);
                        let newGroup : Group = {
                            id = group.id;
                            creatorUser = group.creatorUser;
                            groupName = group.groupName;
                            description = group.description;
                            timestamp = group.timestamp;
                            groupMembers = group.groupMembers;
                            messages = newChat;
                            imageUrl = group.imageUrl;
                        };
                        groups.put(groupId, newGroup);
                    };
                    case (#err(msg)) {
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

    public shared func addGroupMember(newUser : Principal, groupId : Text) : async Result.Result<Text, Text> {
        // let newId = await generateUUID();
        // let user_id = userId;

        if (Principal.isAnonymous(newUser)) {
            return #err("Unauthorized");
        };

        // get user
        let currUser = await User.getUserById(newUser);
        // let currGroup = await getGroupById(groupId);
        switch (currUser) {
            case (#ok(currUser)) {
                let group = await getGroupById(groupId);
                switch (group) {
                    case (#ok(group)) {
                        let oldUsers = group.groupMembers;
                        let newUsers = Array.append<Principal>(oldUsers, [newUser]);
                        let newGroup : Group = {
                            id = group.id;
                            creatorUser = group.creatorUser;
                            groupName = group.groupName;
                            description = group.description;
                            timestamp = group.timestamp;
                            groupMembers = newUsers;
                            messages = group.messages;
                            imageUrl = group.imageUrl;
                        };
                        groups.put(groupId, newGroup);
                    };
                    case (#err(msg)) {
                        return #err("Group error");
                    };
                };
                // chats.put(newId, chat);
                return #ok("Joined successfully");

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
    // public shared func getAllChats() : async Result.Result<[(Text, Text, Int)], Text> {
    //     var allChats = Vector.Vector<(Text, Text, Int)>();

    //     for (chat in chats.vals()) {
    //         let sender = await User.getUserById(chat.user);
    //             var senderName = "";
    //             switch(sender){
    //                 case (#ok(sender)){
    //                     senderName := sender.name;
    //                 };
    //                 case (#err(msg)){
    //                     senderName := "Not found!";
    //                 };
    //             };
    //         allChats.add(senderName, chat.message, chat.timestamp);
    //     };

    //     return #ok(Vector.toArray(allChats));
    // };

    // buat ambil chat per group
    public shared func getAllChatsAccordingToGroup(currGroup : Text) : async Result.Result<[(Text, Text, Int, Principal, Text)], Text> {
        let groupId = currGroup;
        var allChats = Vector.Vector<(Text, Text, Int, Principal, Text)>();
        let group = groups.get(groupId);
        switch (group) {
            case (?group) {
                for (chat in group.messages.vals()) {
                    // if (chat.groupId == groupId) {
                    let sender = await User.getUserById(chat.user);
                    var senderName = "";
                    var senderPrinciple = chat.user;
                    var senderPfp = "";
                    switch (sender) {
                        case (#ok(sender)) {
                            senderName := sender.name;
                            senderPfp := sender.profileUrl;
                        };
                        case (#err(msg)) {
                            senderName := "Not found!";
                        };
                    };
                    allChats.add(senderName, chat.message, chat.timestamp, senderPrinciple, senderPfp);
                    // };
                };
            };
            case (null) {

            };
        };

        return #ok(Vector.toArray(allChats));
    };

    func isJoinedGroup(group : Group, currUser : Principal) : Bool {
        let joinedUsers : Vector.Vector<Principal> = Vector.fromArray(group.groupMembers);
        let isJoined = Vector.indexOf<Principal>(currUser, joinedUsers, Principal.equal);
        switch (isJoined) {
            case (null) {
                return false;
            };
            case (?isJoined) {
                return true;
            };
        };
    };

    public shared func getAllGroups(groupName : Text, currUser : Principal) : async Result.Result<[(Text, Text, Text, Text)], Text> {
        var allGroups = Vector.Vector<(Text, Text, Text, Text)>();
        for (group in groups.vals()) {
            // if (group.groupId == groupId) {
            let joined = isJoinedGroup(group, currUser);
            let contains = containsInsensitive(group.groupName, groupName);
            if (contains and joined) {
                let size = Array.size(group.messages);
                if (size != 0) {
                    let message = group.messages[size -1];
                    let msgContent = message.message;
                    let username = await User.getName(message.user);
                    let msg = username # " : " # msgContent;
                    allGroups.add(group.groupName, msg, group.id, group.imageUrl);
                } else {
                    let msg = "";
                    allGroups.add(group.groupName, msg, group.id, group.imageUrl);
                };
            };
            // };
        };

        return #ok(Vector.toArray(allGroups));
    };

    func containsInsensitive(text : Text, pattern : Text) : Bool {
        let lowerText = Text.toLowercase(text);
        let lowerPattern = Text.toLowercase(pattern);
        return Text.contains(lowerText, #text lowerPattern);
    };

    public shared query func getAllUnjoinedGroups(groupSearched : Text, currUser : Principal) : async Result.Result<[(Text, Text, Text, Text)], Text> {
        var allGroups = Vector.Vector<(Text, Text, Text, Text)>();
        if (groupSearched == "") {
            return #err("No group searched");
        };
        for (group in groups.vals()) {
            // if (group.groupId == groupId) {
            let contains = containsInsensitive(group.groupName, groupSearched) or containsInsensitive(group.description, groupSearched);
            let joined = isJoinedGroup(group, currUser);
            if (contains and (not joined)) {
                // let size = Array.size(group.messages);
                // if(size != 0){
                //     let msg = group.messages[size-1].message;
                allGroups.add(group.groupName, group.description, group.id, group.imageUrl);
                // }
                // else{
                //     let msg = "";
                //     allGroups.add(group.groupName, msg, group.id);
                // };
            };
            // };
        };

        return #ok(Vector.toArray(allGroups));
    };

    // getting all friends
    public shared func getAllFriends(currUser : Principal) : async Result.Result<[User.User], Text> {
        let friendsList = Vector.Vector<User.User>();
        for (friend in friends.vals()) {
            // var userFriend: ?User.User = null;
            if (friend.user1 == currUser) {
                let userFriend = await User.getUserById(friend.user2);
                switch (userFriend) {
                    case (#ok(userFriend)) {
                        friendsList.add(userFriend);
                    };
                    case (#err(msg)) {
                        return #err("failed fetching user");
                    };
                };
            } else if (friend.user2 == currUser) {
                let userFriend = await User.getUserById(friend.user1);
                switch (userFriend) {
                    case (#ok(userFriend)) {
                        friendsList.add(userFriend);
                    };
                    case (#err(msg)) {
                        return #err("failed fetching user");
                    };
                };
            };
        };
        return #ok(Vector.toArray(friendsList));
    };

    // get friend box
    public shared query func getFriendBox(user1 : Principal, user2 : Principal) : async Result.Result<Friend, Text> {
        for (friend in friends.vals()) {
            if (friend.user1 == user1 and friend.user2 == user2) {
                return #ok(friend);
            } else if (friend.user2 == user1 and friend.user1 == user2) {
                return #ok(friend);
            };
        };
        return #err("Not found");
    };

    func friendEqual(friend1 : Friend, friend2 : Friend) : Bool {
        return friend1.user1 == friend2.user1 and friend1.user2 == friend2.user2 and friend1.messages == friend2.messages;
    };

    // creating a chat on friend chatbox
    public shared func createFriendChat(userSender : Principal, user2 : Principal, message : Text) : async Result.Result<Text, Text> {
        let newId = await generateUUID();
        let friendBox = await getFriendBox(userSender, user2);
        switch (friendBox) {
            case (#err(msg)) {
                return #err("Failed to create message");
            };
            case (#ok(friendBox)) {
                let chat : Chat = {
                    id = newId;
                    timestamp = Time.now();
                    status = "delivered";
                    user = userSender;
                    variant = "chat";
                    message = message;
                };
                let chats = friendBox.messages;
                let newChat = Array.append<Chat>(chats, [chat]);
                let newFriendBox : Friend = {
                    user1 = friendBox.user1;
                    user2 = friendBox.user2;
                    messages = newChat;
                };
                let index = Vector.indexOf<Friend>(friendBox, friends, friendEqual);
                switch (index) {
                    case (null) {
                        return #err("Error in finding index");
                    };
                    case (?index) {
                        friends.put(index, newFriendBox);
                        return #ok("Successfully added chat");
                    };
                };
                // groups.put(groupId, newGroup);
            };
        };
        // chats.put(newId, chat);
        // return #ok(chat);
    };

    public shared func addFriend(user1 : Principal, user2 : Principal) : async Result.Result<Text, Text> {
        // groupMem.add(userCreator);
        if(Principal.isAnonymous(user1) or Principal.isAnonymous(user2)){
            return #err("Unauthorized!");
        };
        let newFriendBox : Friend = {
            user1 = user1;
            user2 = user2;
            messages = [];
        };
        // newGroup.groupMembers.add(userCreator);
        friends.add(newFriendBox);
        return #ok("Successfully added");
    };
};
