"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/Impulsa.svg"
              alt="Impulsa Logo"
              width={200}
              height={125}
              className="object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About Impulsa
          </h1>
          <p className="text-xl text-gray-700 italic">
            Your AI-powered guide to navigating culture shock abroad
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* What is Impulsa */}
          <section>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              What is Impulsa?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Impulsa is an innovative platform designed to help students and
              professionals adapt to studying or working abroad. We understand
              that moving to a new country brings excitement and
              challenges—especially culture shock. Our mission is to turn that
              initial confusion into confident cultural understanding.
            </p>
          </section>

          {/* The Problem */}
          <section>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              The Problem We Solve
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Every year, millions of people experience culture shock when
              moving abroad:
            </p>
            <ul className="space-y-2 text-gray-700 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🤔</span>
                <span>Confusion about unspoken social rules and etiquette</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">😰</span>
                <span>Anxiety from accidental cultural misunderstandings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🗣️</span>
                <span>
                  Difficulty navigating language barriers and local customs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏫</span>
                <span>
                  Lack of preparation for university or workplace culture
                </span>
              </li>
            </ul>
          </section>

          {/* Our Solution */}
          <section>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Our Solution
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Impulsa uses AI-powered insights to provide:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-2">
                  🎓 University Guidance
                </h3>
                <p className="text-gray-700">
                  Navigate academic culture, classroom etiquette, and campus
                  life in your destination country.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-2">🌍 Cultural Insights</h3>
                <p className="text-gray-700">
                  Learn do's and don'ts, social norms, and local customs before
                  you arrive.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-2">🗣️ Real-Time Help</h3>
                <p className="text-gray-700">
                  Get instant answers to culture questions through AI-powered
                  conversations.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-2">
                  💡 Practical Scenarios
                </h3>
                <p className="text-gray-700">
                  Practice handling common situations before encountering them
                  in real life.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              How It Works
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg">Choose Your Destination</h3>
                  <p className="text-gray-700">
                    Select the country you're moving to
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg">Pick Your Path</h3>
                  <p className="text-gray-700">
                    Tell us if you're studying or working
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg">Select Your Institution</h3>
                  <p className="text-gray-700">
                    Choose your university or company
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Navigate Culture with Confidence
                  </h3>
                  <p className="text-gray-700">
                    Get personalized cultural guidance and practice scenarios
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Impulsa */}
          <section>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Why Impulsa?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Unlike generic travel guides or language apps, Impulsa focuses
              specifically on the emotional and social challenges of culture
              shock. We combine AI technology with real cultural insights to
              help you adapt faster, avoid embarrassing mistakes, and feel at
              home in your new environment.
            </p>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Team Member 1 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500">
                  <Image
                    src="/Lakshya.jpg"
                    alt="Lakshya Dhingra"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Lakshya Dhingra
                </h3>
                <p className="text-purple-600 font-semibold mb-4">
                  Full-Stack Developer
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/lakshya-dhingra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/LakshyaDhingra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500">
                  <Image
                    src="/Matt.png"
                    alt="Team Member 2"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Matthew Cruz
                </h3>
                <p className="text-purple-600 font-semibold mb-4">
                  Full-Stack Developer
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/matthewcruzv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/picfire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500">
                  <Image
                    src="/jesus.png"
                    alt="Team Member 3"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Gerardo Aguilar Roses
                </h3>
                <p className="text-purple-600 font-semibold mb-4">
                  Full-Stack Developer
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/jesusaguilar23/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/jesus-aguilar-pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to start your journey?
            </h2>
            <a
              href="/"
              className="inline-block bg-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-600 transition shadow-lg hover:shadow-xl"
            >
              Get Started with Impulsa
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
