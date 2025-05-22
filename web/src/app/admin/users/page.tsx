import { getUsers } from "@/actions/user.action";
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

  const user = await getUsers({
    page,
    ...search,
    limit
  });
  console.log(user);
  return (
    <UserClient />
  );
};

export default UserPage;