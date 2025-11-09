"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import AnimatedContent from "@/app/components/animatedcontent";

// University data by country with logo paths
const universitiesByCountry: {
  [key: string]: Array<{
    name: string;
    rank: string;
    city: string;
    logo: string;
  }>;
} = {
  USA: [
    {
      name: "Arizona State University",
      rank: "#14",
      city: "Tempe, AZ",
      logo: "/universities/arizona-state.png",
    },
    {
      name: "Harvard University",
      rank: "#1",
      city: "Cambridge, MA",
      logo: "/universities/harvard.png",
    },
    {
      name: "Stanford University",
      rank: "#2",
      city: "Stanford, CA",
      logo: "/universities/stanford.png",
    },
    {
      name: "MIT",
      rank: "#3",
      city: "Cambridge, MA",
      logo: "/universities/mit.png",
    },
    {
      name: "Yale University",
      rank: "#4",
      city: "New Haven, CT",
      logo: "/universities/yale.png",
    },
    {
      name: "Princeton University",
      rank: "#5",
      city: "Princeton, NJ",
      logo: "/universities/princeton.png",
    },
    {
      name: "Columbia University",
      rank: "#6",
      city: "New York, NY",
      logo: "/universities/columbia.png",
    },
    {
      name: "University of Chicago",
      rank: "#7",
      city: "Chicago, IL",
      logo: "/universities/uchicago.png",
    },
    {
      name: "UC Berkeley",
      rank: "#8",
      city: "Berkeley, CA",
      logo: "/universities/berkeley.png",
    },
  ],
  UK: [
    {
      name: "University of Oxford",
      rank: "#1",
      city: "Oxford",
      logo: "/universities/oxford.png",
    },
    {
      name: "University of Cambridge",
      rank: "#2",
      city: "Cambridge",
      logo: "/universities/cambridge.png",
    },
    {
      name: "Imperial College London",
      rank: "#3",
      city: "London",
      logo: "/universities/imperial.png",
    },
    { name: "UCL", rank: "#4", city: "London", logo: "/universities/ucl.png" },
    { name: "LSE", rank: "#5", city: "London", logo: "/universities/lse.png" },
    {
      name: "University of Edinburgh",
      rank: "#6",
      city: "Edinburgh",
      logo: "/universities/edinburgh.png",
    },
    {
      name: "King's College London",
      rank: "#7",
      city: "London",
      logo: "/universities/kcl.png",
    },
    {
      name: "University of Manchester",
      rank: "#8",
      city: "Manchester",
      logo: "/universities/manchester.png",
    },
  ],
  Canada: [
    {
      name: "University of Toronto",
      rank: "#1",
      city: "Toronto",
      logo: "/universities/toronto.png",
    },
    {
      name: "UBC",
      rank: "#2",
      city: "Vancouver",
      logo: "/universities/ubc.png",
    },
    {
      name: "McGill University",
      rank: "#3",
      city: "Montreal",
      logo: "/universities/mcgill.png",
    },
    {
      name: "McMaster University",
      rank: "#4",
      city: "Hamilton",
      logo: "/universities/mcmaster.png",
    },
    {
      name: "University of Alberta",
      rank: "#5",
      city: "Edmonton",
      logo: "/universities/alberta.png",
    },
    {
      name: "University of Waterloo",
      rank: "#6",
      city: "Waterloo",
      logo: "/universities/waterloo.png",
    },
    {
      name: "Western University",
      rank: "#7",
      city: "London, ON",
      logo: "/universities/western.png",
    },
    {
      name: "Queen's University",
      rank: "#8",
      city: "Kingston",
      logo: "/universities/queens.png",
    },
  ],
  Germany: [
    {
      name: "TU Munich",
      rank: "#1",
      city: "Munich",
      logo: "/universities/tum.png",
    },
    {
      name: "LMU Munich",
      rank: "#2",
      city: "Munich",
      logo: "/universities/lmu.png",
    },
    {
      name: "Heidelberg University",
      rank: "#3",
      city: "Heidelberg",
      logo: "/universities/heidelberg.png",
    },
    {
      name: "Humboldt University",
      rank: "#4",
      city: "Berlin",
      logo: "/universities/humboldt.png",
    },
    {
      name: "RWTH Aachen",
      rank: "#5",
      city: "Aachen",
      logo: "/universities/rwth.png",
    },
    {
      name: "University of Freiburg",
      rank: "#6",
      city: "Freiburg",
      logo: "/universities/freiburg.png",
    },
    {
      name: "TU Berlin",
      rank: "#7",
      city: "Berlin",
      logo: "/universities/tuberlin.png",
    },
    {
      name: "University of Bonn",
      rank: "#8",
      city: "Bonn",
      logo: "/universities/bonn.png",
    },
  ],
  Australia: [
    {
      name: "University of Melbourne",
      rank: "#1",
      city: "Melbourne",
      logo: "/universities/melbourne.png",
    },
    {
      name: "ANU",
      rank: "#2",
      city: "Canberra",
      logo: "/universities/anu.png",
    },
    {
      name: "University of Sydney",
      rank: "#3",
      city: "Sydney",
      logo: "/universities/sydney.png",
    },
    {
      name: "UNSW Sydney",
      rank: "#4",
      city: "Sydney",
      logo: "/universities/unsw.png",
    },
    {
      name: "University of Queensland",
      rank: "#5",
      city: "Brisbane",
      logo: "/universities/queensland.png",
    },
    {
      name: "Monash University",
      rank: "#6",
      city: "Melbourne",
      logo: "/universities/monash.png",
    },
    { name: "UWA", rank: "#7", city: "Perth", logo: "/universities/uwa.png" },
    {
      name: "University of Adelaide",
      rank: "#8",
      city: "Adelaide",
      logo: "/universities/adelaide.png",
    },
  ],
  Japan: [
    {
      name: "University of Tokyo",
      rank: "#1",
      city: "Tokyo",
      logo: "/universities/tokyo.png",
    },
    {
      name: "Kyoto University",
      rank: "#2",
      city: "Kyoto",
      logo: "/universities/kyoto.png",
    },
    {
      name: "Osaka University",
      rank: "#3",
      city: "Osaka",
      logo: "/universities/osaka.png",
    },
    {
      name: "Tohoku University",
      rank: "#4",
      city: "Sendai",
      logo: "/universities/tohoku.png",
    },
    {
      name: "Nagoya University",
      rank: "#5",
      city: "Nagoya",
      logo: "/universities/nagoya.png",
    },
    {
      name: "Keio University",
      rank: "#6",
      city: "Tokyo",
      logo: "/universities/keio.png",
    },
    {
      name: "Waseda University",
      rank: "#7",
      city: "Tokyo",
      logo: "/universities/waseda.png",
    },
    {
      name: "Hokkaido University",
      rank: "#8",
      city: "Sapporo",
      logo: "/universities/hokkaido.png",
    },
  ],
  France: [
    {
      name: "École Normale Supérieure",
      rank: "#1",
      city: "Paris",
      logo: "/universities/ens.png",
    },
    {
      name: "École Polytechnique",
      rank: "#2",
      city: "Palaiseau",
      logo: "/universities/polytechnique.png",
    },
    {
      name: "Sorbonne University",
      rank: "#3",
      city: "Paris",
      logo: "/universities/sorbonne.png",
    },
    {
      name: "Université PSL",
      rank: "#4",
      city: "Paris",
      logo: "/universities/psl.png",
    },
    {
      name: "Sciences Po",
      rank: "#5",
      city: "Paris",
      logo: "/universities/sciencespo.png",
    },
    {
      name: "Université Paris-Saclay",
      rank: "#6",
      city: "Paris",
      logo: "/universities/saclay.png",
    },
  ],
  Spain: [
    {
      name: "University of Barcelona",
      rank: "#1",
      city: "Barcelona",
      logo: "/universities/barcelona.png",
    },
    {
      name: "Autonomous University of Madrid",
      rank: "#2",
      city: "Madrid",
      logo: "/universities/autonoma.png",
    },
    {
      name: "Complutense University",
      rank: "#3",
      city: "Madrid",
      logo: "/universities/complutense.png",
    },
    {
      name: "University of Valencia",
      rank: "#4",
      city: "Valencia",
      logo: "/universities/valencia.png",
    },
    {
      name: "Pompeu Fabra University",
      rank: "#5",
      city: "Barcelona",
      logo: "/universities/upf.png",
    },
    {
      name: "IE University",
      rank: "#6",
      city: "Madrid",
      logo: "/universities/ie.png",
    },
  ],
  Italy: [
    {
      name: "Sapienza University of Rome",
      rank: "#1",
      city: "Rome",
      logo: "/universities/sapienza.png",
    },
    {
      name: "University of Bologna",
      rank: "#2",
      city: "Bologna",
      logo: "/universities/bologna.png",
    },
    {
      name: "University of Milan",
      rank: "#3",
      city: "Milan",
      logo: "/universities/milan.png",
    },
    {
      name: "Politecnico di Milano",
      rank: "#4",
      city: "Milan",
      logo: "/universities/polimi.png",
    },
    {
      name: "University of Padua",
      rank: "#5",
      city: "Padua",
      logo: "/universities/padua.png",
    },
    {
      name: "University of Florence",
      rank: "#6",
      city: "Florence",
      logo: "/universities/florence.png",
    },
  ],
  "South Korea": [
    {
      name: "Seoul National University",
      rank: "#1",
      city: "Seoul",
      logo: "/universities/snu.png",
    },
    {
      name: "KAIST",
      rank: "#2",
      city: "Daejeon",
      logo: "/universities/kaist.png",
    },
    {
      name: "Yonsei University",
      rank: "#3",
      city: "Seoul",
      logo: "/universities/yonsei.png",
    },
    {
      name: "Korea University",
      rank: "#4",
      city: "Seoul",
      logo: "/universities/korea.png",
    },
    {
      name: "Sungkyunkwan University",
      rank: "#5",
      city: "Seoul",
      logo: "/universities/skku.png",
    },
    {
      name: "POSTECH",
      rank: "#6",
      city: "Pohang",
      logo: "/universities/postech.png",
    },
  ],
  Netherlands: [
    {
      name: "University of Amsterdam",
      rank: "#1",
      city: "Amsterdam",
      logo: "/universities/amsterdam.png",
    },
    {
      name: "Delft University of Technology",
      rank: "#2",
      city: "Delft",
      logo: "/universities/delft.png",
    },
    {
      name: "Utrecht University",
      rank: "#3",
      city: "Utrecht",
      logo: "/universities/utrecht.png",
    },
    {
      name: "Leiden University",
      rank: "#4",
      city: "Leiden",
      logo: "/universities/leiden.png",
    },
    {
      name: "Erasmus University",
      rank: "#5",
      city: "Rotterdam",
      logo: "/universities/erasmus.png",
    },
    {
      name: "University of Groningen",
      rank: "#6",
      city: "Groningen",
      logo: "/universities/groningen.png",
    },
  ],
  // Default for other countries - no logos needed
  Other: [
    { name: "Top University 1", rank: "#1", city: "Capital City", logo: "" },
    { name: "Top University 2", rank: "#2", city: "Major City", logo: "" },
    { name: "Top University 3", rank: "#3", city: "University Town", logo: "" },
    { name: "Top University 4", rank: "#4", city: "Coastal City", logo: "" },
    { name: "Top University 5", rank: "#5", city: "Business Hub", logo: "" },
    { name: "Top University 6", rank: "#6", city: "Historic City", logo: "" },
  ],
};

