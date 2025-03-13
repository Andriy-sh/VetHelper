import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <div
        className="min-h-screen pt-[72px] bg-zinc-900 bg-cover bg-center relative"
        style={{ backgroundImage: "url(/main.png)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="ml-16 w-[500px] flex flex-col h-full justify-center items-start px-4 relative z-10">
          <div className="h-[390px] space-y-4 flex flex-col justify-center items-start">
            <h1 className="font-bold text-5xl text-white">
              Connect with Vets Anytime, Anywhere
            </h1>
            <p className="font-normal text-base text-gray-300">
              VetHelper offers instant access to veterinary care through video
              consultations and chat. Whether it’s a routine question or an
              emergency, we’re here to help your pets thrive.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/profile"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md transition-transform transform hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-blue-500 text-blue-600 font-medium rounded-xl transition-transform transform hover:bg-blue-50 active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen flex items-center justify-center">
        <div className="w-full h-full px-16 py-28 flex gap-x-[80px]">
          <div className="flex-1 flex-col  flex  justify-center space-y-5">
            <h1 className="font-bold text-5xl">
              Instant Access to Veterinary Care Anytime
            </h1>
            <p className="font-normal text-base">
              With VetHelper, you can easily connect with experienced
              veterinarians through real-time video calls. Get the guidance you
              need for your pet`s health from the comfort of your home.
            </p>
            <div className="flex space-x-7">
              <div>
                <h1 className="font-bold text-lg">Easy Access</h1>
                <p className="font-normal text-base">
                  Speak directly with vets without the hassle of travel.
                </p>
              </div>
              <div>
                <h1 className="font-bold text-lg">Real-Time Support</h1>
                <p className="font-normal text-base">
                  Receive immediate advice for your pet`s urgent needs.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/learn-more"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 active:scale-95"
              >
                Learn More
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 border border-blue-500 text-blue-600 font-medium rounded-xl transition-transform transform hover:bg-blue-50 active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <Image
              width={600}
              height={600}
              src="/call.png"
              alt="qwe"
              className=" bg-red-400"
            />
          </div>
        </div>
      </div>

      <div className="h-screen flex items-center justify-center">
        <div className="w-full h-full px-16 py-28 flex gap-x-[80px]">
          <div className="flex-1 flex-col  flex  justify-center space-y-5">
            <h1 className="font-bold text-5xl">
              Get Instant Insights with Our Chatbot Symptom Checker for Your
              Pets
            </h1>
            <p className="font-normal text-base">
              Our Chatbot Symptom Checker provides pet owners with immediate
              guidance based on symptoms. It analyzes input and offers
              preliminary advice, helping you make informed decisions for your
              pet`s health.
            </p>
            <ul className="list-disc space-y-2 ml-4">
              <li>Quick symptom analysis for peace of mind.</li>
              <li>Accessible and user-friendly for all pet owners.</li>
              <li>Receive tailored advice at your fingertips.</li>
            </ul>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <Image
              width={600}
              height={600}
              src="/chatbot.png"
              alt="qwe"
              className=""
            />
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r">
        <div className="w-[80%] px-16 py-28">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-600">Features</p>
            <h1 className="font-bold text-5xl text-gray-800 mt-4">
              Explore Our Key Features
            </h1>
            <p className="text-xl text-gray-600 mt-4">
              Accessible veterinary care at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <svg
                width="49"
                height="49"
                viewBox="0 0 49 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M41.5622 15.1758L41.2822 14.6758C40.921 14.0712 40.4116 13.5686 39.8022 13.2158L26.3822 5.47579C25.7746 5.12329 25.0848 4.93703 24.3822 4.93579H23.8022C23.0996 4.93703 22.4098 5.12329 21.8022 5.47579L8.38217 13.2358C7.77611 13.5863 7.27269 14.0897 6.92217 14.6958L6.64217 15.1958C6.28967 15.8035 6.10341 16.4933 6.10217 17.1958V32.6958C6.10341 33.3984 6.28967 34.0882 6.64217 34.6958L6.92217 35.1958C7.28175 35.7948 7.78315 36.2962 8.38217 36.6558L21.8222 44.3958C22.4268 44.7556 23.1186 44.9424 23.8222 44.9358H24.3822C25.0848 44.9346 25.7746 44.7484 26.3822 44.3958L39.8022 36.6358C40.4142 36.2932 40.9196 35.7878 41.2622 35.1758L41.5622 34.6758C41.9104 34.0664 42.0964 33.3778 42.1022 32.6758V17.1758C42.101 16.4733 41.9148 15.7835 41.5622 15.1758ZM23.8022 8.93579H24.3822L36.1022 15.6958L24.1022 22.6158L12.1022 15.6958L23.8022 8.93579ZM26.1022 39.9358L37.8022 33.1758L38.1022 32.6758V19.1558L26.1022 26.0958V39.9358Z"
                  fill="black"
                />
              </svg>
              <h1 className="font-bold text-2xl text-gray-800 mt-6">
                Mobile and Web App Support
              </h1>
              <p className="text-lg text-gray-600 mt-4">
                Seamless access on any device.
              </p>
              <a
                href="/profile"
                className="text-purple-600 font-semibold mt-6 inline-block"
              >
                Learn More
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <svg
                width="49"
                height="49"
                viewBox="0 0 49 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M41.5622 15.1758L41.2822 14.6758C40.921 14.0712 40.4116 13.5686 39.8022 13.2158L26.3822 5.47579C25.7746 5.12329 25.0848 4.93703 24.3822 4.93579H23.8022C23.0996 4.93703 22.4098 5.12329 21.8022 5.47579L8.38217 13.2358C7.77611 13.5863 7.27269 14.0897 6.92217 14.6958L6.64217 15.1958C6.28967 15.8035 6.10341 16.4933 6.10217 17.1958V32.6958C6.10341 33.3984 6.28967 34.0882 6.64217 34.6958L6.92217 35.1958C7.28175 35.7948 7.78315 36.2962 8.38217 36.6558L21.8222 44.3958C22.4268 44.7556 23.1186 44.9424 23.8222 44.9358H24.3822C25.0848 44.9346 25.7746 44.7484 26.3822 44.3958L39.8022 36.6358C40.4142 36.2932 40.9196 35.7878 41.2622 35.1758L41.5622 34.6758C41.9104 34.0664 42.0964 33.3778 42.1022 32.6758V17.1758C42.101 16.4733 41.9148 15.7835 41.5622 15.1758ZM23.8022 8.93579H24.3822L36.1022 15.6958L24.1022 22.6158L12.1022 15.6958L23.8022 8.93579ZM26.1022 39.9358L37.8022 33.1758L38.1022 32.6758V19.1558L26.1022 26.0958V39.9358Z"
                  fill="black"
                />
              </svg>
              <h1 className="font-bold text-2xl text-gray-800 mt-6">
                Easy User and Pet Registration
              </h1>
              <p className="text-lg text-gray-600 mt-4">
                Quickly set up your profile and pets.
              </p>
              <a
                href="/profile"
                className="text-purple-600 font-semibold mt-6 inline-block"
              >
                Sign Up
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <svg
                width="49"
                height="49"
                viewBox="0 0 49 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M41.5622 15.1758L41.2822 14.6758C40.921 14.0712 40.4116 13.5686 39.8022 13.2158L26.3822 5.47579C25.7746 5.12329 25.0848 4.93703 24.3822 4.93579H23.8022C23.0996 4.93703 22.4098 5.12329 21.8022 5.47579L8.38217 13.2358C7.77611 13.5863 7.27269 14.0897 6.92217 14.6958L6.64217 15.1958C6.28967 15.8035 6.10341 16.4933 6.10217 17.1958V32.6958C6.10341 33.3984 6.28967 34.0882 6.64217 34.6958L6.92217 35.1958C7.28175 35.7948 7.78315 36.2962 8.38217 36.6558L21.8222 44.3958C22.4268 44.7556 23.1186 44.9424 23.8222 44.9358H24.3822C25.0848 44.9346 25.7746 44.7484 26.3822 44.3958L39.8022 36.6358C40.4142 36.2932 40.9196 35.7878 41.2622 35.1758L41.5622 34.6758C41.9104 34.0664 42.0964 33.3778 42.1022 32.6758V17.1758C42.101 16.4733 41.9148 15.7835 41.5622 15.1758ZM23.8022 8.93579H24.3822L36.1022 15.6958L24.1022 22.6158L12.1022 15.6958L23.8022 8.93579ZM26.1022 39.9358L37.8022 33.1758L38.1022 32.6758V19.1558L26.1022 26.0958V39.9358Z"
                  fill="black"
                />
              </svg>
              <h1 className="font-bold text-2xl text-gray-800 mt-6">
                OAuth Support for Easy Login
              </h1>
              <p className="text-lg text-gray-600 mt-4">
                Connect with Google or GitHub effortlessly.
              </p>
              <a
                href="/profile"
                className="text-purple-600 font-semibold mt-6 inline-block"
              >
                Join Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col justify-center items-center ">
        <div className="w-[90%] px-16 py-28">
          <div className="flex justify-between items-center mb-12">
            <h1 className="font-bold text-5xl text-gray-800">Blog</h1>
            <a href="/blog" className="text-purple-600 font-semibold text-lg">
              View all
            </a>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Short heading goes here
            </h2>
            <p className="text-xl text-gray-600">
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg flex justify-center flex-col items-center shadow-lg p-8">
              <Image width={200} height={200} alt="img" src="/healthy.png" />
              <span className="text-sm text-purple-600 font-semibold">
                Health
              </span>
              <h2 className="font-bold text-2xl text-gray-800 mt-4">
                Understanding Your Pet`s Nutritional Needs
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Learn how to keep your pet healthy and happy.
              </p>
              <div className="flex items-center mt-6">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">J</span>
                </div>
                <div className="ml-4">
                  <p className="text-gray-800 font-semibold">Dr. Jones</p>
                  <p className="text-sm text-gray-500">
                    15 Feb 2022 - 7 min read
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg flex justify-center flex-col items-center shadow-lg p-8">
              <Image width={206} height={206} alt="img" src="/behavior.png" />
              <span className="text-sm text-purple-600 font-semibold">
                Behavior
              </span>
              <h2 className="font-bold text-2xl text-gray-800 mt-4">
                Signs Your Pet May Be Anxious
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Recognize the signs of anxiety in your furry friend.
              </p>
              <div className="flex items-center mt-6">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">S</span>
                </div>
                <div className="ml-4">
                  <p className="text-gray-800 font-semibold">Dr. Smith</p>
                  <p className="text-sm text-gray-500">
                    11 Jan 2022 - 5 min read
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg flex justify-center flex-col items-center shadow-lg p-8">
              <Image width={206} height={206} alt="img" src="/training.png" />
              <span className="text-sm text-purple-600 font-semibold">
                Training
              </span>
              <h2 className="font-bold text-2xl text-gray-800 mt-4">
                Effective Training Techniques for Your Dog
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Master essential commands to improve your dog`s behavior.
              </p>
              <div className="flex items-center mt-6">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">L</span>
                </div>
                <div className="ml-4">
                  <p className="text-gray-800 font-semibold">Trainer Lee</p>
                  <p className="text-sm text-gray-500">
                    22 Mar 2022 - 6 min read
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-lg font-bold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/faqs" className="text-gray-400 hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-gray-400 hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4">Resources</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/pet-care"
                    className="text-gray-400 hover:text-white"
                  >
                    Pet Care
                  </a>
                </li>
                <li>
                  <a
                    href="/vet-tips"
                    className="text-gray-400 hover:text-white"
                  >
                    Vet Tips
                  </a>
                </li>
                <li>
                  <a
                    href="/success-stories"
                    className="text-gray-400 hover:text-white"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="text-gray-400 hover:text-white"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">Stay Connected</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://facebook.com"
                    className="text-gray-400 hover:text-white"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    className="text-gray-400 hover:text-white"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    className="text-gray-400 hover:text-white"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    className="text-gray-400 hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    className="text-gray-400 hover:text-white"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4">Subscribe</h2>
              <p className="text-gray-400 mb-4">
                Join our newsletter for the latest updates and veterinary tips.
              </p>
              <form className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded bg-gray-800 text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-gray-400 text-sm mt-4">
                By subscribing, you consent to receive updates and agree to our{" "}
                <a
                  href="/privacy-policy"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 VettHelper. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-gray-400 hover:text-white"
              >
                Terms of Service
              </a>
              <a
                href="/cookie-settings"
                className="text-gray-400 hover:text-white"
              >
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
