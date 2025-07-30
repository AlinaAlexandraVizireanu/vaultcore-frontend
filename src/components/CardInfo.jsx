import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function CardInfo({ title, image, text, onClick }) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" image={image} alt="stock market" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
