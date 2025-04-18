// import SideBar from "@/components/settings/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <main className="flex-1 ">{children}</main>
    </section>
  );
}
