import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="modal">
        <Button size="medium" variation="primary">
          Add new Cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="modal">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
