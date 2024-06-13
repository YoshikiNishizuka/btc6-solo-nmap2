import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export function Filter(props) {
  const { allPlace, setPlaceData } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      wheelchair: false,
      babies: false,
      ostomate: false,
    },
  });

  const clickSubmit = (value) => {
    if (value.wheelchair && value.babies && value.ostomate) {
      const result = allPlace.filter(
        (obj) => obj.wheelchair || obj.babies || obj.ostomate
      );
      setPlaceData(result);
    } else if (value.wheelchair && (value.babies || value.ostomate)) {
      if (value.babies) {
        const result = allPlace.filter((obj) => obj.wheelchair || obj.babies);
        setPlaceData(result);
      } else {
        const result = allPlace.filter((obj) => obj.wheelchair || obj.ostomate);
        setPlaceData(result);
      }
    } else if (value.wheelchair) {
      const result = allPlace.filter((obj) => obj.wheelchair);
      setPlaceData(result);
    } else if (value.babies) {
      if (value.ostomate) {
        const result = allPlace.filter((obj) => obj.babies || obj.ostomate);
        setPlaceData(result);
      } else {
        const result = allPlace.filter((obj) => obj.babies);
        setPlaceData(result);
      }
    } else if (value.ostomate) {
      const result = allPlace.filter((obj) => obj.ostomate);
      setPlaceData(result);
    } else {
      const result = allPlace;
      setPlaceData(result);
    }
  };
  return (
    <>
      <div id="modal">
        <Modal opened={opened} onClose={close} size="auto" title="フィルター">
          <form
            onSubmit={form.onSubmit((value) => {
              clickSubmit(value);
            })}
          >
            <Group>
              <Checkbox
                label="車椅子"
                key={form.key("wheelchair")}
                {...form.getInputProps("wheelchair", { type: "checkbox" })}
              />
              <Checkbox
                label="乳幼児"
                key={form.key("babies")}
                {...form.getInputProps("babies", { type: "checkbox" })}
              />
              <Checkbox
                label="オスメイト"
                key={form.key("ostomate")}
                {...form.getInputProps("ostomate", { type: "checkbox" })}
              />
            </Group>

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Modal>

        <Button
          fullWidth
          variant="filled"
          color="yellow"
          size="compact-xs"
          radius="xl"
          onClick={open}
        >
         ﾌｨﾙﾀｰ
        </Button>
      </div>
    </>
  );
}