export default function UniversitySelection() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
    null
  );
  const [universities, setUniversities] = useState<
    Array<{ name: string; rank: string; city: string; logo: string }>
  >([]);

  useEffect(() => {
    // Get selected country from localStorage
    const country = localStorage.getItem("selectedCountry");
    const purposeType = localStorage.getItem("purposeType");

    if (!country || purposeType !== "study") {
      router.push("/country-selection");
      return;
    }

    setSelectedCountry(country);

    // Get universities for this country
    const countryUniversities =
      universitiesByCountry[country] || universitiesByCountry["Other"];
    setUniversities(countryUniversities);
  }, [router]);

  const handleUniversitySelect = (universityName: string) => {
    // Toggle selection - click again to deselect
    if (selectedUniversity === universityName) {
      setSelectedUniversity(null);
    } else {
      setSelectedUniversity(universityName);
    }
  };

  const handleContinue = () => {
    if (!selectedUniversity) return;

    localStorage.setItem("selectedUniversity", selectedUniversity);
    router.push("/challenges");
  };

  if (!selectedCountry) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white from-0% via-purple-50 via-50% to-purple-100 to-100% p-8">
      <AnimatedContent
        distance={50}
        direction="vertical"
        reverse={false}
        duration={1.6}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.3}
        delay={0.2}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Select Your University in {selectedCountry} 🎓
            </h1>
            <p className="text-xl text-gray-700">
              Choose from top-ranked universities
            </p>
          </div>

          {/* University Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {universities.map((university) => (
              <button
                key={university.name}
                onClick={() => handleUniversitySelect(university.name)}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-300
                  flex flex-col items-center gap-3
                  hover:scale-105 hover:shadow-xl
                  ${
                    selectedUniversity === university.name
                      ? "border-purple-500 bg-purple-50 shadow-xl scale-105"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                `}
              >
                {/* Selection checkmark */}
                {selectedUniversity === university.name && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}

                {/* University Logo or Emoji */}
                {university.logo ? (
                  <div className="w-20 h-20 relative mb-4">
                    <Image
                      src={university.logo}
                      alt={`${university.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-7xl mb-4">🎓</div>
                )}

                {/* University name */}
                <h3 className="text-lg font-bold text-gray-900 text-center">
                  {university.name}
                </h3>

                {/* Location */}
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <span>📍</span>
                  {university.city}
                </p>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <button
              onClick={handleContinue}
              disabled={!selectedUniversity}
              className={`
                w-full py-4 px-6 rounded-xl font-semibold text-white text-lg
                transition-all duration-300
                ${
                  selectedUniversity
                    ? "bg-purple-500 hover:bg-purple-600 cursor-pointer shadow-lg hover:shadow-xl"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              Continue to Challenges
            </button>
          </div>
        </div>  
      </AnimatedContent>
    </div>
  );
}
