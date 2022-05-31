import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { API } from "../utils/Constants";

export default function Character() {
  const { id } = useParams();
  const [characterId, setCharacterId] = useState(id ? parseInt(id) : 0);
  const [apiData, setApiData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}character/${characterId}`);
        const data = await res.json();
        setApiData(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [characterId]);
  return (
    <div style={{ width: "80vw", margin: "auto" }}>
      <Header />
      {apiData && (
        <Card>
          <CardMedia
            component="img"
            // height=""
            image={apiData.image}
            alt={apiData.name}
          />
          <CardContent>
            {apiData.name && <Typography>Character {apiData.name}</Typography>}
            {apiData.created && (
              <Typography>Created {apiData.created}</Typography>
            )}
            {apiData.episode && (
              <>
                <Typography>Episodes :</Typography>
                <Grid container gap={2}>
                  {apiData.episode.map((episode) => {
                    console.log(episode.split("episode/")[1]);
                    return (
                      <Grid item xs={2}>
                        <Button variant="contained">
                          {episode.split("episode/")[1]}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
            {apiData.gender && <Typography>Gender {apiData.gender}</Typography>}
            {apiData.species && (
              <Typography>Species {apiData.species}</Typography>
            )}
            {apiData.status && <Typography>Status {apiData.status}</Typography>}
            {apiData.type && <Typography>Type {apiData.type}</Typography>}
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            {characterId !== 1 && (
              <Button
                variant="contained"
                onClick={() => {
                  setCharacterId(characterId - 1);
                  navigate(`/character/${characterId - 1}`);
                }}
              >
                Previous
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => {
                setCharacterId(characterId + 1);
                navigate(`/character/${characterId + 1}`);
              }}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}
