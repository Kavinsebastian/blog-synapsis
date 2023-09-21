import { useContext } from "react";
import { NotifyContext } from "./Notify/NotifyProvider";

export const useNotify = () => useContext(NotifyContext)
