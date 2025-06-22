import { Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getAllMovies } from "../apicalls/movies";
import { useNavigate } from "react-router-dom";
import moment from "moment";
function home() {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    dispatch(showLoading());
    const response = await getAllMovies();
    setMovies(response.data);
    dispatch(hideLoading());
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Row className="justify-center width: 100% mb-5">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Input type="text" placeholder="Search For Movies"></Input>
        </Col>
      </Row>
      <Row>
        <Row
          className="flex justify-center flex-wrap gap-8"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {movies &&
            movies.map((movie) => (
              <Col
                className="mb-5 w-full sm:w-full md:w-1/2 lg:w-5/12 flex justify-center"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div className="text-center">
                  <img
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer w-[200px] h-[300px] rounded-lg"
                    src={movie.poster}
                    alt="Movie Poster"
                  />
                  <h3
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer mt-2 text-lg font-semibold"
                  >
                    {movie.title}
                  </h3>
                </div>
              </Col>
            ))}
        </Row>
      </Row>
    </div>
  );
}

export default home;
