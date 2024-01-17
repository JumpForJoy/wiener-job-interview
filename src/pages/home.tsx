import { useGo } from "@refinedev/core";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { Title } from "../components/title";

type TCards = {
  image: string;
  alt: string;
  title: string;
  description: string;
  path: string;
}[];

const IMAGE_HEIGHT = 200;

const cards: TCards = [
  {
    image: "/images/card-1.webp",
    alt: "Planet",
    title: "Planets",
    description: "Check out the planets from Star Wars movies.",
    path: "/planets",
  },
  {
    image: "/images/card-2.jpeg",
    alt: "People",
    title: "People",
    description: "Get to know the people and other creatures.",
    path: "/people",
  },
  {
    image: "/images/card-3.jpg",
    alt: "Species",
    title: "Species",
    description: "Do you know how many species are there in the story?",
    path: "/species",
  },
  {
    image: "/images/card-4.webp",
    alt: "Vehicles",
    title: "Vehicles",
    description: "Take a look at the rides the characters are using.",
    path: "/vehicles",
  },
  {
    image: "/images/card-5.jpg",
    alt: "Starships",
    title: "Starships",
    description:
      "This is the heavy artillery when it comes to transportation and battle.",
    path: "/starships",
  },
  {
    image: "/images/card-6.png",
    alt: "Films",
    title: "Films",
    description: "The movie collection details in a single click.",
    path: "/films",
  },
];

export const Home = () => {
  const go = useGo();

  return (
    <Card>
      <CardHeader title={<Title label="Hello, Earthling," />} />

      <CardContent>
        <Typography color="primary">
          Please take a look around. You'll have a lot of fun. And don't forget
          to set you favorite theme from the moon/sun icon on the top right of
          the page.
        </Typography>

        <Divider sx={{ marginTop: 4, marginBottom: 5 }} />

        <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
          {cards.map(({ image, alt, title, description, path }, index) => (
            <Grid key={`card-${index}`} item xs={12} md={6} lg={4}>
              <Card>
                <CardActionArea onClick={() => go({ to: path })}>
                  <CardMedia
                    component="img"
                    height={IMAGE_HEIGHT}
                    image={image}
                    alt={alt}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} md={6}>
            <Card>
              <CardActionArea onClick={() => go({ to: "/favorites" })}>
                <CardMedia
                  component="img"
                  height={IMAGE_HEIGHT}
                  image="/images/card-7.jpg"
                  alt="Favorites"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Favorites
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Start making your own collection. You'll be able to check
                    the details of your favorite characters, machines and so on
                    at any moment.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardActionArea onClick={() => go({ to: "/trade" })}>
                <CardMedia
                  component="img"
                  height={IMAGE_HEIGHT}
                  image="/images/card-8.jpeg"
                  alt="Trade"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Trade
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Are you short on your space cash? Just come around and fix
                    that.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
