import linkIcon from "../assets/icons/link_FILL0_wght400_GRAD0_opsz24.svg";
import editIcon from "../assets/icons/edit_FILL0_wght400_GRAD0_opsz24.svg";

export const inputs = [
  {
    label: "Title",
    type: "text",
    name: "title",
    icon: editIcon,
  },
  {
    label: "Link",
    type: "url",
    name: "url",
    icon: linkIcon,
  },
  {
    label: "Category",
    type: "select",
    name: "categoryName",
  },
  {
    label: "Add to Favorites",
    type: "checkbox",
    name: "favorite",
  },
  // {
  //   label: "Add to Private",
  //   type: "checkbox",
  //   name: "addToPrivate",
  // },
];

export const initialValues = {
  categoryName: "",
  favorite: 0,
  private: 0,
  title: "",
  url: "",
};

export default { inputs, initialValues };
