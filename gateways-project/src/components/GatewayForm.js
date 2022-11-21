import { Input, Button } from "antd";
import { useState } from "react";

const GatewayForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [serialNumber, setSerial] = useState("");
  const [ipv4, setIp] = useState("");

  return (
    <div>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Serial Number"
        style={{ marginTop: 10 }}
        value={serialNumber}
        onChange={(e) => setSerial(e.target.value)}
      />
      <Input
        placeholder="IPv4 Address"
        style={{ marginTop: 10 }}
        value={ipv4}
        onChange={(e) => setIp(e.target.value)}
      />
      <Button
        type="primary"
        style={{ marginTop: 10 }}
        onClick={() => {
          onAdd({
            name,
            serialNumber,
            ipv4,
          });
          setIp("");
          setName("");
          setSerial("");
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default GatewayForm;
