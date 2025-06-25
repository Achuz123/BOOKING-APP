import { Modal, message } from "antd";
import { deleteMovie } from "../../apicalls/movies";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteMovieModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedMovie,
  setSelectedMovie,
  getData,
}) => {
  const dispatch = useDispatch();
  const handleOk = async () => {
    try {
      dispatch(showLoading);
      const movieId = selectedMovie._id;
      const response = await deleteMovie({ movieId });
      console.log(movieId, response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        setSelectedMovie(null);
      }
      setIsDeleteModalOpen(false);
      dispatch(hideLoading);
    } catch (err) {
      dispatch(hideLoading);
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal
      title={
        <span
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#D62828", // Red accent for delete
          }}
        >
          Delete Movie?
        </span>
      }
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{
        style: {
          backgroundColor: "#D62828",
          borderColor: "#D62828",
          color: "#fff",
          fontWeight: "600",
        },
      }}
      cancelButtonProps={{
        style: {
          backgroundColor: "#2B1B3D",
          borderColor: "#2B1B3D",
          color: "#fff",
          fontWeight: "600",
        },
      }}
    >
      <p
        style={{
          paddingTop: "12px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#2B1B3D",
        }}
      >
        Are you sure you want to delete this movie?
      </p>
      <p
        style={{
          paddingBottom: "12px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#666877",
        }}
      >
        This action can't be undone and you'll lose this movie data.
      </p>
    </Modal>
  );
};

export default DeleteMovieModal;
