import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export function AddPoint(props) {
  const { setPlaceData } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      address: "",
      lat: "",
      lng: "",
      wheelchair: false,
      babies: false,
      ostomate: false,
    },

    validate: {
      name: (value) => (value ? null : "名称は入力必須です"),
      lat: (value) => (value ? null : "緯度は入力必須です"),
      lng: (value) => (value ? null : "経度は入力必須です"),
    },
  });

  const clickSubmit = async (value) => {
    console.log(value);
    await fetch("/api/toilet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    await fetch("/api/toilet")
      .then((res) => res.json())
      .then((data) => setPlaceData(data));
  };

  return (
    <>
      <div id="modal">
        <Modal opened={opened} onClose={close} size="auto" title="新規登録画面">
          <form
            onSubmit={form.onSubmit((value) => {
              clickSubmit(value);
              form.reset();
            })}
          >
            <TextInput
              withAsterisk
              label="名称"
              placeholder="⚪︎⚪︎⚪︎公園"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <TextInput
              label="住所"
              placeholder="長久手市⚪︎⚪︎⚪︎町"
              key={form.key("address")}
              {...form.getInputProps("address")}
            />
            <Group wrap="nowrap" mt="md">
              <TextInput
                withAsterisk
                type="number"
                step="0.00001"
                min={35.17671}
                max={35.18838}
                label="緯度(Latitude)"
                placeholder="35.176~35.188"
                key={form.key("lat")}
                {...form.getInputProps("lat")}
              />
              <TextInput
                withAsterisk
                type="number"
                step="0.00001"
                min={137.03133}
                max={137.06706}
                label="経度(Longitude)"
                placeholder="137.031~137.067"
                key={form.key("lng")}
                {...form.getInputProps("lng")}
              />
            </Group>
            <Group mt="md">
              <Checkbox
                mt="md"
                label="車椅子"
                key={form.key("wheelchair")}
                {...form.getInputProps("wheelchair", { type: "checkbox" })}
              />
              <Checkbox
                mt="md"
                label="乳幼児"
                key={form.key("babies")}
                {...form.getInputProps("babies", { type: "checkbox" })}
              />
              <Checkbox
                mt="md"
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
          variant="filled"
          color="grape"
          size="xs"
          radius="xl"
          onClick={open}
        >
          加
        </Button>
      </div>
    </>
  );
}
