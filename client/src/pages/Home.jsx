import { Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getAllMovies } from "../apicalls/movies";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      setMovies(response.data);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#EAE6F7" }}>
      {/* Search Bar */}
      <Row className="justify-center mb-8">
        <Col xs={24} sm={24} md={12} lg={10} xl={8}>
          <Input
            type="text"
            placeholder="Search For Movies"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="!bg-white !border-none !shadow-md !text-black"
          />
        </Col>
      </Row>

      {/* Movie Cards */}
      <Row className="flex justify-center flex-wrap gap-8">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col
              className="mb-5 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] flex justify-center"
              key={movie._id}
            >
              <div
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col hover:bg-[#f0ebfa]"
                style={{
                  backgroundColor: "#F5F5F5",
                  width: "300px",
                  height: "460px",
                }}
                onClick={() =>
                  navigate(
                    `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                  )
                }
              >
                <div className="overflow-hidden flex items-center justify-center bg-[#ddd]">
                  <img
                    className="transition-transform duration-300 hover:scale-105"
                    src={movie.poster}
                    alt="Movie Poster"
                    style={{
                      width: "100%",
                      height: "340px",
                      objectFit: "contain", // ✅ Show full image without cropping
                    }}
                  />
                </div>

                <div className="px-3 py-3 flex flex-col justify-center">
                  <h2
                    className="text-[25px] font-semibold text-center mb-1"
                    style={{ color: "#D62828" }}
                  >
                    {movie.title}
                  </h2>

                  <p
                    className="text-[13px] text-center"
                    style={{ color: "#666877" }}
                  >
                    {movie.genre}
                  </p>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <h3 className="text-xl font-semibold text-gray-600">
            No Movies Found
          </h3>
        )}
      </Row>
    </div>
  );
}

export default Home;
