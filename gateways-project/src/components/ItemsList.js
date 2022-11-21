import { Card, Row, Col, Button } from "antd";
import GatewayForm from "./GatewayForm";
import Item from "./Item";
import { useState } from "react";
import PeripheralForm from "./PeripheralForm";

const ItemsList = ({
  items,
  itemTitle,
  propList,
  onAdd,
  onSelectGateway,
  mappedValues,
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Row justify="center" align="middle">
      <Col xs={24} md={18}>
        <Card title={`${itemTitle}s`} style={{ marginBottom: 20 }}>
          <Row justify="end">
            <Col>
              <Button
                style={{
                  color: "white",
                  backgroundColor: showForm ? "red" : "green",
                }}
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "Add"}
              </Button>
            </Col>
          </Row>
          {showForm && (
            <Row justify="center" align="middle" style={{ marginTop: 20 }}>
              <Col xs={12}>
                {itemTitle === "Gateway" ? (
                  <GatewayForm onAdd={onAdd} />
                ) : (
                  <PeripheralForm onAdd={onAdd} />
                )}
              </Col>
            </Row>
          )}
          {items.map((item, iter) => {
            return (
              <Item
                onSelectGateway={onSelectGateway}
                itemTitle={itemTitle}
                propList={propList}
                key={`item-${iter}`}
                item={item}
                mappedValues={mappedValues}
              />
            );
          })}
        </Card>
      </Col>
    </Row>
  );
};

export default ItemsList;
