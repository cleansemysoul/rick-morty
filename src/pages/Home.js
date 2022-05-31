import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../utils/Constants";

const CustomCard = ({ data, navigate }) => {
  const { id, name, image, gender, location, origin, species, status } = data;
  // console.log(data);
  return (
    <Grid item xs={4}>
      <Card>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <CardContent>
          <Typography>{name}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() => navigate(`/character/${id}`)}
          >
            en savoir plus
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default function Home() {
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(params.page ? parseInt(params.page) : 1);
  const [apiData, setApiData] = useState();
  useEffect(() => {
    if (page) {
      (async () => {
        try {
          const res = await fetch(`${API}character/?page=${page}`);
          const data = await res.json();
          setApiData(data);
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [page]);
  return (
    <div style={{ width: "80vw", margin: "auto" }}>
      <Typography variant="h3">Home page</Typography>
      {apiData && (
        <div>
          <Grid container spacing={4}>
            {apiData.results.map((result) => (
              <CustomCard data={result} key={result.id} navigate={navigate} />
            ))}
          </Grid>
          <Pagination
            count={apiData.info.pages}
            color="primary"
            showFirstButton
            page={page}
            showLastButton
            onChange={(e, v) => {
              navigate(`/home/${v}`);
              setPage(v);
            }}
          />
        </div>
      )}
    </div>
  );
}
