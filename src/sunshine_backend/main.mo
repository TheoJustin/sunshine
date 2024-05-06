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
   };

   let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

   public query func tryFuzz() : async () {
      let fuzz = Fuzz.Fuzz();
      let generateAmount = fuzz.nat.randomRange(4, 11);
      Debug.print(debug_show (generateAmount));
      // return "test";
   };

   // get current user's name
   public shared query (msg) func getName() : async Text {
      Debug.print(debug_show (msg.caller));
      let user : ?User = users.get(msg.caller);
      switch (user) {
         case (?user) {
            return user.name;
         };
         case (null) {
            return "Not Found";
         };

      };
   };

   // get user object by ID
   public shared query func getUserById(userId : Principal) : async Result.Result<User, Text> {
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

   // ambil principal /user ID basically
   public shared query (msg) func whoami() : async Principal {
      msg.caller;
   };

   // inserting data into array
   public shared (msg) func register(name : Text, email : Text, birth_date : Text) : async Bool {

      let user_id = msg.caller;

      if (users.get(user_id) != null) {
         return false;
      };

      for (user in users.vals()) {
         if (user.email == email) {
            return false;
         };
      };

      let user = {
         internet_identity = user_id;
         name = name;
         email = email;
         birth_date = birth_date;
         timestamp = Time.now();
         money = 50000;
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
