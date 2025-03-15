import { getUser } from "@/lib/service/user";
import { auth } from "../../../auth";
import Map from "@/components/map/map";
import AddingCity from "@/components/profile/addingCity";

export default async function MapPage() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await getUser({ user: { email: session.user.email } });

  if (!user.city) {
    return <AddingCity session={session} user={user} />;
  }
  return (
    <div className="flex justify-center items-center ">
      <Map city={user.city} />
    </div>
  );
}
