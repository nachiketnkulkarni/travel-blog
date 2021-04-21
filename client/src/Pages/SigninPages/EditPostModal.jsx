import { Modal } from "react-bootstrap";
import AddNewPost from "./AddNewPost";

function EditPostModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddNewPost edit blog={props.blog} {...props} />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default EditPostModal;
