import { getUserAndCountAll } from "@/actions/user.action";
import React from "react"
import UserClient from "./UserClient";

interface UserPageProps {
  searchParams: Promise<{
    limit?: string;
    page?: string;
    q?: string;
  }>
}

const UserPage: React.FC<UserPageProps> = async ({
  searchParams
}) => {

  const limit = "10";
  const page = "1";

  const search = await searchParams;

  const userRes = await getUserAndCountAll({
    page,
    ...search,
    limit
  });

  if (!userRes.ok || !userRes.data) {
    throw new Error(userRes.status.toString())
  }

  return (
    <UserClient data={userRes.data} />
  );
};

export default UserPage;