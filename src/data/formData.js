import linkIcon from "../assets/icons/link_FILL0_wght400_GRAD0_opsz24.svg";
import editIcon from "../assets/icons/edit_FILL0_wght400_GRAD0_opsz24.svg";

export const inputs = [
  {
    label: "Title",
    type: "text",
    name: "title",
    icon: editIcon,
    required: true,
  },
  {
    label: "Link",
    type: "url",
    name: "url",
    icon: linkIcon,
    required: true,
  },
  {
    label: "Category",
    type: "select",
    name: "categoryName",
    required: true,
  },
  {
    label: "Add to Favorites",
    type: "checkbox",
    name: "favorite",
  },
  {
    label: "Add to Private",
    type: "checkbox",
    name: "private",
  },
];

export const initialValues = {
  categoryName: "",
  favorite: 0,
  private: 0,
  title: "",
  url: "",
};

export const InputErrorObj = {
  title: {
    status: false,
    message: "",
  },
  url: {
    status: false,
    message: "",
  },
  categoryName: {
    status: false,
    message: "",
  },
  favorite: {
    status: false,
    message: "",
  },
  private: {
    status: false,
    message: "",
  },
};

export default { inputs, initialValues, InputErrorObj };
