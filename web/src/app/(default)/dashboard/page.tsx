import React from "react";
import { FreeUserDashboard } from "./FreeUserDashboard";
import Container from "@/components/common/Container";
import { getJobAnalysis } from "@/actions/job.action";
import { getHeaders } from "@/lib/utils/headers";
import ProDashboard from "./ProDashboard";

export default async function Dashboard() {
  const isUserPro = await getHeaders("x-user-pro");

  const data = await getJobAnalysis({
    page: 1,
    limit: 5
  });

  if (!data.ok || !data.data) {
    throw new Error(data.status.toString())
  }

  const { count, rows } = data.data;

  return (
    <Container className="max-w-full">
      {
        isUserPro ? (
          <> <ProDashboard data={data.data} /></>
        ) : (
          <>
            <FreeUserDashboard
              jobs={rows}
              count={count}
            />
          </>
        )
      }
    </Container >
  );
}