import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calTrue } from "../utils/features";

const Result = () => {
  // @ts-ignore
  const { words, result } = useSelector((state) => state?.root);
  const navigate = useNavigate();
  const [per, setPer] = useState<number>(0);
  const [correntAns, setCorrentAns] = useState<number>(0);

  useEffect(() => {
    let trueRes: string[] = [];
    words.forEach((element: WordType) => {
      trueRes.push(element.meaning);
    });

    const res: number = calTrue(result, trueRes);
    setCorrentAns(res);
  }, []);

  useEffect(() => {
    const per = (correntAns / words.length) * 100;
    setPer(per);
  }, [correntAns]);

  return (
    <Container maxWidth={"lg"}>
      <Toolbar sx={{ py: 5, flexDirection: "column" }}>
        <Stack>
          <Typography variant="h4" textAlign={"center"}>
            Your Result in Language Test !!
          </Typography>
        </Stack>
        <Stack>
          <Typography marginTop={5} variant="h5" textAlign={"center"}>
            Your Got {correntAns} Right Out of {words?.length}
          </Typography>
        </Stack>

        <Stack flexDirection={"row"}>
          <Stack
            spacing={"2rem"}
            p={"2rem"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h5" textAlign={"center"}>
              Your Answer
            </Typography>

            <List style={{ marginTop: "0px" }}>
              {result?.map((ele: string, id: number) => {
                return (
                  <ListItem key={id}>
                    {id + 1} {ele}
                  </ListItem>
                );
              })}
            </List>
          </Stack>
          <Stack
            spacing={"2rem"}
            p={"2rem"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h5" textAlign={"center"}>
              Correct Answer
            </Typography>

            <List style={{ marginTop: "0px" }}>
              {words?.map((ele: WordType, id: number) => {
                return (
                  <ListItem key={id}>
                    {id + 1} {ele?.meaning}
                  </ListItem>
                );
              })}
            </List>
          </Stack>
        </Stack>

        <Stack>
          <Typography
            variant="h5"
            textAlign={"center"}
            color={per < 50 ? "red" : "green"}
          >
            {per > 50
              ? `Your Are Pass. Percentage is ${per.toFixed(2)}`
              : `You Are Fail. Percentage is ${per.toFixed(2)}`}
          </Typography>

          <Button
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
            variant="contained"
          >
            Got To Home Page
          </Button>
        </Stack>
      </Toolbar>
    </Container>
  );
};

export default Result;
