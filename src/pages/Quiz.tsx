import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cleareState, saveResult } from "../redux/slices/slice";
import { useDispatch, useSelector } from "react-redux";

const Quiz = () => {
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const [result, setResult] = useState<string[]>([]);
  const [words, setWords] = useState<WordType[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveResult(result));
  }, [result]);

  const nextHandaler = () => {
    setResult((prev) => [...prev, ans]);
    setCount((prev) => prev + 1);
    setAns("");

    if (words.length -1 == count) {
      setTimeout(() => {
        navigate("/result");
      }, 100);
    }
  };

  // @ts-ignore
  const data = useSelector((state) => state?.root);

  useEffect(() => {
    setWords(data.words);
  }, [data.words]);

  useEffect(() => {
    if (data.error) {
      console.log(data.error);
      dispatch(cleareState());
    }
  }, [data.error]);

  return (
    <Container maxWidth={"sm"}>
      <Toolbar
        sx={{
          py: 5,
          flexDirection: "column",
          justifyContent: "left",
          alignItems: "self-start",
        }}
      >
        <Stack>
          <Typography variant="h6" textAlign={"center"}>
            Start Your Test
          </Typography>
        </Stack>

        <Stack width={"100%"} mt={3}>
          <Typography variant="h6">
            {count + 1}. {words[count]?.word}
          </Typography>
        </Stack>

        <Stack>
          <FormControl>
            <FormLabel sx={{ mt: 3, mb: 2 }}>Meaning</FormLabel>
            <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
              {words[count]?.options?.map((ele, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    value={ele}
                    control={<Radio />}
                    label={ele}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Stack>

        <Stack width={"100%"} mt={3}>
          {count == words?.length - 1 ? (
            <Button
              fullWidth={true}
              onClick={() => {
                nextHandaler();
              }}
              variant="contained"
              size="large"
              disabled={ans == "" ? true : false}
            >
              Submit
            </Button>
          ) : (
            <Button
              size="large"
              fullWidth={true}
              onClick={nextHandaler}
              variant="contained"
              disabled={ans == "" ? true : false}
            >
              Next
            </Button>
          )}
        </Stack>
      </Toolbar>
    </Container>
  );
};

export default Quiz;
