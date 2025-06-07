//import { useState } from "react";
import { useEffect } from "react";
import {  FaClock, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";



const OrderHistory = () => {
  /*const orders = [
    { id: 1, date: "23 February", address: "V.S Hostel", items: [{ name: "Burger", quantity: 2 }], totalPrice: "₹10", handlingCharge: "₹2", grandTotal: "₹12" },
    { id: 2, date: "23 February", address: "MPH", items: [{ name: "Pizza", quantity: 1 }], totalPrice: "₹15", handlingCharge: "₹3", grandTotal: "₹18" },
  ];*/
    const productData=useSelector(state=>state.orderHistory.products)
    const orderHistory=useSelector(state=>state.orderHistory.orders)

    const orders=[];

    const getNameByProductId=(productId)=>{
        const product=productData.find(item=>item.id==productId);
        return product.name;
    }

    const getUnitByProductId=(productId)=>{
      const product=productData.find(item=>item.id==productId);
      return product.unit;
    }

    const setOrderHistoryData=()=>{
        orderHistory.map((order)=>{
            
            const items=[];
            order.orderedData.map((product,index)=>{
              const name =getNameByProductId(product.id)
              const unit =getUnitByProductId(product.id)
              const data={
                name:name,
                unit:unit,
                quantity:order.orderedQuantity[index]
              }
              items.push(data)
            })
            const data={
                id:order.id,
                date:order.date,
                time:order.time,
                address:order.address,
                items:items,
                totalPrice:order.totalAmount,
                handlingCharge:order.platformFee,
                grandTotal:order.totalAmount+order.platformFee
            }
            orders.push(data)
        })
    }


  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.date]) acc[order.date] = { orders: [], totalSales: 0 };
    acc[order.date].orders.push(order);
    acc[order.date].totalSales += parseInt(order.grandTotal.replace("₹", ""), 10);
    return acc;
  }, {});

  useEffect(()=>{
    setOrderHistoryData()   
  },[])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      {Object.entries(groupedOrders).map(([date, data]) => (
        <div key={date} className="mb-6 p-4 border-2 border-gray-400 rounded-lg bg-white shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">{date}</h3>
            <p className="text-lg font-semibold">Total Sale: ₹{data.totalSales}</p>
          </div>
          {data.orders.map((order) => (
            <div key={order.id} className="bg-gray-50 shadow-md rounded-lg p-4 mb-4 border border-gray-300">
              <div className="flex justify-between items-center mb-3 border-b pb-2">
                <p className="font-semibold flex items-center gap-2"><FaMapMarkerAlt /> {order.address}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2"><FaClock /> {order.time}</p>
              </div>
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <div>
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm font-bold">{item.quantity}x {item.name}</p>
                  ))}
                </div>
                <div className="border-l-2 border-r-2 px-4 text-sm">
                  <p className="flex items-center gap-2"><FaRupeeSign /> Total Price: {order.totalPrice}</p>
                  <p className="flex items-center gap-2"><FaRupeeSign /> Handling Charge: {order.handlingCharge}</p>
                  <p className="font-semibold flex items-center gap-2"><FaRupeeSign /> Grand Total: {order.grandTotal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory