import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth={"lg"}>
        <Toolbar>
          <Typography mr={"auto"} variant={"h4"} textTransform={"uppercase"}>
            Shashikant
          </Typography>
          <Link to={"/"}>
            <Button className="textWhite">Home</Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
