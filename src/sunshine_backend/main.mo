import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import None "mo:base/None";
import Vector "mo:vector/Class";
import Fuzz "mo:fuzz";

actor Database{
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
   };
  let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  public query func tryFuzz(): async (){
    let fuzz = Fuzz.Fuzz();
    let generateAmount = fuzz.nat.randomRange(4, 11);
    Debug.print(debug_show(generateAmount));
    // return "test";
  };

  public shared (msg) func register(name : Text, email : Text, birth_date : Text) : async Result.Result<User, Text> {

      let user_id = msg.caller;

      if (users.get(user_id) != null) {
         return #err("User already exists");
      };

      for (user in users.vals()) {
         if (user.email == email) {
            return #err("Email already exists");
         };
      };

      let user = {
         internet_identity = user_id;
         name = name;
         email = email;
         birth_date = birth_date;
         selected_company_id = null;
         timestamp = Time.now();
      };

      users.put(user.internet_identity, user);

      return #ok(user);
   };
  public shared query func getAllUsers() : async Result.Result<[User], Text> {

      var allUsers = Vector.Vector<User>();

      for (user in users.vals()) {
         allUsers.add(user);
      };

      return #ok(Vector.toArray(allUsers));
   };

};
