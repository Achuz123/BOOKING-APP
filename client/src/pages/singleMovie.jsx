import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../apicalls/movies";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { message, Input, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import { getAllTheatresByMovie } from "../apicalls/shows";

const SingleMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDate = (e) => {
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    navigate(`/movie/${params.id}?date=${e.target.value}`);
  };

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const getAllTheatres = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTheatresByMovie({ movie: params.id, date });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getAllTheatres();
  }, [date]);

  return (
    <>
      <div className="max-w-[1000px] mx-auto">
        {movie && (
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <img
                src={movie.poster}
                width={180}
                className="rounded shadow"
                alt="Movie Poster"
              />
            </div>
            <div className="w-full">
              <h1 className="mt-0 text-3xl font-bold text-[#2B1B3D]">
                {movie.title}
              </h1>
              <p className="text-gray-500 text-[15px] mt-1">
                Language:{" "}
                <span className="text-black font-semibold">
                  {movie.language}
                </span>
              </p>
              <p className="text-gray-500 text-[15px]">
                Genre:{" "}
                <span className="text-black font-semibold">{movie.genre}</span>
              </p>
              <p className="text-gray-500 text-[15px]">
                Release Date:{" "}
                <span className="text-black font-semibold">
                  {moment(movie.date).format("MMM Do YYYY")}
                </span>
              </p>
              <p className="text-gray-500 text-[15px]">
                Duration:{" "}
                <span className="text-black font-semibold">
                  {movie.duration} Minutes
                </span>
              </p>

              <hr className="border border-gray-200 my-4" />

              <div className="flex flex-col md:flex-row items-center gap-3">
                <label className="flex-shrink-0 text-[15px]">
                  Choose the date:
                </label>
                <Input
                  onChange={handleDate}
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  value={date}
                  className="max-w-[250px]"
                  prefix={<CalendarOutlined />}
                />
              </div>
            </div>
          </div>
        )}

        {theatres.length === 0 && (
          <div className="pt-6">
            <h2 className="text-[#D62828] text-lg font-semibold">
              No theatres available for this movie on this date.
            </h2>
          </div>
        )}

        {theatres.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-[#2B1B3D] mb-5">
              Available Theatres
            </h2>

            {theatres.map((theatre) => {
              return (
                <div key={theatre._id}>
                  <Row gutter={24}>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                      <h3 className="text-xl font-semibold text-[#2B1B3D]">
                        {theatre.name}
                      </h3>
                      <p className="text-sm text-gray-600">{theatre.address}</p>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                      <ul className="flex flex-wrap gap-2 p-0 list-none">
                        {theatre.shows
                          .sort(
                            (a, b) =>
                              moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                          )
                          .map((singleShow) => {
                            return (
                              <li
                                key={singleShow._id}
                                onClick={() =>
                                  navigate(`/book-show/${singleShow._id}`)
                                }
                                className="px-4 py-3 border border-[#D62828] text-[#D62828] rounded cursor-pointer hover:bg-[#D62828] hover:text-white transition-all"
                              >
                                {moment(singleShow.time, "HH:mm").format(
                                  "hh:mm A"
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </Col>
                  </Row>
                  <hr className="border border-gray-200 my-5" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SingleMovie;
