import "./App.css";
import Header from "./components/Header";
import ItemsList from "./components/ItemsList";
import { useState, useEffect } from "react";
import { Modal } from "antd";

const App = () => {
  const [gateways, setGateways] = useState([]);
  const [peripherals, setPeripherals] = useState([]);

  const [selectedGateway, setSelectGateway] = useState(0);

  useEffect(() => {
    const getGateways = async () => {
      const gatewaysServer = await fetchGateways();
      setGateways(gatewaysServer || []);
    };
    getGateways();
  }, []);

  const fetchGateways = async () => {
    const list = await fetch("http://localhost:5000/gateways");
    const data = await list.json();
    return data;
  };

  const fetchPeripherals = async (id) => {
    const list = await fetch("http://localhost:5000/peripherals");
    const data = await list.json();
    setPeripherals(data.filter((item) => item.gateways_id === id));
  };

  const onSelectGateway = (id) => {
    setSelectGateway(id);
    fetchPeripherals(id);
  };

  const addGateway = async (gateway) => {
    if (!gateway.name || !gateway.serialNumber || !gateway.ipv4)
      alert("All inputs must be filled");
    else {
      const indexSerial = gateways.findIndex(
        (item) => item.serial_number === gateway.serialNumber
      );
      const indexIP = gateways.findIndex(
        (item) => item.ipv4_address === gateway.ipv4
      );
      if (indexSerial > -1) alert("Serial number must be unique");
      else if (indexIP > -1) alert("ipv4 address number must be unique");
      else {
        const ans = await fetch("http://localhost:5000/gateways", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: gateway.name,
            serial_number: gateway.serialNumber,
            ipv4_address: gateway.ipv4,
          }),
        });

        const data = await ans.json();

        setGateways([...gateways, data]);
      }
    }
  };

  const addPeripheral = async (peripheral) => {
    if (!peripheral.vendor || !peripheral.date || !peripheral.status)
      alert("All inputs must be filled");
    else if (peripherals.length === 10) {
      alert("You cannot add more peripherals to this gateway");
    } else {
      const ans = await fetch("http://localhost:5000/peripherals", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...peripheral,
          gateways_id: selectedGateway,
        }),
      });

      const data = await ans.json();

      setPeripherals([...peripherals, data]);
    }
  };

  const title = "Gateways project";
  return (
    <div>
      <Header title={title} />
      <div className="App">
        <ItemsList
          onSelectGateway={onSelectGateway}
          onAdd={addGateway}
          itemTitle="Gateway"
          items={gateways}
          propList={["name", "serial_number", "ipv4_address"]}
          mappedValues={{
            name: "Name",
            serial_number: "Serial number",
            ipv4_address: "IPv4",
          }}
        />
        <Modal
          footer={null}
          title={`Peripherals from gateway - ${selectedGateway}`}
          open={selectedGateway > 0}
          onCancel={() => setSelectGateway(0)}
        >
          <ItemsList
            itemTitle="Peripheral"
            items={peripherals}
            propList={["vendor", "date", "status"]}
            mappedValues={{ vendor: "Vendor", date: "Date", status: "Status" }}
            onAdd={addPeripheral}
          />
        </Modal>
      </div>
    </div>
  );
};

export default App;
