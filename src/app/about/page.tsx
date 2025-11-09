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
              src="/ImpulsaLogo.png"
              alt="Impulsa Logo"
              width={200}
              height={125}
              className="object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About Impulsa
          </h1>
          <p className="text-xl text-gray-700">
            Your guide to navigating culture shock abroad
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
