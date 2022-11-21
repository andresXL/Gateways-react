import { Input, Button, Select, DatePicker } from "antd";
import { useState } from "react";

const { Option } = Select;

const PeripheralForm = ({ onAdd }) => {
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Online");

  return (
    <div>
      <Input
        placeholder="Vendor"
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
      />
      <DatePicker
        placeholder="Date"
        style={{ marginTop: 10 }}
        value={date}
        onChange={(value) => setDate(value)}
      />
      <Input.Group
        placeholder="Status"
        style={{ marginTop: 10 }}
        value={status}
      >
        <Select
          defaultValue="Online"
          onChange={(value) => setStatus(value)}
          value={status}
        >
          <Option value="Online">Online</Option>
          <Option value="Offline">Offline</Option>
        </Select>
      </Input.Group>
      <Button
        type="primary"
        style={{ marginTop: 10 }}
        onClick={() => {
          onAdd({
            vendor,
            date,
            status,
          });
          setDate("");
          setStatus("Online");
          setVendor("");
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default PeripheralForm;
