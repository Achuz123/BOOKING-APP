import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../apicalls/movies";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { message, Input, Divider, Row, Col } from "antd";
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
        console.log(theatres);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.err(err.message);
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
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
              <img src={movie.poster} width={150} alt="Movie Poster" />
            </div>
            <div className="w-full">
              <h1 className="mt-0 text-2xl font-semibold">{movie.title}</h1>
              <p className="text-gray-500 text-sm mt-1 mb-2">
                Language:{" "}
                <span className="text-gray-900 font-semibold">
                  {movie.language}
                </span>
              </p>
              <p className="text-gray-500 text-sm mt-1 mb-2">
                Genre:{" "}
                <span className="text-gray-900 font-semibold">
                  {movie.genre}
                </span>
              </p>
              <p className="text-gray-500 text-sm mt-1 mb-2">
                Release Date:{" "}
                <span className="text-gray-900 font-semibold">
                  {moment(movie.date).format("MMM Do YYYY")}
                </span>
              </p>
              <p className="text-gray-500 text-sm mt-1 mb-2">
                Duration:{" "}
                <span className="text-gray-900 font-semibold">
                  {movie.duration} Minutes
                </span>
              </p>
              <hr className="border border-gray-200 my-4" />
              <div className="flex flex-col md:flex-row items-center mt-4">
                <label className="md:mr-4 flex-shrink-0 mb-2 md:mb-0">
                  Choose the date:
                </label>
                <Input
                  onChange={handleDate}
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  className="max-w-[300px] mt-2 md:mt-0"
                  value={date}
                  placeholder="default size"
                  prefix={<CalendarOutlined />}
                />
              </div>
            </div>
          </div>
        )}
        {theatres.length === 0 && (
          <div className="pt-4">
            <h2 className="text-[#1890ff] text-lg font-semibold">
              Currently, no theatres available for this movie!
            </h2>
          </div>
        )}
        {theatres.length > 0 && (
          <div className="mt-4 pt-4">
            <h2 className="text-xl font-semibold mb-4">Theatres</h2>
            {theatres.map((theatre) => {
              return (
                <div key={theatre._id}>
                  <Row gutter={24} key={theatre._id}>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                      <h3 className="text-lg font-semibold">{theatre.name}</h3>
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
                                className="px-4 py-3 border border-gray-400 rounded cursor-pointer text-orange-500 hover:text-white hover:bg-orange-500 hover:border-transparent transition-all"
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
                  <hr className="border border-gray-200 my-4" />
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
