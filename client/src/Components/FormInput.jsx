import { Field } from "formik";
import React from "react";
import ImagePreview from "./ImagePreview";

function FormInput(props) {
  const { name, type, placeholder, title } = props;
  return (
    <Field name={name}>
      {({ field, form: { touched, errors }, meta }) => (
        <div className={props.margin && "pt-2"}>
          <div>
            <label htmlFor={title}>{title}</label>
          </div>
          <div>
            <input
              type={type}
              {...field}
              placeholder={placeholder}
              style={{ width: "100%" }}
            />
          </div>

          {meta.touched && meta.error && (
            <div className='error-text'>{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}

export default FormInput;

export function FormTextArea(props) {
  const { name, placeholder, rows, title } = props;
  return (
    <Field name={name}>
      {({ field, form: { touched, errors }, meta }) => (
        <div className='pt-2'>
          <div>
            <label htmlFor={name}>{title}</label>
          </div>
          <div>
            <textarea
              {...field}
              placeholder={placeholder}
              style={{ width: "100%" }}
              rows={rows}
            />
          </div>

          {meta.touched && meta.error && (
            <div className='error-text'>{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}

export function FormUploadFile(props) {
  const { name, setFieldValue } = props;
  return (
    <Field name={name}>
      {({ field, form: { touched, errors }, meta }) => (
        <div className='pt-2'>
          <ImagePreview {...field} setFieldValue={setFieldValue} name={name} />

          {meta.touched && meta.error && (
            <div className='error'>{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}

// export function FormUploadFile(props){

//   return (
//     <div className='form-group'>
//       <label htmlFor='imgLink'>File upload</label>
//       <input
//         id='imgLink'
//         name='imgLink'
//         type='file'
//         onChange={(event) => {
//           setFieldValue("imgLink", event.currentTarget.files[0]);
//         }}
//         className='form-control'
//       />
//     </div>
//   );
// }
