import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined, } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/state";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";


const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const [isComments, setIsComments] = useState(false);
    const loggedInUserId = useSelector(state => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    // const [isLiked,setIsLiked]=useState(false);
    // const isLiked = true;
    const likeCount = Object.keys(likes).length;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        // setIsLiked(true);
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }

    return (
        <WidgetWrapper sx={{backgroundColor:"white"}}>
            <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />
            <Typography color="black" fontWeight="500" sx={{ mt: "1rem" }}>{description}</Typography>
            {postUserId}
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: "red" }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: "black", pl: "0.5rem" }}>
                                {comment} <hr/>
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper> 
    )
};

export default PostWidget;