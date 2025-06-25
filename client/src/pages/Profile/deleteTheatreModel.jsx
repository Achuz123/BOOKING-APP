import { Modal, message } from "antd";
import { deleteTheatre } from "../../apicalls/theaters";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteTheatreModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(showLoading());
      const theatreId = selectedTheatre._id;
      const response = await deleteTheatre({ theatreId });

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }

      setIsDeleteModalOpen(false);
      setSelectedTheatre(null);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      setIsDeleteModalOpen(false);
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal
      title="Delete Theatre?"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{
        style: {
          backgroundColor: "#D62828",
          color: "#fff",
          border: "none",
          fontWeight: "600",
        },
      }}
      cancelButtonProps={{
        style: {
          backgroundColor: "#2B1B3D",
          color: "#fff",
          border: "none",
          fontWeight: "500",
        },
      }}
    >
      <p className="pt-3" style={{ fontSize: "16px", color: "#2B1B3D" }}>
        Are you sure you want to delete this theatre?
      </p>
      <p style={{ fontSize: "16px", color: "#666877" }}>
        This action cannot be undone and you'll lose this theatre data.
      </p>
    </Modal>
  );
};

export default DeleteTheatreModal;
