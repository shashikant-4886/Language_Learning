import { Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const languages: Language[] = [
    {
      name: "Japanese",
      code: "ja",
    },
    {
      name: "Hindi",
      code: "hi",
    },
    {
      name: "Spanish",
      code: "es",
    },
    {
      name: "French",
      code: "fr",
    },
    {
      name: "English",
      code: "en",
    },
  ];

  const navigate = useNavigate();
  const selectLanguageHandaler = (item: Language): void => {
    navigate(`/learning?lang=${item.code}`);
  };
  return (
    <Container maxWidth={"lg"}>
      <Toolbar sx={{ py: 5, flexDirection: "column" }}>
        <Stack>
          <Typography variant="h4" textAlign={"center"}>
            Welcome, Begin Your Journey of learning
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          spacing={"2rem"}
          p={"2rem"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {languages?.map((lan) => {
            return (
              <Button
                onClick={(): void => selectLanguageHandaler(lan)}
                key={lan.code}
                variant="contained"
              >
                {lan.name}
              </Button>
            );
          })}
        </Stack>
        <Stack>
          <Typography variant="h5" textAlign={"center"}>
            Choose Your Language
          </Typography>
        </Stack>
      </Toolbar>
    </Container>
  );
};

export default Home;
