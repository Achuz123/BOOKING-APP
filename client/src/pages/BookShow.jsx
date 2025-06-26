import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getShowById } from "../apicalls/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col } from "antd";
import moment from "moment";
import { bookShow, makePayment } from "../apicalls/bookings";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RdatZPsdpG7HzglqoaOobHtioB0jMfXLm6wtCIR0Sdrn3HnBXcf1omOEU1BNJbSrFWbsdxaVkQhLsPOazexG9UL00MoPcr79N"
);

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    dispatch(showLoading());
    try {
      const response = await makePayment(amount);

      if (!response.success) {
        throw new Error("Failed to create payment intent");
      }

      const clientSecret = response.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          message.success("Payment successful!");
          onSuccess(result.paymentIntent.id);
        }
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(hideLoading());
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto mt-6">
      <CardElement className="border p-3 rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-[#2B1B3D] text-white px-6 py-2 rounded w-full"
      >
        Pay Now
      </button>
    </form>
  );
};

const BookShow = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const getSeats = () => {
    let columns = 12;
    let totalSeats = show.totalSeats;
    let rows = Math.ceil(totalSeats / columns);

    return (
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[600px] mx-auto mb-[25px]">
          <p className="text-center mb-[10px] font-semibold">
            Screen this side, you will be watching in this direction
          </p>
          <div className="max-w-[75%] mx-auto h-[10px] bg-[#eee]"></div>
        </div>
        <ul className="flex flex-wrap gap-2 justify-center max-w-[600px] p-0 m-0 list-none">
          {Array.from(Array(rows).keys()).map((seat) => {
            return Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = seat * columns + column + 1;
              let seatClass =
                "bg-[#f6f6f6] border border-[#a0a0a0] w-[40px] h-[35px] text-center text-[13px] cursor-pointer rounded";

              if (selectedSeats.includes(seatNumber)) {
                seatClass =
                  "bg-[#198754] border-[#198754] text-white w-[40px] h-[35px] text-center text-[13px] cursor-pointer rounded";
              }

              if (show.bookedSeats.includes(seatNumber)) {
                seatClass =
                  "bg-[#ddd] text-[#999] border-[#ddd] w-[40px] h-[35px] text-center text-[13px] cursor-not-allowed rounded";
              }

              if (seatNumber <= totalSeats)
                return (
                  <li key={`seats${seatNumber}`}>
                    <button
                      className={seatClass}
                      onClick={() => {
                        if (show.bookedSeats.includes(seatNumber)) return;

                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
            });
          })}
        </ul>

        <div className="flex justify-between w-full max-w-[600px] mx-auto mb-[25px] mt-3">
          <div className="flex-1 font-bold">
            Selected Seats:{" "}
            <span className="text-[#2B1B3D]">{selectedSeats.join(", ")}</span>
          </div>
          <div className="shrink-0 ms-3 font-bold">
            Total Price:{" "}
            <span className="text-[#D62828]">
              Rs. {selectedSeats.length * show.ticketPrice}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(showLoading());
      const response = await bookShow({
        show: params.id,
        transactionId,
        seats: selectedSeats,
        user: user._id,
      });
      if (response.success) {
        message.success("Show Booking done!");
        navigate("/profile");
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
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="space-y-[6px] [&>*]:mt-0">
                  <h1 className="font-bold text-xl">{show.movie.title}</h1>
                  <p>
                    Theatre: {show.theatre.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="py-3 space-y-[4px] [&>*]:mt-0 [&>span]:font-medium [&>span]:text-[#555]">
                  <h3>
                    <span>Show Name:</span> {show.name}
                  </h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {getSeats()}

              {selectedSeats.length > 0 && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    amount={selectedSeats.length * show.ticketPrice * 100}
                    onSuccess={book}
                  />
                </Elements>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BookShow;
