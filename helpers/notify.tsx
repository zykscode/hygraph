import { toast, ToastOptions } from "react-toastify";
import { useCallback } from "react";

interface UseToastProps {
  success: (msg: string) => void;
  error: (msg: string) => void;
}

const useToast = (): UseToastProps => {
  const success = useCallback((msg: string) => {
    const options: ToastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
    toast.success(msg, options);
  }, []);

  const error = useCallback((msg: string) => {
    const options: ToastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };
    toast.error(msg, options);
  }, []);

  return { success, error };
};

export default useToast;
