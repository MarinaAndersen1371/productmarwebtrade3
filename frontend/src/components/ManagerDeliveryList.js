import { Table } from "react-bootstrap";

const ManagerDeliveryList = ({ orders }) => {
  return (
    <Table responsive hover striped>
      <thead>
        <tr>
          <th></th>
          <th>Total</th>
          <th>Not Dispatched</th>
          <th>Dispatched</th>
          <th>Delivered</th>
          <th>Returned</th>
          <th>Received back</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>All Delivery:</td>
          <td>{orders && orders.length}</td>
          <td>
            {orders &&
              orders.reduce((acc, order) => acc + (!order.isSent ? 1 : 0), 0)}
          </td>
          <td>
            {orders &&
              orders.reduce((acc, order) => acc + (order.isSent ? 1 : 0), 0)}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) => acc + (order.isDelivered ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) => acc + (order.returnActive ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) => acc + (order.isReceived ? 1 : 0),
                0
              )}
          </td>
        </tr>
        <tr>
          <td>Fastest:</td>
          <td>
            {" "}
            {orders &&
              orders.reduce(
                (acc, order) => acc + (+order.shippingPrice === 10 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc + (!order.isSent && +order.shippingPrice === 10 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc + (order.isSent && +order.shippingPrice === 10 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc +
                  (order.isDelivered && +order.shippingPrice === 10 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc +
                  (order.returnActive && +order.shippingPrice === 10 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc +
                  (order.isReceived && +order.shippingPrice === 10 ? 1 : 0),
                0
              )}
          </td>
        </tr>

        <tr>
          <td>Standard:</td>
          <td>
            {" "}
            {orders &&
              orders.reduce(
                (acc, order) => acc + (+order.shippingPrice === 5 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc + (!order.isSent && +order.shippingPrice === 5 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc + (order.isSent && +order.shippingPrice === 5 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc +
                  (order.isDelivered && +order.shippingPrice === 5 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc +
                  (order.returnActive && +order.shippingPrice === 5 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc +
                  (order.isReceived && +order.shippingPrice === 5 ? 1 : 0),
                0
              )}
          </td>
        </tr>

        <tr>
          <td>Free:</td>
          <td>
            {" "}
            {orders &&
              orders.reduce(
                (acc, order) => acc + (+order.shippingPrice === 0 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc + (!order.isSent && +order.shippingPrice === 0 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc + (order.isSent && +order.shippingPrice === 0 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc +
                  (order.isDelivered && +order.shippingPrice === 0 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc +
                  (order.returnActive && +order.shippingPrice === 0 ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc +
                  (order.isReceived && +order.shippingPrice === 0 ? 1 : 0),
                0
              )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ManagerDeliveryList;
