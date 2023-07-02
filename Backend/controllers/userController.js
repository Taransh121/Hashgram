const User=require("../models/User.js");

exports.getUser=async(req,res)=>{
    try {
        const {id}=req.params;  //we will grab the id from the params(string)(url).
        const user=await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}


exports.getUserFriends = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };


// exports.addRemoveFriend = async (req, res) => {
//     try {
//       const { id, friendId } = req.params;
//       // console.log(req.params)
//       const user = await User.findById(id);
//       const friend = await User.findById(friendId);
//       // console.log(user);
//       console.log("a")
//       console.log(friendId)
//       const user_friend_list = Array.from(user.friends)
//       // console.log(user_friend_list)
//       console.log(friend.friends);
//       const friend_friend_list = Array.from(friend.friends)
//       // console.log(friend_friend_list);
//       // console.log( friend_list,"asasasasas");
//       // console.log(req.params.id);
//       // console.log(req.params.friendId);
//   console.log("b")
//       if (user_friend_list.includes(friendId)) {
//         user.friends = user_friend_list.filter((id) => id !== friendId);
//         friend.friends = friend_friend_list.filter((id) => id !== id);
//       } else {
//         user_friend_list.push(friendId);
//         user.friends = user_friend_list;
//         friend_friend_list.push(id);
//         friend.friends = friend_friend_list;
//       }
//       await user.save();
//       await friend.save();
  
//       // const friends = await Promise.all(
//       //   user_friend_list.map((id) => User.findById(id))
//       // );
//       console.log(user_friend_list, "ufl")
//       // console.log(friends, "asasa")
//       const formattedFriends = user_friend_list.map(
//         ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//           return { _id, firstName, lastName, occupation, location, picturePath };
//         }
//       );
  
//       res.status(200).json(formattedFriends);
//     } catch (err) {
//       res.status(404).json({ message: err.message });
//     }
//   };


exports.addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};