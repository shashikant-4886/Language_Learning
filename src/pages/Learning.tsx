import { ArrowBack, VolumeUp } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { speakText, translateWord } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  getWordsFail,
  getWordsReq,
  getWordsSuccess,
} from "../redux/slices/slice";
import Loading from "../components/Loading";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [words, setWords] = useState<WordType[]>([]);
  const params = useSearchParams()[0].get("lang") as LangType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [audioSrc, setAudioSrc] = useState<any>("");
  const audioRef = useRef();

  const nextHandaler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("")
  };

  useEffect(() => {
    dispatch(getWordsReq());
    translateWord(params || "hi")
      .then((res) => {
        // @ts-ignore
        dispatch(getWordsSuccess(res));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getWordsFail(err));
      });
  }, []);

  // @ts-ignore
  const data = useSelector((state) => state?.root);

  useEffect(() => {
    setWords(data.words);
  }, [data.words]);

  useEffect(() => {
    if (data.error) {
      console.log(data.error);
    }
  }, [data.error]);


  const speakMyText = async () => {
    const player: HTMLAudioElement = audioRef?.current!;

    if (player) {
      player.play();
    } else {
      const data = await speakText(words[count]?.word, params);
      setAudioSrc(data);
    }
  };

  return (
    <>
      {data.loading ? <Loading /> : ""}
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
              Learning Made Easy
            </Typography>
          </Stack>

          <Stack width={"100%"} mt={3}>
            <div className="">
              <IconButton
                color={"primary"}
                onClick={
                  count === 0
                    ? () => navigate(-1)
                    : () => setCount((prev) => prev - 1)
                }
              >
                <ArrowBack />
              </IconButton>
            </div>
          </Stack>

          <Stack direction={"row"} spacing={"2rem"} pb={"2rem"}>
            <Typography variant="h4">
              {count + 1}. {words[count]?.word} :
            </Typography>
            <Typography variant="h4" textTransform={"capitalize"}>
              {words[count]?.meaning}
            </Typography>
            <Typography variant="h4">
              <IconButton color="primary" onClick={speakMyText} size="large">
                <VolumeUp fontSize="inherit" />
              </IconButton>
            </Typography>
            {audioSrc && (
              // @ts-ignore
              <audio src={audioSrc} autoPlay={true} ref={audioRef}></audio>
            )}
          </Stack>

          <Stack width={"100%"}>
            {count == words.length - 1 ? (
              <Button
                fullWidth={true}
                onClick={() =>
                  confirm("Want to Sure for Test") ? navigate("/quiz") : ""
                }
                variant="contained"
                size="large"
              >
                Text
              </Button>
            ) : (
              <Button
                size="large"
                fullWidth={true}
                onClick={nextHandaler}
                variant="contained"
              >
                Next
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </>
  );
};

export default Learning;
