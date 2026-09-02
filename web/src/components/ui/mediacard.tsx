import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface MediaCardProps {
  name: string;
  image: string;
  type: string;
  address: string;
  description: string;
}

export default function MediaCard({
  name,
  image,
  type,
  address,
  description,
}: MediaCardProps) {
  return (
    <Card
      sx={{
        width: {
          sm: 300,
          md: 360,
          lg: 380,
          xl: 420,
        },
        maxWidth: "500px",
        height: {
          sm: 300,
          md: 360,
          lg: 380,
          xl: 370,
        },
        margin: "0 auto",
        transition: "transform 250ms ease, box-shadow 250ms ease",
        "&:hover": {
          transform: "translateY(-8px) scale(1.04)",
          boxShadow: "0 18px 35px rgba(0, 0, 0, 0.22)",
        },
      }}
    >
      <CardMedia
        sx={{ height: 150 }}
        image={image}
        title={name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <b>{name}</b>
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <span>
            <b>Type:</b> {type}
          </span>
          <br />

          <span>
            <b>Address:</b> {address}
          </span>
          <br />

          <span>
            <b>Description:</b> {description}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}