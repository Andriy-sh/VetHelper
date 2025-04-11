import Blog from "./Blog";
import ChatBot from "./ChatBot";
import Features from "./Features";
import Hero from "./Hero";
import Support from "./Support";

export default function StartPage() {
  return (
    <div>
      <Hero />
      <Support />
      <ChatBot />
      <Features />
      <Blog />
    </div>
  );
}
