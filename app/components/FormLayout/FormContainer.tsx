"use client";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import svgCard from "/images/card-logo.svg";

interface FormContainerProps {}

let renderCount = 0;

const FormContainer: FunctionComponent<FormContainerProps> = () => {
  const { register, handleSubmit } = useForm();
  renderCount++;
  const cardFront = "/images/bg-card-front.png";
  const cardBack = "/images/bg-card-back.png";
  //   const svgCard = (
  //     <svg width="84" height="47" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff" />
  //       <path
  //         d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z"
  //         stroke="#fff"
  //       />
  //     </svg>
  //   );

  return (
    <section className="flex">
      <div className="flex">
        <div className="absolute">
          <div className="relative top-20 left-28 z-10">
            <img src="/images/card-logo.svg" alt="" width={70} height={70} />
          </div>
          <p className="relative top-36 left-28 z-10 text-3xl tracking-wider">
            0000 0000 0000 0000
          </p>
          <div className="flex items-center justify-between relative -bottom-32 left-20 z-10 p-8 ">
            <h4 className="text-sm">JANE APPLESEED</h4>
            <p>00/00</p>
          </div>
          <div className="relative left-20 bottom-24">
            <img src={cardFront} alt="" width={400} height={400} />
          </div>
          <div className="relative left-40 -top-14">
            <img src={cardBack} alt="" width={400} height={400} />
          </div>
        </div>
        <div className="flex-none">
          <img
            src="/images/bg-main-desktop.png"
            alt=""
            className="max-w-full max-h-[700px]"
          />
        </div>
        <div className="w-[700px] max-h-[700px] pl-20 bg-white flex items-center justify-center">
          {renderCount}
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <h4 className="text-[#220930] mb-2 text-sm tracking-wide">
              CARDHOLDER NAME
            </h4>
            <input
              className="placeholder-gray-400 outline-none w-[300px] focus:ring-0 border border-gray-300 text-gray-900 p-2 rounded-md text-xs"
              {...register("cardholderName", { required: true })}
              placeholder="e.g Jane Appleseed"
            />
            <h4 className="text-[#220930] mb-2 text-sm mt-4 tracking-wide">
              CARD NUMBER
            </h4>
            <input
              className="placeholder-gray-400 w-[300px] focus:ring-0 outline-none border border-gray-300 text-gray-900 p-2 rounded-md text-xs"
              {...register("cardNumber", { required: true })}
              placeholder="e.g 1234 5678 9123 0000"
            />
            <div className="flex flex-col mt-4">
              <h4 className="text-[#220930] mb-2 text-sm tracking-wide">
                EXP.DATE (MM/YY)
              </h4>
              <div className="flex flex-row space-x-2">
                <input
                  className="h-8 placeholder-gray-400 outline-none focus:ring-0 border border-gray-300 text-gray-900 p-2 rounded-md text-xs w-20"
                  {...register("expiryMonth", { required: true })}
                  placeholder="e.g MM"
                />
                <input
                  className="h-8 placeholder-gray-400 focus:ring-0 border border-gray-300 text-gray-900 p-2 rounded-md text-xs w-20"
                  {...register("expiryYear", { required: true })}
                  placeholder="e.g YY"
                />
                <div className="flex flex-col position">
                  <h4 className="text-[#220930] text-sm flex flex-col relative -top-7 tracking-wide">
                    CVC
                  </h4>
                  <input
                    className="-mt-5 placeholder:tracking-wider placeholder-gray-400 outline-none border border-gray-300 text-gray-900 p-[6.35px] rounded-md text-xs w-[122px]"
                    {...register("cvc", { required: true })}
                    placeholder="e.g 123"
                  />
                </div>
              </div>
            </div>

            <input
              type="submit"
              className="bg-[#220930] w-full rounded-xl text-white px-4 py-2 mt-4 cursor-pointer"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormContainer;
