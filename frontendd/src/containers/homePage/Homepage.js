import React from 'react';
import {Navbar} from '../Navbar/Navbar';
import {Box, useMediaQuery} from "@mui/material";
import { useSelector } from 'react-redux';
import UserWidget from '../widgets/UserWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidgets';
import AdvertWidget from '../widgets/AdvertWidget';
import FriendListWidget from '../widgets/FriendListWidget';

export const Homepage = () => {
  const isNonMobileScreen=useMediaQuery("(min-width:1000px)");
  const { _id,picturePath}=useSelector((state)=>state.user);
  return (
    <Box sx={{backgroundColor:"#f6f6f6"}}>
      <Navbar/>
      <Box width="100%" padding="2rem 6%" display={isNonMobileScreen ? "flex" : "block"} gap="0.5rem" justifyContent="space-between">
        <Box flexBasis={isNonMobileScreen ? "26%" :undefined}>
          <UserWidget userId={_id} picturePath={picturePath}/>
        </Box>
        <Box
        flexBasis={isNonMobileScreen ? "42%" :undefined} mt={isNonMobileScreen?undefined:"2rem"}
        >
          <MyPostWidget picturePath={picturePath} /> <br/>
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen && <Box flexBasis="26%">
        <AdvertWidget/>
        <Box m="2rem 0"/>
        <FriendListWidget userId={_id}/>
        </Box>}
      </Box>
    </Box>
      
  )
}
