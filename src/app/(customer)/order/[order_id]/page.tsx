"use client";

import getOrderDetails from "@/actions/order/get-order-info";
import StatusStepper from "@/components/order/statusStepper";
import { Order } from "@/stores/order.store";
import React, { useEffect, useState } from "react";

const OrderStatus = ({ params }: { params: { order_id: string } }) => {
  //fetch the order infos from the order id
  const [orderInfo, setOrderInfo] = useState<Order>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const steps = [
    { label: "PENDING" },
    { label: "IN_PROGRESS" },
    { label: "COMPLETED" },
    { label: "DELIVERED" },
  ];
  useEffect(() => {
    if (params.order_id) {
      const loadOrderDetails = async () => {
        const response = await getOrderDetails(params.order_id);

        console.log(response);
        if (response?.statusCode === 404) {
          setErrorMsg(response?.message);
        } else {
          setOrderInfo(response);
        }
      };

      setIsLoading(true);
      loadOrderDetails();
      setIsLoading(false);
    }
  }, [params.order_id]);
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gray-900">
        <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-gray-100 p-5 shadow-inner shadow-slate-900">
          <h2 className="text-start">
            ORDER{" "}
            <span className="font-medium text-green-600">
              #{orderInfo && orderInfo.order_number}
            </span>
          </h2>
          <StatusStepper
            currentStep={steps.findIndex((s) => s.label === "IN_PROGRESS") + 2}
            steps={steps}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
