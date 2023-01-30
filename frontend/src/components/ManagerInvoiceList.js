import { Table } from "react-bootstrap";
import { addDecimals } from "../helpers";

const ManagerInvoiceList = ({ orders }) => {
  const paidOrders =
    orders &&
    orders.reduce(
      (acc, order) => acc + (order.isPaid ? +order.totalPrice : 0),
      0
    );
  const paidReturns =
    orders &&
    orders.reduce(
      (acc, order) => acc + (order.isPaid ? +order.totalPriceBack : 0),
      0
    );
  const revenue = +paidOrders - +paidReturns;

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
          <td>
            <strong>Total Orders Brutto:</strong>
          </td>
          <td>
            <strong>
              {" "}
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce((acc, order) => acc + +order.totalPrice, 0)
              )}
            </strong>
          </td>
          <td>
            <strong>
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc + (!order.isPaid ? +order.totalPrice : 0),
                    0
                  )
              )}
            </strong>
          </td>
          <td>
            <strong className='blue'>$ {addDecimals(paidOrders)}</strong>
          </td>
        </tr>

        <tr>
          <td>
            <strong>Total Return Brutto:</strong>
          </td>
          <td>
            <strong>
              {" "}
              -${" "}
              {addDecimals(
                orders &&
                  orders.reduce((acc, order) => acc + +order.totalPriceBack, 0)
              )}
            </strong>
          </td>
          <td>
            <strong>
              -${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc + (!order.isPaid ? +order.totalPriceBack : 0),
                    0
                  )
              )}
            </strong>
          </td>
          <td>
            <strong className='red'>-$ {addDecimals(paidReturns)}</strong>
          </td>
        </tr>

        <tr>
          <td>
            <strong>GRAND TOTAL BRUTTO:</strong>
          </td>
          <td>
            <strong>
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc + (+order.totalPrice - +order.totalPriceBack),
                    0
                  )
              )}
            </strong>
          </td>
          <td>
            <strong>
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc +
                      (!order.isPaid
                        ? +order.totalPrice - +order.totalPriceBack
                        : 0),
                    0
                  )
              )}
            </strong>
          </td>
          <td>
            <strong className={+revenue > 0 ? "green" : "red"}>
              $ {addDecimals(revenue)}
            </strong>
          </td>
        </tr>

        <tr>
          <td>
            <strong>Total Orders Netto:</strong>
          </td>
          <td>
            <strong>
              {" "}
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce((acc, order) => acc + +order.totalNetto, 0)
              )}
            </strong>
          </td>
          <td>
            <strong>
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc + (!order.isPaid ? +order.totalNetto : 0),
                    0
                  )
              )}
            </strong>
          </td>
          <td>
            <strong>
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc + (order.isPaid ? +order.totalNetto : 0),
                    0
                  )
              )}
            </strong>
          </td>
        </tr>

        <tr>
          <td>
            <strong>Total Return Netto:</strong>
          </td>
          <td>
            <strong>
              {" "}
              -${" "}
              {addDecimals(
                orders &&
                  orders.reduce((acc, order) => acc + +order.totalNettoBack, 0)
              )}
            </strong>
          </td>
          <td>
            <strong>
              -${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc + (!order.isPaid ? +order.totalNettoBack : 0),
                    0
                  )
              )}
            </strong>
          </td>
          <td>
            <strong>
              -${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc + (order.isPaid ? +order.totalNettoBack : 0),
                    0
                  )
              )}
            </strong>
          </td>
        </tr>

        <tr>
          <td>
            <strong>GRAND TOTAL NETTO:</strong>
          </td>
          <td>
            <strong>
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc + (+order.totalNetto - +order.totalNettoBack),
                    0
                  )
              )}
            </strong>
          </td>
          <td>
            <strong>
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc +
                      (!order.isPaid
                        ? +order.totalNetto - +order.totalNettoBack
                        : 0),
                    0
                  )
              )}
            </strong>
          </td>
          <td>
            <strong>
              ${" "}
              {addDecimals(
                orders &&
                  orders.reduce(
                    (acc, order) =>
                      acc +
                      (order.isPaid
                        ? +order.totalNetto - +order.totalNettoBack
                        : 0),
                    0
                  )
              )}
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

        <tr>
          <td>Items Total:</td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.itemsPrice, 0)
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (!order.isPaid ? +order.itemsPrice : 0),
                  0
                )
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (order.isPaid ? +order.itemsPrice : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Items Total Return:</td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.itemsPriceBack, 0)
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (!order.isPaid ? +order.itemsPriceBack : 0),
                  0
                )
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (order.isPaid ? +order.itemsPriceBack : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Tax Rate:</td>
          <td>
            ${" "}
            {addDecimals(
              orders && orders.reduce((acc, order) => acc + +order.taxPrice, 0)
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (!order.isPaid ? +order.taxPrice : 0),
                  0
                )
            )}
          </td>
          <td>
            ${" "}
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
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.taxPriceBack, 0)
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (!order.isPaid ? +order.taxPriceBack : 0),
                  0
                )
            )}
          </td>
          <td>
            -${" "}
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
          <td>Shipping Fee:</td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.shippingPrice, 0)
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (!order.isPaid ? +order.shippingPrice : 0),
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
                    acc + (order.isPaid ? +order.shippingPrice : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Shipping Fee Return:</td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.shippingPriceBack, 0)
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (!order.isPaid ? +order.shippingPriceBack : 0),
                  0
                )
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (order.isPaid ? +order.shippingPriceBack : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Vouchers:</td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (order.voucherActive ? 10 : 0),
                  0
                )
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (order.voucherActive && !order.isPaid ? 10 : 0),
                  0
                )
            )}
          </td>
          <td>
            -${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (order.voucherActive && order.isPaid ? 10 : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Vouchers Return:</td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (order.voucherActive && order.returnActive ? 10 : 0),
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
                    (order.voucherActive && order.returnActive && !order.isPaid
                      ? 10
                      : 0),
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
                    (order.voucherActive && order.returnActive && order.isPaid
                      ? 10
                      : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Premium Fee:</td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.primePrice, 0)
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (!order.isPaid ? +order.primePrice : 0),
                  0
                )
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) => acc + (order.isPaid ? +order.primePrice : 0),
                  0
                )
            )}
          </td>
        </tr>

        <tr>
          <td>Franchise Fee:</td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce((acc, order) => acc + +order.franchisePrice, 0)
            )}
          </td>
          <td>
            ${" "}
            {addDecimals(
              orders &&
                orders.reduce(
                  (acc, order) =>
                    acc + (!order.isPaid ? +order.franchisePrice : 0),
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
                    acc + (order.isPaid ? +order.franchisePrice : 0),
                  0
                )
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ManagerInvoiceList;
