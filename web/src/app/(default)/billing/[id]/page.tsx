import { getPay } from "@/actions/pay.action";
import React from "react"
import PayClient from "./PayClient";

interface PageProps { 
  params: Promise<{
    id: string;
  }>,
}

const Page: React.FC<PageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const res = await getPay(id);
  
  if (!res.data) {
    throw new Error(res.status.toString())
  }

  return (
    <PayClient pay={res.data} />
  );
};

export default Page;