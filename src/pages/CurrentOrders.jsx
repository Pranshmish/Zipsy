import  database  from "../appwrite/dbConfig";
import { useEffect } from "react";
import {/* FaHistory, FaListAlt, FaUtensils, FaUserCircle,*/ FaClock, FaPhone, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { handleOrderConfirmed, removeOneCurrentOrder } from "../store/vendorCurrentOrderSlice";



const CurrentOrders = () => {
    const dispatch=useDispatch();
    const productData=useSelector(state=>state.orderHistory.products)
    const userData=useSelector(state=>state.vendorData.users)
    const orderData=useSelector(state=>state.currentOrders.orders)

    const orders=[];

    const getMobileNumberByUserId=(userId)=>{
      const user=userData.find(user=>user.id==userId)
      return user.mobileNumber;
    }
    const getNameByUserId=(userId)=>{
      const user=userData.find(user=>user.id==userId)
      return user.name;
    }
    const getNameByProductId=(productId)=>{
      const product=productData.find(item=>item.id==productId);
      return product.name;
    }
    const getUnitByProductId=(productId)=>{
      const product=productData.find(item=>item.id==productId);
      return product.unit;
    }
    const handleOrderDelivery=async(orderId)=>{
      await database.orderFulfilled(orderId,true)   
      dispatch(removeOneCurrentOrder(orderId))      
    }
    const handleCancelOrder=async(orderId)=>{      
      await database.orderFulfilled(orderId,false)
      dispatch(removeOneCurrentOrder(orderId))      
    }

    const handleConfirmOrder=async(orderId)=>{
      await database.orderConfirmed(orderId)
      dispatch(handleOrderConfirmed(orderId,true))
    }   
 

    const setOrderData=()=>{
      orderData.map((item)=>{
        const items=[];
        item.orderedData.map((product,index)=>{
          const name =getNameByProductId(product.id)
          const unit =getUnitByProductId(product.id)
          const data={
            name:name,
            unit:unit,
            quantity:item.orderedQuantity[index]
          }
          items.push(data)
        })
        const orderData = {
          id:item.id,
          name:getNameByUserId(item.userId),
          phone:getMobileNumberByUserId(item.userId),
          time:item.createdAt,
          address:item.deliveryAddress,
          items:items,
          totalPrice:item.totalAmount,
          handlingCharge:item.platformFee,
          grandTotal:item.totalAmount+item.platformFee,
          isConfirmed:item.isConfirmed,
          isOutForDelivery:item.isOutForDelivery
        }
        orders.push(orderData)
      })
    }


    /*const orders = [
      { id: 1, name: "John Doe", phone: "123-456-7890", time: "12:30 PM", address: "V.S Hostel", items: [{ name: "Burger", quantity: 2 }], totalPrice: "₹10", handlingCharge: "₹2", grandTotal: "₹12" },
      { id: 2, name: "Jane Smith", phone: "987-654-3210", time: "1:00 PM", address: "MPH", items: [{ name: "Pizza", quantity: 1 }], totalPrice: "₹15", handlingCharge: "₹3", grandTotal: "₹18" },
    ];*/

    const groupedOrders = orders.reduce((acc, order) => {
      if (!acc[order.address]) acc[order.address] = [];
      acc[order.address].push(order);
      return acc;
    }, {});

    useEffect(()=>{
      setOrderData();
    },[userData,productData,orderData,dispatch])

    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Current Orders</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4 w-full">Out for Delivery</button>
        {Object.entries(groupedOrders).map(([address, orders]) => (
          <div key={address} className="mb-6 p-4 border-2 border-gray-400 rounded-lg bg-white shadow-md">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><FaMapMarkerAlt /> {address}</h3>
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-50 shadow-md rounded-lg p-4 mb-4 border border-gray-300">
                <div className="flex justify-between items-center mb-3 border-b pb-2">
                  <div>
                    <p className="font-semibold">{order.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2"><FaPhone /> {order.phone}</p>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2"><FaClock /> {order.time}</p>
                </div>
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <div>
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm font-bold">{item.name} X {item.unit} X {item.quantity}</p>
                    ))}
                  </div>
                  <div className="border-l-2 border-r-2 px-4 text-sm">
                    <p className="flex items-center gap-2"><FaRupeeSign /> Total Price: {order.totalPrice}</p>
                    <p className="flex items-center gap-2"><FaRupeeSign /> Handling Charge: {order.handlingCharge}</p>
                    <p className="font-semibold flex items-center gap-2"><FaRupeeSign /> Grand Total: {order.grandTotal}</p>
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  { !order.isConfirmed &&
                  <button className="bg-red-500 text-white px-3 py-1 rounded w-full" onClick={handleCancelOrder(order.id)}>
                    Cancel Order
                  </button>
                  }
                  { !order.isConfirmed &&
                    <button className="bg-green-500 text-white px-3 py-1 rounded w-full" onClick={handleConfirmOrder(order.id)}>
                      Confirm Order
                    </button> 
                  }
                  { order.isOutForDelivery &&
                    <button className="bg-green-500 text-white px-3 py-1 rounded w-full" onClick={handleOrderDelivery(order.id)}>
                      Deliver Order
                    </button> 
                  }  
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
};

export default CurrentOrders

/*const Vendor = () => {
  const [activeSection, setActiveSection] = useState("Current Orders");

  const renderSection = () => {
    switch (activeSection) {
      case "Order History":
        return <OrderHistory />;
      case "Current Orders":
        return <CurrentOrders />;
      case "Current Menu":
        return <CurrentMenu />;
      default:
        return <CurrentOrders />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-1 p-4">{renderSection()}</div>
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
};

export default Vendor;*/

/*const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-red-600">Vendor Panel</div>
      <div className="flex flex-col items-center">
        <FaUserCircle className="text-4xl text-gray-600" />
        <p className="text-sm font-semibold mt-1">Vendor Name</p>
      </div>
    </header>
  );
};

const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { name: "Order History", icon: <FaHistory /> },
    { name: "Current Orders", icon: <FaListAlt /> },
    { name: "Current Menu", icon: <FaUtensils /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around p-3 border-t">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setActiveSection(item.name)}
          className={`flex flex-col items-center gap-1 p-2 text-sm font-semibold transition-all ${
            activeSection === item.name ? "text-red-600 border-t-4 border-red-600" : "text-gray-600"
          }`}
        >
          {item.icon}
          {item.name}
        </button>
      ))}
    </nav>
  );
};*/