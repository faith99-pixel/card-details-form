import Image from "next/image";
import FormContainer from "./components/FormLayout/FormContainer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      <FormContainer />
    </main>
  );
}
