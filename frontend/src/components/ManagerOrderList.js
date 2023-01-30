import { Table } from "react-bootstrap";
import { addDecimals } from "../helpers";

const ManagerOrderList = ({ orders }) => {
  const revenue =
    orders &&
    orders.reduce(
      (acc, order) =>
        acc + (order.isPaid ? +order.totalNetto - +order.totalNettoBack : 0),
      0
    );

  const costs =
    orders &&
    orders.reduce(
      (acc, order) =>
        acc + (!order.returnActive && order.isPaid ? +order.cost : 0),
      0
    );

  const profit = +revenue - +costs;

  return (
    <Table responsive hover striped>
      <thead>
        <tr>
          <th></th>
          <th>Total</th>
          <th>Not paid</th>
          <th>Paid</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Orders Total Brutto:</td>
          <td>
            {" "}
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.totalPrice, 0)
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (!order.isPaid ? +order.totalPrice : 0),
                  0
                )
            )}
          </td>
          <td className='blue'>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (order.isPaid ? +order.totalPrice : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Total Return Brutto:</td>
          <td>
            {" "}
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.totalPriceBack, 0)
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (!order.isPaid ? +order.totalPriceBack : 0),
                  0
                )
            )}
          </td>
          <td className='red'>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (order.isPaid ? +order.totalPriceBack : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Orders Total Netto:</td>
          <td>
            {" "}
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.totalNetto, 0)
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (!order.isPaid ? +order.totalNetto : 0),
                  0
                )
            )}
          </td>
          <td className='blue'>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (order.isPaid ? +order.totalNetto : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Total Return Netto:</td>
          <td>
            {" "}
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.totalNettoBack, 0)
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (!order.isPaid ? +order.totalNettoBack : 0),
                  0
                )
            )}
          </td>
          <td className='red'>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (order.isPaid ? +order.totalNettoBack : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Tax Rate:</td>
          <td>
            -${" "}
            {addDecimals(
              orders && orders.reduce((acc, order) => acc + +order.taxPrice, 0)
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (!order.isPaid ? +order.taxPrice : 0),
                  0
                )
            )}
          </td>
          <td className='red'>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (order.isPaid ? +order.taxPrice : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Tax Rate Return:</td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.taxPriceBack, 0)
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (!order.isPaid ? +order.taxPriceBack : 0),
                  0
                )
            )}
          </td>
          <td className='green'>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (order.isPaid ? +order.taxPriceBack : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>
            <strong> REVENUE:</strong>
          </td>
          <td></td>
          <td></td>
          <td>
            <strong className={+revenue > 0 ? "green" : "red"}>
              $ {addDecimals(revenue)}
            </strong>
          </td>
        </tr>

        <tr>
          <td>Purchase Cost:</td>
          <td>
            -${" "}
            {addDecimals(
              orders && orders.reduce((acc, order) => acc + +order.cost, 0)
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (!order.isPaid ? +order.cost : 0),
                  0
                )
            )}
          </td>
          <td className='red'>
            -$
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (order.isPaid ? +order.cost : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Purchase Cost Return:</td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (order.returnActive ? +order.cost : 0),
                  0
                )
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc +
                    (order.returnActive && !order.isPaid ? +order.cost : 0),
                  0
                )
            )}
          </td>
          <td className='green'>
            $
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc +
                    (order.returnActive && order.isPaid ? +order.cost : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>
            <strong>PROFIT:</strong>
          </td>
          <td></td>
          <td></td>
          <td>
            <strong className={+profit > 0 ? "green" : "red"}>
              $ {addDecimals(profit)}
            </strong>
          </td>
        </tr>

        <tr>
          <td>Orders Quantity:</td>
          <td>{orders && orders.length}</td>
          <td>
            {orders &&
              orders.reduce((acc, order) => acc + (!order.isPaid ? 1 : 0), 0)}
          </td>
          <td>
            {orders &&
              orders.reduce((acc, order) => acc + (order.isPaid ? 1 : 0), 0)}
          </td>
        </tr>

        <tr>
          <td>Order Returns Quantity:</td>
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
                (acc, order) =>
                  acc + (order.returnActive && !order.isPaid ? 1 : 0),
                0
              )}
          </td>
          <td>
            {orders &&
              orders.reduce(
                (acc, order) =>
                  acc + (order.returnActive && order.isPaid ? 1 : 0),
                0
              )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ManagerOrderList;
