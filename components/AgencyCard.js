/* reference for material ui components used
https://mui.com/material-ui/react-card/#media

*/

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { CardActionArea } from "@mui/material";

export default function AgencyCard(props) {
  const router = useRouter();

  const naviateToAgencyPage = () => {
    router.push(`/agency/${props.id}`);
  };
  return (
    <Card sx={{ marginTop: "8px", maxWidth: 345 }}>
      <CardActionArea onClick={naviateToAgencyPage}>
        {props.imageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={props.imageUrl}
            alt="green iguana"
          />
        )}
        <CardContent>
          <Typography variant="h5" component="div">
            {props.localized_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
