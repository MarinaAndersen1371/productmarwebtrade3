import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FranchiseInfoScreen from "./screens/FranchiseInfoScreen";
import FranchiseProductListScreen from "./screens/FranchiseProductListScreen";
import AdminProductListScreen from "./screens/AdminProductListScreen";
import AdminProductEditScreen from "./screens/AdminProductEditScreen";
import AdminCustomerListScreen from "./screens/AdminCustomerListScreen";
import AdminCustomerEditScreen from "./screens/AdminCustomerEditScreen";
import AdminOrderListScreen from "./screens/AdminOrderListScreen";
import AdminTicketListScreen from "./screens/AdminTicketListScreen";
import ManagerProductListScreen from "./screens/ManagerProductListScreen";
import ManagerProductEditScreen from "./screens/ManagerProductEditScreen";
import ManagerCustomerListScreen from "./screens/ManagerCustomerListScreen";
import ManagerCustomerEditScreen from "./screens/ManagerCustomerEditScreen";
import ManagerPrimeListScreen from "./screens/ManagerPrimeListScreen";
import ManagerFranchiseListScreen from "./screens/ManagerFranchiseListScreen";
import ManagerOrderListScreen from "./screens/ManagerOrderListScreen";
import ManagerOrderEditScreen from "./screens/ManagerOrderEditScreen";
import ManagerOrderReturnScreen from "./screens/ManagerOrderReturnScreen";
import ManagerInvoiceListScreen from "./screens/ManagerInvoiceListScreen";
import ManagerDeliveryListScreen from "./screens/ManagerDeliveryListScreen";
import ManagerDeviceListScreen from "./screens/ManagerDeviceListScreen";
import ManagerVoucherListScreen from "./screens/ManagerVoucherListScreen";
import ManagerTicketListScreen from "./screens/ManagerTicketListScreen";
import SupportTicketListScreen from "./screens/SupportTicketListScreen";
import SupportOrderListScreen from "./screens/SupportOrderListScreen";
import SupportOrderEditScreen from "./screens/SupportOrderEditScreen";
import SupportDeliveryListScreen from "./screens/SupportDeliveryListScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import ShippingScreen from "./screens/ShippingScreen";
import InvoiceAddressScreen from "./screens/InvoiceAddressScreen";
import SupportScreen from "./screens/SupportScreen";
import TicketScreen from "./screens/TicketScreen";
import MyOrderListScreen from "./screens/MyOrderListScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import CustomerTestScreen from "./screens/CustomerTestScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ContactScreen from "./screens/ContactScreen";
import InfoScreen from "./screens/InfoScreen";
import InfoGermanScreen from "./screens/InfoGermanScreen";
import InfoSpanishScreen from "./screens/InfoSpanishScreen";
import InfoRussianScreen from "./screens/InfoRussianScreen";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderReturnRequestScreen from "./screens/OrderReturnRequestScreen";
import OrderReturnScreen from "./screens/OrderReturnScreen";
import InvoiceScreen from "./screens/InvoiceScreen";
import DeliveryNoteScreen from "./screens/DeliveryNoteScreen";
import DeviceProtectionScreen from "./screens/DeviceProtectionScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
            />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/customertest/:id' element={<CustomerTestScreen />} />
            <Route path='/ticket/:id' element={<TicketScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/invoice/:id' element={<InvoiceScreen />} />
            <Route path='/deliverynote/:id' element={<DeliveryNoteScreen />} />
            <Route path='/device/:id' element={<DeviceProtectionScreen />} />
            <Route
              path='/confirmreturn/:id'
              element={<OrderReturnRequestScreen />}
            />
            <Route path='/returnedorder/:id' element={<OrderReturnScreen />} />
            <Route path='/myorders' element={<MyOrderListScreen />} />
            <Route path='/support' element={<SupportScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/invoiceaddress' element={<InvoiceAddressScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/subscription' element={<SubscriptionScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/contact' element={<ContactScreen />} />
            <Route path='/info' element={<InfoScreen />} />
            <Route path='/infogerman' element={<InfoGermanScreen />} />
            <Route path='/infospanish' element={<InfoSpanishScreen />} />
            <Route path='/inforussian' element={<InfoRussianScreen />} />

            <Route
              path='/admin/productlist'
              element={<AdminProductListScreen />}
            />
            <Route
              path='/admin/productlist/page/:pageNumber'
              element={<AdminProductListScreen />}
            />
            <Route
              path='/admin/product/:id/edit'
              element={<AdminProductEditScreen />}
            />
            <Route
              path='/admin/ticketlist'
              element={<AdminTicketListScreen />}
            />
            <Route path='/admin/orderlist' element={<AdminOrderListScreen />} />
            <Route
              path='/admin/customerlist'
              element={<AdminCustomerListScreen />}
            />
            <Route
              path='/admin/customer/:id/edit'
              element={<AdminCustomerEditScreen />}
            />
            <Route
              path='/manager/productlist'
              element={<ManagerProductListScreen />}
            />
            <Route
              path='/manager/productlist/page/:pageNumber'
              element={<ManagerProductListScreen />}
            />
            <Route
              path='/manager/product/:id/edit'
              element={<ManagerProductEditScreen />}
            />
            <Route
              path='/manager/ticketlist'
              element={<ManagerTicketListScreen />}
            />
            <Route
              path='/manager/orderlist'
              element={<ManagerOrderListScreen />}
            />
            <Route
              path='/manager/returnlist'
              element={<ManagerOrderReturnScreen />}
            />
            <Route
              path='/manager/order/:id/edit'
              element={<ManagerOrderEditScreen />}
            />
            <Route
              path='/manager/primelist'
              element={<ManagerPrimeListScreen />}
            />
            <Route
              path='/manager/franchiselist'
              element={<ManagerFranchiseListScreen />}
            />
            <Route
              path='/manager/invoicelist'
              element={<ManagerInvoiceListScreen />}
            />
            <Route
              path='/manager/deliverylist'
              element={<ManagerDeliveryListScreen />}
            />
            <Route
              path='/manager/devicelist'
              element={<ManagerDeviceListScreen />}
            />
            <Route
              path='/manager/voucherlist'
              element={<ManagerVoucherListScreen />}
            />
            <Route
              path='/manager/customerlist'
              element={<ManagerCustomerListScreen />}
            />
            <Route
              path='/manager/customer/:id/edit'
              element={<ManagerCustomerEditScreen />}
            />
            <Route
              path='/support/ticketlist'
              element={<SupportTicketListScreen />}
            />
            <Route
              path='/support/orderlist'
              element={<SupportOrderListScreen />}
            />
            <Route
              path='/support/deliverylist'
              element={<SupportDeliveryListScreen />}
            />
            <Route
              path='/support/order/:id/edit'
              element={<SupportOrderEditScreen />}
            />
            <Route path='/franchise/info' element={<FranchiseInfoScreen />} />
            <Route
              path='/franchise/productlist'
              element={<FranchiseProductListScreen />}
            />
            <Route
              path='/franchise/productlist/page/:pageNumber'
              element={<FranchiseProductListScreen />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
