import volumebooster from '../assets/volumebooster.png';
import cropguide from '../assets/cropguide.png';
import image from '../assets/image.png';
import civic from '../assets/civic.png'
import akhada from '../assets/akhada.png'
import leetcode from '../assets/leetcodeicon.png'
import crypt from "../assets/crypt.png"

export const projects = [
    {
        id: 1,
        icon: "",
        title: "AI Resume Evaluator",
        description:
            "A smart tool that analyzes resumes against job descriptions using AI to provide a compatibility score.",
        github: "https://github.com/Unknown-Entity226/ai_resume_evaluator",
        live: "https://ai-resume-evaluator-eta.vercel.app/",
        tags: ["AI", "JavaScript", "Python"],
    },
    {
        id: 2,
        icon: volumebooster,
        title: "Audio Enhancer For Firefox",
        description:
            "A professional looking audio enhancer with gain, pan and other audio controls.",
        github: "https://github.com/Unknown-Entity226/Audio-Booster-for-Firefox",
        live: "https://addons.mozilla.org/en-US/firefox/addon/audio-enhancer-for-firefox/",
        tags: ["HTML5", "CSS3", "JavaScript(ES6+)", "Web Audio API"],
    },
    {
        id: 3,
        icon: akhada,
        title: "Akhada",
        description:
            "Designed an B2B2C Kotlin app for the gym community. Integrated the app with a 2 front dashboard along with OpenCV and backing with FastAPI.",
        github: "https://github.com/Unknown-Entity226/Akhada",
        live: "",
        tags: ["Kotlin", "OpenCV", "FastAPI"],
    },
    {
        id: 4,
        // using a generic project image since a specific civic_copilot asset isn't present
        icon: civic,
        title: "Civic Complaint Co-Pilot",
        description:
            "An AI-assisted public grievance tool that helps citizens draft, classify, and direct civic complaints to the right authorities efficiently.",
        github: "https://github.com/DEADEND-47/Civic-Complaint-Copilot",
        live: "https://civic-complaint-copilot.vercel.app/",
        tags: ["AI / LLM", "React", "Python"],
    },
    {
      id: 5,
      icon: leetcode,
      title: "LeetCode Solutions",
      description: "A repository showcasing my ongoing practice of DSA in Python on LeetCode, organized by problem topic and difficulty. Solutions include explanations, approaches, and time/space complexity analysis.",
      github: "https://github.com/Unknown-Entity226/Leetcode-Solutions",
      live: "https://leetcode.com/u/unknown-entity226/",
      tags: ["Python", "DSA"],
    },
    {
        id: 6, 
        icon: crypt,
        title: "Cryptanalysis of the A5/1 Stream Cipher", 
        description:     "An academically structured research project comparing classical and ML-based cryptanalysis of the A5/1 GSM stream cipher. Implements the cipher from scratch, a guess-and-determine attack, a 1M-example synthetic dataset, and 7 ML models",
        github: "https://github.com/Unknown-Entity226/a5-1-stream-cipher", 
        live:"", 
        tags: ["Python", "Cryptanalysis","Machine Learning", "A5/1 algorithm"]
    }
];