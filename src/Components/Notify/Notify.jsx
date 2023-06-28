import { toast } from "react-toastify";

export const NotifyError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    bodyClassName: "toastBodyError",
  });
};

export const NotifySuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    bodyClassName: "toastBodySuccess",
  });
};

export const NotifyPending = (message) => {
  toast.loading(message, {
    position: "top-center",
    theme: "dark",
    bodyClassName: "toastBodyPending",
  });
};
