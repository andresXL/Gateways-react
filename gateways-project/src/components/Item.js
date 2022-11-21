import { Card } from "antd";

const Item = ({ item, propList, itemTitle, onSelectGateway, mappedValues }) => {
  return (
    <Card
      style={{ marginTop: 16, cursor: "pointer" }}
      type="inner"
      title={`${itemTitle} - ${item.id}`}
      onClick={() => (onSelectGateway ? onSelectGateway(item.id) : null)}
    >
      <span>
        {propList.map((prop, iter) => {
          return (
            <p key={`iter-${iter}`}>
              <span style={{ fontSize: 20, marginRight: 10 }}>
                {mappedValues[prop]}:
              </span>
              <span>{item[prop]}</span>
            </p>
          );
        })}
      </span>
    </Card>
  );
};

export default Item;
