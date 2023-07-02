// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// import { Box, IconButton, Typography} from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setFriends } from "../state/state";
// import FlexBetween from "./FlexBetween";
// import UserImage from "./UserImage";

// const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { _id } = useSelector((state) => state.user);
//     const token = useSelector((state) => state.token);
//     const friends = useSelector((state) => state.user.friends);

//     // const isFriend=friends.find((friend)=>friend._id===friendId);
//     console.log(friends);
//     const isFriend = friends.find((friend) => friend._id === friendId);
//     const patchFriend=async()=>{
//         const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
//             method: "PATCH",
//             headers: { Authorization: `Bearer ${token}`,"Content-Type":"application/json" },
//         });
//         const data = await response.json();
//         dispatch(setFriends({ friends: data }));
//     };

//     return(
//         <FlexBetween>
//             <FlexBetween gap="1rem">
//                 <UserImage image={userPicturePath} size="55px"/>
//                 <Box onClick={()=>{
//                     navigate(`/profile/${friendId}`);
//                     navigate(0);
//                 }}>
//                 <Typography 
//                     color="black" variant="h6" fontWeight="550" sx={{"&:hover":{color:"blue",cursor:"pointer"}}}
//                 >
//                     {name}
//                 </Typography>
//                 <Typography color="grey" fontSize="0.75rem">{subtitle}</Typography>
//                 </Box>
//             </FlexBetween>
//             <IconButton onClick={()=>patchFriend()} sx={{backgroundColor:"lightblue",p:"0.6rem"}}>
//                 {isFriend?(
//                     <PersonRemoveOutlined sx={{color:"black"}}/>
//                 ):(
//                     <PersonAddOutlined sx={{color:"black"}}/>
//                 )
//                 }
//             </IconButton>
//         </FlexBetween>
//     )
// }

// export default Friend; 




import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  
  const isFriend = Array.from(friends).find((friend) => friend._id === friendId);
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color="Black"
            variant="h6"
            fontWeight="550"
            sx={{
              "&:hover": {
                color: "green",
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color="grey" fontSize="0.75rem" fontWeight="550">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor:"lightblue", p: "0.6rem" }}
      >
        {!!isFriend ? (
          <PersonRemoveOutlined sx={{ color:"green" }} />
        ) : (
          <PersonAddOutlined sx={{ color: "green" }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
