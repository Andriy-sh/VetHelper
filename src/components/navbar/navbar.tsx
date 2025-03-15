import { auth } from "../../../auth";
import NavBarElements from "./navBarElements";

export const NavBar = async () => {
  const session = await auth();

  return <NavBarElements session={session} />;
};
