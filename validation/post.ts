import * as Yup from "yup";

export const schemaAddPost = Yup.object().shape({
  caption: Yup.string()
    .max(200, "Caption must be at most 200 characters")
    .required("Caption is required"),
});
