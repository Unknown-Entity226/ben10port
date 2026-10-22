import frontendIcon from '../assets/frontend.png';
import backendIcon from '../assets/backend.png';
import aiDataIcon from '../assets/ai.png';
import toolsIcon from '../assets/tools.png';
import coreIcon from '../assets/core.png';

export const skills = [
    {
        category: "Frontend",
        icon: frontendIcon,
        items: [
            "JavaScript (ES6+)",
            "React",
            "HTML5",
            "CSS3",
            "Tailwind CSS",
            "Figma",
        ]
    },
    {
        category: "Backend & Database",
        icon: backendIcon,
        items: [
            "Python",
            "Flask",
            "FastAPI",
            "PostgreSQL",
            "MySQL"
        ]
    },
    {
        category: "Data & AI",
        icon: aiDataIcon,
        items: [
            "Machine Learning Fundamentals",
            "OpenCV",
            "Cryptanalysis",
            // TODO(aarav): Add the specific ML libraries you used (e.g. scikit-learn, TensorFlow, PyTorch)
        ]
    },
    {
        category: "Tools & Workflows",
        icon: toolsIcon,
        items: [
            "Git & GitHub",
            "VS Code",
            "Android Studio",
            "Kotlin",
            "Tiled"
        ]
    },
    {
        category: "Core Concepts",
        icon: coreIcon,
        items: [
            "Data Structure & Algorithm",
            "Operating System",
            "DAA",
            "TOC",
            "Computer Architecture"
        ]
    }
];