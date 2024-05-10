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
        gameType : Text;
        participants : [Principal];
        scores : [Nat];
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
                    gameType = "";
                    participants = [];
                    scores = [];
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

    public shared func getAllChatsAndGamesAccordingToGroup(currGroup : Text) : async Result.Result<[(Text, Text, Principal, Time.Time, Text, Text, Text, [Text], [Nat], Text, Text)], Text> {
        let groupId = currGroup;
        var allChats = Vector.Vector<(Text, Text, Principal, Time.Time, Text, Text, Text, [Text], [Nat], Text, Text)>();
        let group = groups.get(groupId);
        switch (group) {
            case (?group) {
                for (chat in group.messages.vals()) {
                    // if (chat.groupId == groupId) {
                    let name = await User.getName(chat.user);
                    let participantsName = await User.getParticipantsName(chat.participants);
                    let pfp = await User.getPfp(chat.user);
                    allChats.add(chat.id, chat.message, chat.user, chat.timestamp, chat.status, chat.variant, chat.gameType, participantsName, chat.scores, name, pfp);
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

    // checking if two users are friends or not
    public func isFriends(user1 : Principal, user2 : Principal) : async Result.Result<Bool, Text> {
        let allFriends = await getAllFriends(user1);
        switch (allFriends) {
            case (#ok(allFriends)) {
                // for (user in allFriends.vals()) {
                //     // user tidak ada di friendlist
                let userTarget = await User.getUserById(user2);
                switch (userTarget) {
                    case (#ok(userTarget)) {
                        if (Vector.indexOf<User.User>(userTarget, Vector.fromArray(allFriends), isSameUser) != null) {
                            // allNotFriend.add(user);
                            return #ok(true);
                        } else {
                            return #ok(false);
                        };
                    };
                    case (#err(msg)) {
                        return #err(msg);
                    };
                };
                // };
            };
            case (#err(msg)) {
                return #err(msg);
            };
        };
    };

    // comparison function for indexOf
    func isSameUser(user1 : User.User, user2 : User.User) : Bool {
        return user1.internet_identity == user2.internet_identity;
    };

    // get all unadded friends
    public func getAllUnaddedFriends(friendSearched : Text, currUser : Principal) : async Result.Result<[User.User], Text> {
        if (friendSearched == "") {
            return #err("No friend searched");
        };
        let allNotFriend = Vector.Vector<User.User>();
        let allUsers = await User.searchByName(friendSearched);
        switch (allUsers) {
            case (#ok(allUsers)) {
                let allFriends = await getAllFriends(currUser);
                switch (allFriends) {
                    case (#ok(allFriends)) {
                        for (user in allUsers.vals()) {
                            // user tidak ada di friendlist
                            if (Vector.indexOf<User.User>(user, Vector.fromArray(allFriends), isSameUser) == null) {
                                allNotFriend.add(user);
                            };
                        };
                        return #ok(Vector.toArray(allNotFriend));
                    };
                    case (#err(msg)) {
                        return #err(msg);
                    };
                };
            };
            case (#err(msg)) {
                return #err(msg);
            };
        };
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
                    gameType = "";
                    participants = [];
                    scores = [];
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
        if (Principal.isAnonymous(user1) or Principal.isAnonymous(user2)) {
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

    public shared func createGame(groupId : Text, userCreator : Principal, gameType : Text) : async Result.Result<(), Text> {
        let newId = await generateUUID();
        let user = await User.getUserById(userCreator);
        if (Principal.isAnonymous(userCreator)) {
            return #err("Unauthorized");
        };
        switch (user) {
            case (#ok(user)) {
                let groupMem = Vector.Vector<Principal>();
                groupMem.add(userCreator);
                let newGame : Chat = {
                    id = newId;
                    timestamp = Time.now();
                    status = "delivered";
                    user = userCreator;
                    variant = "game";
                    message = "";
                    gameType = gameType;
                    participants = [];
                    scores = [];
                };
                let group = await getGroupById(groupId);
                switch (group) {
                    case (#ok(group)) {
                        let chats = group.messages;
                        let newChat = Array.append<Chat>(chats, [newGame]);
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
                chats.put(newId, newGame);
                return #ok();
            };
            case (#err(errorMsg)) {
                return #err("Failed to create game!");
            };
        };
    };

    public func getGameParticipants(gameId : Text) : async Result.Result<[Principal], Text> {
        let game = chats.get(gameId);
        switch (game) {
            case (null) {
                return #err("error");
            };
            case (?game) {
                return #ok(game.participants);
            };
        };
    };

    public func isJoinedGame(user : Principal, gameId : Text) : async Result.Result<Bool, Text> {
        let participants = await getGameParticipants(gameId);
        switch (participants) {
            case (#ok(participants)) {
                let index = Array.indexOf<Principal>(user, participants, Principal.equal);
                switch (index) {
                    case (null) {
                        return #ok(false);
                    };
                    case (?index) {
                        return #ok(true);
                    };
                };
            };
            case (#err(msg)) {
                return #err("error");
            };
        };

    };

    // comparison function for chat
    func isSameChat(chat1 : Chat, chat2 : Chat) : Bool {
        return chat1.id == chat2.id;
    };

    // joining game
    public func joinGame(groupId : Text, user : Principal, gameId : Text) : async Result.Result<(), Text> {
        let game = chats.get(gameId);
        switch (game) {
            case (?game) {
                let participants = game.participants;
                let newParticipants = Array.append<Principal>(participants, [user]);
                let newScores = Array.append<Nat>(game.scores, [0]);
                let updatedGame : Chat = {
                    id = game.id;
                    timestamp = game.timestamp;
                    status = game.status;
                    user = game.user;
                    variant = game.variant;
                    message = game.message;
                    gameType = game.gameType;
                    participants = newParticipants;
                    scores = newScores;
                };
                chats.put(gameId, updatedGame);
                let group = await getGroupById(groupId);
                switch (group) {
                    case (#ok(group)) {
                        let chatsNew : Vector.Vector<Chat> = Vector.fromArray(group.messages);
                        let oldChatIndex = Vector.indexOf<Chat>(game, chatsNew, isSameChat);
                        switch (oldChatIndex) {
                            case (?oldChatIndex) {
                                chatsNew.put(oldChatIndex, updatedGame);
                                let newGroup : Group = {
                                    id = group.id;
                                    creatorUser = group.creatorUser;
                                    groupName = group.groupName;
                                    description = group.description;
                                    timestamp = group.timestamp;
                                    groupMembers = group.groupMembers;
                                    messages = Vector.toArray(chatsNew);
                                    imageUrl = group.imageUrl;
                                };
                                groups.put(groupId, newGroup);
                                return #ok();
                            };
                            case (null) {
                                return #err("Group error");
                            };
                        };
                    };
                    case (#err(msg)) {
                        return #err("Group error");
                    };
                };
            };
            case (null) {
                return #err("error");
            };
        };
    };

    // comparison function for friendBox
    func isSameFriendBox(box1 : Friend, box2 : Friend) : Bool {
        return (box1.user1 == box2.user1 and box1.user2 == box2.user2) or (box1.user2 == box2.user1 and box1.user1 == box2.user2);
    };

    // creating game in friend chat page
    public shared func createGameFriend(userCreator : Principal, userFriend : Principal, gameType : Text) : async Result.Result<(), Text> {
        let newId = await generateUUID();
        let user = await User.getUserById(userCreator);
        if (Principal.isAnonymous(userCreator)) {
            return #err("Unauthorized");
        };
        switch (user) {
            case (#ok(user)) {
                let newGame : Chat = {
                    id = newId;
                    timestamp = Time.now();
                    status = "delivered";
                    user = userCreator;
                    variant = "game";
                    message = "";
                    gameType = gameType;
                    participants = [];
                    scores = [];
                };
                let friendBox = await getFriendBox(userCreator, userFriend);
                switch (friendBox) {
                    case (#ok(friendBox)) {
                        let chatsNew = friendBox.messages;
                        let newChat = Array.append<Chat>(chatsNew, [newGame]);
                        let newFriendBox : Friend = {
                            user1 = userCreator;
                            user2 = userFriend;
                            messages = newChat;
                        };
                        let oldIndex = Vector.indexOf<Friend>(friendBox, friends, isSameFriendBox);
                        switch (oldIndex) {
                            case (?oldIndex) {
                                friends.put(oldIndex, newFriendBox);
                                chats.put(newId, newGame);
                                return #ok();
                            };
                            case (null) {
                                return #err("no index");
                            };
                        };
                    };
                    case (#err(msg)) {
                        return #err("Group error");
                    };
                };
            };
            case (#err(errorMsg)) {
                return #err("Failed to create game!");
            };
        };
    };

    //
    public func joinGameFriend(userJoin : Principal, user2 : Principal, gameId : Text) : async Result.Result<(), Text> {
        let game = chats.get(gameId);
        switch (game) {
            case (?game) {
                let participants = game.participants;
                let newParticipants = Array.append<Principal>(participants, [userJoin]);
                let newScores = Array.append<Nat>(game.scores, [0]);
                let updatedGame : Chat = {
                    id = game.id;
                    timestamp = game.timestamp;
                    status = game.status;
                    user = game.user;
                    variant = game.variant;
                    message = game.message;
                    gameType = game.gameType;
                    participants = newParticipants;
                    scores = newScores;
                };
                chats.put(gameId, updatedGame);
                let friendBox = await getFriendBox(userJoin, user2);
                switch (friendBox) {
                    case (#ok(friendBox)) {
                        let chatsNew : Vector.Vector<Chat> = Vector.fromArray(friendBox.messages);
                        let oldChatIndex = Vector.indexOf<Chat>(game, chatsNew, isSameChat);
                        switch (oldChatIndex) {
                            case (?oldChatIndex) {
                                chatsNew.put(oldChatIndex, updatedGame);
                                let newFriendBox : Friend = {
                                    user1 = userJoin;
                                    user2 = user2;
                                    messages = Vector.toArray(chatsNew);
                                };
                                // fr.put(groupId, newGroup);
                                let oldIndex = Vector.indexOf<Friend>(friendBox, friends, isSameFriendBox);
                                switch (oldIndex) {
                                    case (?oldIndex) {
                                        friends.put(oldIndex, newFriendBox);
                                        return #ok();
                                    };
                                    case (null) {
                                        return #err("no index");
                                    };
                                };
                            };
                            case (null) {
                                return #err("Group error");
                            };
                        };
                    };
                    case (#err(msg)) {
                        return #err("Group error");
                    };
                };
            };
            case (null) {
                return #err("error");
            };
        };
    };
    public shared func sendMoney(senderId : Principal, receiverId : Principal, amount : Nat) : async Result.Result<Nat, Text> {
        if (Principal.isAnonymous(senderId)) {
            return #err("Unauthorized");
        };

        let sender = await User.getUserById(senderId);
        let receiver = await User.getUserById(receiverId);

        switch (sender) {
            case (#ok(sender)) {

                if (sender.money < amount) {
                    return #err("Failed to send money");
                };

                switch (receiver) {
                    case (#ok(receiver)) {
                        let receiverMoney = receiver.money + amount;
                        let senderMoney = sender.money - amount;

                        let receiverPrototype : User.User = {
                            internet_identity = receiver.internet_identity;
                            name = receiver.name;
                            email = receiver.email;
                            birth_date = receiver.birth_date;
                            timestamp = receiver.timestamp;
                            money = receiverMoney;
                            profileUrl = receiver.profileUrl;
                        };

                        let senderPrototype : User.User = {
                            internet_identity = sender.internet_identity;
                            name = sender.name;
                            email = sender.email;
                            birth_date = sender.birth_date;
                            timestamp = sender.timestamp;
                            money = senderMoney;
                            profileUrl = sender.profileUrl;
                        };

                        await User.putUsers(receiverPrototype);
                        await User.putUsers(senderPrototype);

                        return #ok(sender.money);
                    };
                    case (#err(msg)) {
                        return #err("Failed to get userid");
                    };
                };
            };
            case (#err(msg)) {
                return #err("Failed to get userid");
            };
        };
    };

    // update score list of the game
    public shared func updateScore(gameId : Text, user_id : Principal, score : Nat) : async Result.Result<Text, Text> {
        if (Principal.isAnonymous(user_id)) {
            return #err("Unauthorized");
        };

        let currUser = await User.getUserById(user_id);
        switch (currUser) {
            case (#ok(currUser)) {
                let game = chats.get(gameId);
                switch (game) {
                    case (?game) {
                        let index = Array.indexOf<Principal>(user_id, game.participants, Principal.equal);
                        switch (index) {
                            case (?index) {
                                let newScores : Vector.Vector<Nat> = Vector.fromArray(game.scores);
                                newScores.put(index, score);

                                let newGame : Chat = {
                                    id = game.id;
                                    timestamp = game.timestamp;
                                    status = game.status;
                                    user = game.user;
                                    variant = game.variant;
                                    message = game.message;
                                    gameType = game.gameType;
                                    participants = game.participants;
                                    scores = Vector.toArray(newScores);
                                };
                                chats.put(gameId, newGame);

                                return #ok("Successfully updated"); 
                            };
                            case (null) {
                                return #err("Index user error");
                            };
                        };
                    };
                    case (null) {
                        return #err("Game error");
                    };
                };
            };
            case (#err(error)) {
                return #err("user not found!");
            };
        };
    };
};
