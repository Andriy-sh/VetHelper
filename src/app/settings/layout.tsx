import SideBar from "@/components/settings/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <SideBar />
      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
