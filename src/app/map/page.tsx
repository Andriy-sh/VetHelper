import { getUser } from "@/lib/service/user";
import { auth } from "../../../auth";
import Map from "@/components/map/map";

export default async function MapPage() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await getUser({ user: { email: session.user.email } });

  if (!user.city) {
    throw new Error("User has no city specified");
  }

  return (
    <div className="flex justify-center items-center ">
      <Map city={user.city} />
    </div>
  );
}
