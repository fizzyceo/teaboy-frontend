"use client";
import validateEmail from "@/actions/admin/validate-email";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

const ValidateEmail = ({ params }: { params: { token: string } }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState({
    message: "",
    error: false,
  });

  useEffect(() => {
    const checkEmail = async () => {
      const response = await validateEmail(params.token);
      setResponse(response);
      setLoading(false);
    };

    checkEmail();
  }, [params.token]);

  return (
    <div className="m-auto flex w-4/5 flex-col items-center justify-center rounded-lg border border-gray-100 bg-slate-700 bg-opacity-10 p-4 drop-shadow-2xl backdrop-blur-sm md:w-1/2 lg:w-1/2">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-sky-500"></div>
        </div>
      ) : response.error ? (
        <div className="flex flex-col items-center justify-center">
          <X size={48} className="text-red-500" />
          <p className="text-lg text-black">{response.message}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Check size={48} className="text-green-500" />
          <p className="text-lg text-black">{response.message}</p>
        </div>
      )}
    </div>
  );
};

export default ValidateEmail;
