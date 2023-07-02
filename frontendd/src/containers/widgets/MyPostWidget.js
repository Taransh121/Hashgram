import { EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, Button, IconButton, useMediaQuery } from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setPosts } from "../../state/state";
import WidgetWrapper from "../../components/WidgetWrapper";


const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(true);
    // const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(false);
    const [post, setPost] = useState("");
    const { _id } = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name)
        }
        const response = await fetch(`http://localhost:3001/posts/create`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    }

    return (
        <WidgetWrapper sx={{backgroundColor:"white"}}>
            <FlexBetween  gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase placeholder="Whats on your mind..." onChange={(e) => setPost(e.target.value)} value={post}
                    sx={{ width: "100%", backgroundColor: "#f0f0f0", borderRadius: "2rem", padding: "1rem 2rem" }}
                />
            </FlexBetween>
            {isImage && (
                <>
                <Box
                    border={`1px solid grey`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed blue `}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
                </>
            )}
            <Divider sx={{ margin: "1.25rem 0" }} />
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: "grey" }} />
                    <Typography color="grey" sx={{ "&:hover": { cursor: "pointer", color: "black" } }}>
                        Image
                    </Typography>
                </FlexBetween>
                {isNonMobileScreen ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: "grey" }} />
                            <Typography color="grey">Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: "grey" }} />
                            <Typography color="grey">Attachment</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: "grey" }} />
                            <Typography color="grey">Audio</Typography>
                        </FlexBetween>
                    </>
                ) :
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: "red" }} />
                    </FlexBetween>
                }

                <Button disabled={!post} onClick={handlePost}
                sx={{ color: "green", backgroundColor: "lightblue", borderRadius: "3rem", "&:hover": { cursor: "pointer" ,color: "black", backgroundColor: "#1976d2" }}}
                >POST</Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget;