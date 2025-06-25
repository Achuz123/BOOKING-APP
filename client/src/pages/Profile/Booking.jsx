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
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#EAE6F7" }}>
      {bookings.length > 0 ? (
        <Row gutter={[24, 24]}>
          {bookings.map((booking) => (
            <Col key={booking._id} xs={24} md={12} lg={8}>
              <Card
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex flex-col gap-4">
                  <img
                    src={booking.show.movie.poster}
                    alt="Movie Poster"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <h3
                    className="text-xl font-bold"
                    style={{ color: "#2B1B3D", marginBottom: "0.3rem" }}
                  >
                    {booking.show.movie.title}
                  </h3>

                  <p>
                    <span style={{ color: "#666877" }}>Theatre:</span>{" "}
                    <span style={{ fontWeight: "600", color: "#2B1B3D" }}>
                      {booking.show.theatre.name}
                    </span>
                  </p>

                  <p>
                    <span style={{ color: "#666877" }}>Seats:</span>{" "}
                    <span style={{ fontWeight: "600", color: "#2B1B3D" }}>
                      {booking.seats.join(", ")}
                    </span>
                  </p>

                  <p>
                    <span style={{ color: "#666877" }}>Date & Time:</span>{" "}
                    <span style={{ fontWeight: "600", color: "#2B1B3D" }}>
                      {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                      {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                    </span>
                  </p>

                  <p>
                    <span style={{ color: "#666877" }}>Amount:</span>{" "}
                    <span style={{ fontWeight: "600", color: "#D62828" }}>
                      ₹{booking.seats.length * booking.show.ticketPrice}/-
                    </span>
                  </p>

                  <p>
                    <span style={{ color: "#666877" }}>Booking ID:</span>{" "}
                    <span style={{ fontWeight: "600", color: "#2B1B3D" }}>
                      {booking.transactionId}
                    </span>
                  </p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center pt-10">
          <h1 className="text-2xl mb-5" style={{ color: "#2B1B3D" }}>
            You haven't booked any shows yet!
          </h1>
          <Link to="/">
            <Button
              style={{
                backgroundColor: "#D62828",
                color: "#fff",
                border: "none",
                fontWeight: "600",
              }}
            >
              Start Booking
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Bookings;
