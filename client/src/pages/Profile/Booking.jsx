import { Button, Card, Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { getAllBookings } from "../../apicalls/bookings";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllBookings();
      if (response.success) {
        setBookings(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {bookings && (
        <Row gutter={24}>
          {bookings.map((booking) => {
            return (
              <Col key={booking._id} xs={{ span: 24 }} lg={{ span: 12 }}>
                <Card className="mb-3">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={booking.show.movie.poster}
                        width={100}
                        alt="Movie Poster"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="mt-0 mb-0 text-xl font-semibold">
                        {booking.show.movie.title}
                      </h3>
                      <p>
                        Theatre:{" "}
                        <span className="font-medium">
                          {booking.show.theatre.name}
                        </span>
                      </p>
                      <p>
                        Seats:{" "}
                        <span className="font-medium">
                          {booking.seats.join(", ")}
                        </span>
                      </p>
                      <p>
                        Date & Time:{" "}
                        <span className="font-medium">
                          {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                          {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                        </span>
                      </p>
                      <p>
                        Amount:{" "}
                        <span className="font-medium">
                          Rs.
                          {booking.show.bookedSeats.length *
                            booking.show.ticketPrice}
                          /-
                        </span>
                      </p>
                      <p>
                        Booking ID:{" "}
                        <span className="font-medium">
                          {booking.transactionId}
                        </span>
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {!bookings.length && (
        <div className="text-center pt-6">
          <h1 className="text-xl mb-4">You've not booked any show yet!</h1>
          <Link to="/">
            <Button type="primary">Start Booking</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Bookings;
