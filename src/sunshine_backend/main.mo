import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";
import Vector "mo:vector/Class";
import Fuzz "mo:fuzz";

actor {
   // lg mencoba bikin data user :(
   public query func greet(name : Text) : async Text {
      return "Hello, " # name # "!";
   };
   // let fuzz = Fuzz.Fuzz();
   // let generateAmount = fuzz.nat.randomRange(4, 11);
   type User = {
      internet_identity : Principal;
      name : Text;
      email : Text;
      birth_date : Text;
      timestamp : Time.Time;
      money : Nat;
      profileUrl : Text;
   };

   

   let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

   public query func tryFuzz() : async () {
      let fuzz = Fuzz.Fuzz();
      let generateAmount = fuzz.nat.randomRange(4, 11);
      Debug.print(debug_show (generateAmount));
      // return "test";
   };

   // get current user's name
   public query func getName(userId: Principal) : async Text {
      // Debug.print(debug_show (msg.caller));
      let user : ?User = users.get(userId);
      switch (user) {
         case (?user) {
            return user.name;
         };
         case (null) {
            return "Stranger";
         };

      };
   };

   public shared query func getPfp(userId: Principal) : async Text {
      // Debug.print(debug_show (msg.caller));
      let user : ?User = users.get(userId);
      switch (user) {
         case (?user) {
            return user.profileUrl;
         };
         case (null) {
            return "Stranger";
         };

      };
   };

   func containsInsensitive(text : Text, pattern : Text) : Bool {
        let lowerText = Text.toLowercase(text);
        let lowerPattern = Text.toLowercase(pattern);
        return Text.contains(lowerText, #text lowerPattern);
    };

    func isSameUser(user1: User, user2: User): Bool {
      return user1.internet_identity == user2.internet_identity;
    };

   public query func searchByName (name: Text): async Result.Result<[User], Text> {
      var allUsers = Vector.Vector<User>();
      for (user in users.vals()){
         if(containsInsensitive(user.name, name)){
            allUsers.add(user);
         };
      };
      return #ok(Vector.toArray(allUsers));
   };

   public  func getParticipantsName(participants : [Principal]) : async [Text]{
      var participantsName = Vector.Vector<Text>();
      for (user in participants.vals()){
         participantsName.add(await getName(user));
      };
      return Vector.toArray(participantsName);
   };

   // get user object by ID
   public query func getUserById(userId : Principal) : async Result.Result<User, Text> {
      let user = users.get(userId);
      switch (user) {
         case (?user) {
            return #ok(user);
         };
         case (null) {
            return #err("User not found!");
         };
      };
   };

   // get username by ID
   public shared query func getUsernameById(userId : Principal) : async Result.Result<Text, Text> {
      let user = users.get(userId);
      switch (user) {
         case (?user) {
            return #ok(user.name);
         };
         case (null) {
            return #err("User not found!");
         };
      };
   };

   // update user
   public func updateUser(userId : Principal, name : Text, email : Text, birth_date : Text, profileUrl : Text) : async Bool {
      let user = users.get(userId);
      switch (user) {
         case (?user) {
            let newUser : User = {
               internet_identity = userId;
               name = name;
               email = email;
               birth_date = birth_date;
               timestamp = user.timestamp;
               money = user.money;
               profileUrl = profileUrl;
            };
            users.put(userId, newUser);
            return true;
         };
         case (null) {
            return false;
         };
      };

   };

   // ambil principal /user ID basically
   public shared query (msg) func whoami() : async Principal {
      msg.caller;
   };

   // inserting data into array
   public shared (msg) func register(name : Text, email : Text, birth_date : Text, profileUrl : Text) : async Bool {

      let user_id = msg.caller;

      if (users.get(user_id) != null) {
         return false;
      };

      for (user in users.vals()) {
         if (user.email == email) {
            return false;
         };
      };

      let user : User = {
         internet_identity = user_id;
         name = name;
         email = email;
         birth_date = birth_date;
         timestamp = Time.now();
         money = 50000;
         profileUrl = profileUrl;
      };

      users.put(user.internet_identity, user);

      return true;
   };

   // masih cacat :)
   public shared query func getAllUsers() : async Result.Result<[User], Text> {

      var allUsers = Vector.Vector<User>();

      for (user in users.vals()) {
         allUsers.add(user);
      };

      return #ok(Vector.toArray(allUsers));
   };
   // public shared (msg) func register(name : Text, email : Text, birth_date : Text) : async Result.Result<User, Text> {

   //    let user_id = msg.caller;

   //    if (users.get(user_id) != null) {
   //       return #err("User already exists");
   //    };

   //    for (user in users.vals()) {
   //       if (user.email == email) {
   //          return #err("Email already exists");
   //       };
   //    };

   //    let user = {
   //       internet_identity = user_id;
   //       name = name;
   //       email = email;
   //       birth_date = birth_date;
   //       selected_company_id = null;
   //       timestamp = Time.now();
   //    };

   //    users.put(user.internet_identity, user);

   //    return #ok(user);
   // };
};
