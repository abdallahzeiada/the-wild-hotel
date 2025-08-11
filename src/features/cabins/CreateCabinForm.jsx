import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();

  const { isUpdating, updateCabin } = useUpdateCabin();

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditingSession = Boolean(editId);
  const isWoring = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors = {} },
  } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditingSession) {
      updateCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => reset(),
        }
      );
    }
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWoring}
          {...register("name", {
            required: "This filed is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWoring}
          {...register("maxCapacity", {
            required: "This filed is required",
            min: {
              value: 1,
              message: "Capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWoring}
          {...register("regularPrice", {
            required: "This filed is required",
            min: {
              value: 0,
              message: "Price can not be negative",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWoring}
          defaultValue={0}
          {...register("discount", {
            required: "This filed is required",
            min: {
              value: 0,
              message: "Discount must be at least 0",
            },
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount must be less that the regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWoring}
          defaultValue=""
          {...register("description", {
            required: "This filed is required",
          })}
        />
      </FormRow>

      <FormRow label="Image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isWoring}
          {...register("image", {
            required: isEditingSession ? "" : "This filed is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button disabled={isWoring} size="medium" variation="primary">
          {isEditingSession ? "Update Cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
