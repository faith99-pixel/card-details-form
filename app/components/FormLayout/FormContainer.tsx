"use client";
import React, {
  ChangeEvent,
  FunctionComponent,
  FormEvent,
  useState,
} from "react";
import { toast } from "react-toastify";

interface FormContainerProps {}

const FormContainer: FunctionComponent<FormContainerProps> = () => {
  const cardFront = "/images/bg-card-front.png";
  const cardBack = "/images/bg-card-back.png";

  const [formValues, setFormValues] = useState({
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    cardName: false,
    cardNumber: false,
    expiryMonth: false,
    expiryYear: false,
    cvc: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onFormValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorMessages((prev) => ({ ...prev, [name]: false }));
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const clearFields = () => {
    setFormValues({
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    });
  };

  const validateForm = () => {
    const { cardName, cardNumber, expiryMonth, expiryYear, cvc } = formValues;
    let isValid = true;
    const newErrorMessages = {
      cardName: false,
      cardNumber: false,
      expiryMonth: false,
      expiryYear: false,
      cvc: false,
    };

    if (!cardName) {
      newErrorMessages.cardName = true;
      isValid = false;
    }
    if (cardNumber.length !== 16) {
      newErrorMessages.cardNumber = true;
      isValid = false;
    }
    if (
      expiryMonth.length !== 2 ||
      parseInt(expiryMonth) > 12 ||
      parseInt(expiryMonth) < 1
    ) {
      newErrorMessages.expiryMonth = true;
      isValid = false;
    }
    if (expiryYear.length !== 2) {
      newErrorMessages.expiryYear = true;
      isValid = false;
    }
    if (cvc.length !== 3) {
      newErrorMessages.cvc = true;
      isValid = false;
    }

    setErrorMessages(newErrorMessages);

    return isValid;
  };

  const handleFormSubmission = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = { status: 200 };

      if (response.status === 200) {
        toast.success("Your message has been sent successfully!");
        clearFields();
      } else {
        toast.error("An error occurred while sending your message");
      }
    } catch (error) {
      toast.error("An error occurred while sending your message");
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <section className="flex">
      <div className="flex">
        <div className="absolute">
          <div className="relative top-36 left-28 z-10">
            <img src="/images/card-logo.svg" alt="" width={70} height={70} />
          </div>
          <p className="relative top-48 left-28 z-10 text-3xl tracking-wider">
            {formValues.cardNumber || "0000 0000 0000 0000"}
          </p>
          <div className="flex items-center justify-between relative top-44 left-20 z-10 p-8">
            <h4 className="text-sm">
              {formValues.cardName || "JANE APPLESEED"}
            </h4>
            <p>{`${formValues.expiryMonth || "00"}/${
              formValues.expiryYear || "00"
            }`}</p>
          </div>
          <div className="relative left-20 bottom-10">
            <img src={cardFront} alt="" width={400} height={400} />
          </div>
          <div className="relative left-40 -top-18">
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
          <form onSubmit={handleFormSubmission}>
            <div className="mb-4 flex flex-col">
              <label
                className="text-[#220930] mb-2 text-sm tracking-wide"
                htmlFor="cardName"
              >
                CARDHOLDER NAME
              </label>
              <input
                id="cardName"
                name="cardName"
                className="placeholder-gray-400 outline-none w-[300px] focus:ring-0 border border-gray-300 text-gray-900 p-2 rounded-md text-xs"
                value={formValues.cardName}
                onChange={onFormValueChange}
                placeholder="e.g Jane Appleseed"
              />
              {errorMessages.cardName && (
                <span className="text-red-500">
                  Cardholder name is required
                </span>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <label
                className="text-[#220930] mb-2 text-sm tracking-wide"
                htmlFor="cardNumber"
              >
                CARD NUMBER
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                maxLength={16}
                className="placeholder-gray-400 outline-none w-[300px] focus:ring-0 border border-gray-300 text-gray-900 p-2 rounded-md text-xs"
                value={formValues.cardNumber}
                onChange={onFormValueChange}
                placeholder="e.g 1234 5678 9123 0000"
              />
              {errorMessages.cardNumber && (
                <span className="text-red-500">
                  Wrong format. Numbers only.
                </span>
              )}
            </div>
            <div className="flex flex-row mt-4">
              <div className="flex flex-col">
                <label className="text-[#220930] mb-2 text-sm tracking-wide">
                  EXP.DATE (MM/YY)
                </label>
                <div className="flex flex-row space-x-2">
                  <input
                    name="expiryMonth"
                    type="text"
                    maxLength={2}
                    className="h-8 placeholder-gray-400 outline-none focus:ring-0 border border-gray-300 text-gray-900 p-2 rounded-md text-xs w-20"
                    value={formValues.expiryMonth}
                    onChange={onFormValueChange}
                    placeholder="MM"
                  />
                  <input
                    name="expiryYear"
                    type="text"
                    maxLength={2}
                    className="h-8 placeholder-gray-400 outline-none focus:ring-0 border border-gray-300 text-gray-900 p-2 rounded-md text-xs w-20"
                    value={formValues.expiryYear}
                    onChange={onFormValueChange}
                    placeholder="YY"
                  />
                </div>

                {errorMessages.expiryMonth && (
                  <span className="text-red-500">Can't be blank</span>
                )}
              </div>
              <div className="flex flex-col -mt-0 pl-2">
                <label className="text-[#220930] mb-2 text-sm tracking-wide">
                  CVC
                </label>
                <input
                  name="cvc"
                  type="text"
                  maxLength={3}
                  className="placeholder:tracking-wider placeholder-gray-400 outline-none border border-gray-300 text-gray-900 p-[6.35px] rounded-md text-xs w-[122px]"
                  value={formValues.cvc}
                  onChange={onFormValueChange}
                  placeholder="e.g 123"
                />
                {errorMessages.cvc && (
                  <span className="text-red-500">CVC must be 3 digits</span>
                )}
              </div>
            </div>

            <input
              type="submit"
              className="bg-[#220930] w-full rounded-xl text-white px-4 py-2 mt-4 cursor-pointer"
              value="Submit"
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormContainer;
