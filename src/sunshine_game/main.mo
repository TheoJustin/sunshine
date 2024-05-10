import User "canister:sunshine_backend";
import Chat "canister:sunshine_chat";
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
import Fuzz "mo:fuzz";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor{
    type Game = {
        id : Text;
        gameType : Text;
        groupId : Text;
        participants : [Principal];
        scores : [Nat];
        variant : Text;
        timestamp : Time.Time;
    };

    let games = TrieMap.TrieMap<Text, Game>(Text.equal, Text.hash);
    
    // generate UUID
    public shared func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    };

    // generate random for reaction game
    public shared query func generateRandomReaction() : async Result.Result<Nat, Text> {
        let fuzz = Fuzz.Fuzz();
        let generateAmount = fuzz.nat.randomRange(1000, 5000);
        
        return #ok(generateAmount);
    };

    // bikin game
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
                let newGame : Game = {
                    id = newId;
                    gameType = gameType;
                    groupId = groupId;
                    participants = Vector.toArray(groupMem);
                    timestamp = Time.now();
                    variant = "game";
                    scores = [0];
                };
                games.put(newId, newGame);
                return #ok();
            };
            case (#err(errorMsg)) {
                return #err("Failed to create game!");
            };
        };
    };

    // get game by id
    public shared query func getGameById(gameId : Text): async Result.Result<Game, Text>{
        let game = games.get(gameId);
        switch(game){
            case(?game){
                return #ok(game);
            };
            case (null){
                return #err("Failed to get game");
            };
        };
    };

    
    // get all games
    public shared query func getAllGames(): async Result.Result<[Game], Text>{
        
        var allGames = Vector.Vector<Game>();

        for (game in games.vals()) {
            allGames.add(game);
        };

        return #ok(Vector.toArray(allGames));
    };


    // adding participants to the game
    public shared func addParticipant(gameId : Text, user_id : Principal) : async Result.Result<Game, Text> {
        if (Principal.isAnonymous(user_id)) {
            return #err("Unauthorized");
        };

        // get user
        let currUser = await User.getUserById(user_id);
    
        switch (currUser) {
            case (#ok(currUser)) {
                let game = await getGameById(gameId);
                switch(game){
                    case (#ok(game)){
                        let users = game.participants;
                        let newUsers = Array.append<Principal>(users, [user_id]);
                        let newScores = Array.append<Nat>(game.scores, [0]);
                        let newGame : Game = {
                            id = game.id;
                            gameType = game.gameType;
                            groupId = game.groupId;
                            participants = newUsers;
                            timestamp = game.timestamp;
                            variant = "game";
                            scores = newScores;
                        };
                        games.put(gameId, newGame);

                        return #ok(game);
                    };
                    case (#err(msg)){
                        return #err("Game error");
                    };
                };
            };
            case (#err(error)) {
                return #err("user not found!");
            };
        };
    };

    // update score list of the game
    public shared func updateScore(gameId : Text, user_id : Principal, score : Nat) : async Result.Result<Game, Text> {
        if (Principal.isAnonymous(user_id)) {
            return #err("Unauthorized");
        };

        let currUser = await User.getUserById(user_id);
        switch (currUser) {
            case (#ok(currUser)) {
                let game = await getGameById(gameId);
                switch(game){
                    case (#ok(game)){
                        let index = Array.indexOf<Principal>(user_id, game.participants, Principal.equal);
                        switch(index){
                            case(?index){
                                let newScores : Vector.Vector<Nat> = Vector.fromArray(game.scores);
                                newScores.put(index, score);

                                let newGame : Game = {
                                    id = game.id;
                                    gameType = game.gameType;
                                    groupId = game.groupId;
                                    participants = game.participants;
                                    timestamp = game.timestamp;
                                    variant = "game";
                                    scores = Vector.toArray(newScores);
                                };
                                games.put(gameId, newGame);

                                return #ok(game);
                            };
                            case(null){
                                return #err("Index user error");
                            }
                        }                    
                    };
                    case (#err(msg)){
                        return #err("Game error");
                    };
                };
            };
            case (#err(error)) {
                return #err("user not found!");
            };
        };
    };

    public shared query func getGamesAccordingToGroup(groupId : Text) : async Result.Result<[Game], Text> {
        var groupGames = Vector.Vector<Game>();
        for (game in games.vals()) {
            if(game.groupId == groupId){
                groupGames.add(game);

            };
        };
        return #ok(Vector.toArray(groupGames));
    };

    

}