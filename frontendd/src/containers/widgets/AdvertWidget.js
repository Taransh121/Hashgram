import { Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget=()=>{
    return(
        <WidgetWrapper sx={{backgroundColor:"white"}}>
            <FlexBetween>
                <Typography color="black" variant="h6" fontWeight="550">
                Sponsored
                </Typography>
                <Typography color="black">Create Ad</Typography>
            </FlexBetween>
            <img height="auto" width="100%" alt="advert" src="http://localhost:3001/assets/info4.jpeg" 
            style={{borderRadius:"0.75rem",margin:"0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color="blue">MikaCosmetics</Typography>
                <Typography color="blue">MiksCosmetics.com</Typography>
            </FlexBetween>
            <Typography color="black" margin="0.5rem 0">Experience the radiance within with our luxurious skincare line, revealing your natural beauty and empowering your confidence.</Typography>
        </WidgetWrapper>
    )
}
export default AdvertWidget;