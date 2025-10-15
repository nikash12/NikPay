import Image from "next/image";

export default function Home() {
  return (
    <div className="" >
      <h1>{process.env.DATABASE_URL}</h1>
    </div>
  );
}
