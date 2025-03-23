"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Code, Mail, Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import profilePicture from "../assets/Profile.jpg"
import InsightQASnapshot from "../assets/InsightQA.jpg"
import AptiProSnapshot from "../assets/AptiPro.jpg"
import PizagoSnapshot from "../assets/Pizago.jpg"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmissionStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/xkgjrgwq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", message: "" }); 
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      setSubmissionStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 300

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Interests", id: "interests" },
    { name: "Contact", id: "contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            Azeem Pinjari
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-lg ${activeSection === item.id ? "text-primary font-medium" : "text-muted-foreground"}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`text-lg text-left py-2 ${activeSection === item.id ? "text-primary font-medium" : "text-muted-foreground"}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </button>
              ))}
              <div className="flex items-center py-2">
                <span className="text-lg mr-3">Toggle theme:</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end opacity-10 dark:opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end">
                  Azeem
                </span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-medium mb-6 text-muted-foreground">Frontend Developer</h2>
              <p className="text-xl mb-8 max-w-2xl">
                A passionate frontend developer with a Bachelor's degree in Information Technology from Fr. Conceicao
                Rodrigues Institute of Technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 transition-opacity"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Me
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("projects")}>
                  View My Work
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end p-1">
                <div className="rounded-full overflow-hidden w-full h-full">
                  <Image
                    src={profilePicture}
                    alt="Azeem Pinjari"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About/Resume Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">My Resume</h3>
              <div className="space-y-6 text-lg">
                <div>
                  <h4 className="text-xl font-semibold">Education</h4>
                  <p className="text-primary font-medium">Bachelor of Engineering in Information Technology</p>
                  <p>Fr. Conceicao Rodrigues Institute of Technology</p>
                  <p className="text-muted-foreground">Graduated 2025</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["C++", "Java", "Python", "SQL", "HTML", "CSS", "JavaScript", "React", "Next.js", "Flutter", "Git"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gradient-to-r from-gradient-start to-gradient-end text-white rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => window.open("https://drive.google.com/file/d/11XWlb-XRb4xWOD_LJYfefBCleUIGbws8/view?usp=sharing", "_blank")}>
                    <span>Download Full Resume</span>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 shadow-lg border border-primary/10"
            >
              <h3 className="text-2xl font-bold mb-6">A Bit More About Me</h3>
              <div className="space-y-4 text-lg">
                <p>
                  I'm a 20-year-old frontend developer passionate about creating beautiful, functional, and
                  user-friendly websites and applications.
                </p>
                <p>
                  My journey in web development started during my undergraduate studies, where I discovered my love for
                  turning designs into interactive experiences.
                </p>
                <p>
                  I enjoy solving complex problems and continuously learning new technologies to improve my skills and
                  stay current with industry trends.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Work Experience</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline items */}
            <div className="relative border-l-4 border-primary pl-8 ml-4 space-y-16">
              {/* Experience 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-12 w-8 h-8 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-background"></div>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-md border border-primary/10">
                  <h3 className="text-2xl font-bold">Python Developer</h3>
                  <p className="text-primary font-medium">Sysstecks Solutions LLP</p>
                  <p className="text-muted-foreground mb-4">March 2024 - April 2024</p>
                  <ul className="list-disc list-inside space-y-2 text-lg">
                    <li>Developed a suite of applications using Python</li>
                    <li>File Sharing Application, Form-to-PDF Converter, Image-to-Sketch Converter and Text-to-Speech Converter</li>
                    <li>Achieved a 20% boost in productivity and efficiency</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl overflow-hidden shadow-lg border border-transparent hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative h-56">
                <Image src={InsightQASnapshot} alt="Project 1" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">InsightQA</h3>
                <p className="text-muted-foreground mb-4">
                  InsightQA is an AI-powered question-answer generation and assessment tool that transforms text or PDF documents into descriptive question-answer pairs.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gradient-to-r from-gradient-start to-gradient-end text-white text-sm rounded-full">
                    React
                  </span>
                  <span className="px-2 py-1 bg-gradient-to-r from-gradient-start to-gradient-end text-white text-sm rounded-full">
                    Next.js
                  </span>
                  <span className="px-2 py-1 bg-gradient-to-r from-gradient-start to-gradient-end text-white text-sm rounded-full">
                    Tailwind
                  </span>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => window.open("https://github.com/InsightQA-A-Descriptive-QnA-Generator", "_blank")}>
                    <Github size={16} />
                    <span>Code</span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl overflow-hidden shadow-lg border border-transparent hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative h-56">
                <Image src={AptiProSnapshot} alt="Project 2" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">AptiPro</h3>
                <p className="text-muted-foreground mb-4">
                  A web-based application for streamlined MCQ-based assessments.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gradient-to-r from-gradient-start to-gradient-end text-white text-sm rounded-full">
                    React
                  </span>
                  <span className="px-2 py-1 bg-gradient-to-r from-gradient-start to-gradient-end text-white text-sm rounded-full">
                    MongoDB
                  </span>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => window.open("https://github.com/azeem30/AptiPro", "_blank")}>
                    <Github size={16} />
                    <span>Code</span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl overflow-hidden shadow-lg border border-transparent hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative h-56">
                <Image src={PizagoSnapshot} alt="Project 3" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Pizago</h3>
                <p className="text-muted-foreground mb-4">
                  An Android app that simulates the pizza ordering process.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gradient-to-r from-gradient-start to-gradient-end text-white text-sm rounded-full">
                    Flutter
                  </span>
                  <span className="px-2 py-1 bg-gradient-to-r from-gradient-start to-gradient-end text-white text-sm rounded-full">
                    Firebase
                  </span>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => window.open("https://github.com/azeem30/Pizago", "_blank")}>
                    <Github size={16} />
                    <span>Code</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
              onClick={() => window.open("https://github.com/azeem30", "_blank")}
            >
              <Github size={20} />
              <span>View More on GitHub</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Interests</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Interest 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg text-center border border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full flex items-center justify-center mx-auto mb-6">
                <Code size={36} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Competitive Programming</h3>
              <p className="text-lg">
                I enjoy solving algorithmic problems and participating in coding competitions on platforms like
                Codeforces.
              </p>
            </motion.div>

            {/* Interest 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg text-center border border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M2 12h20M2 12a10 10 0 0 1 20 0M2 12a10 10 0 0 0 20 0M4 4v16M20 4v16" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Web Design</h3>
              <p className="text-lg">
                I'm passionate about creating beautiful user interfaces and exploring new design trends and techniques.
              </p>
            </motion.div>

            {/* Interest 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg text-center border border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M15 4V2M15 16v-2M8 9H6M22 9h-2M19.8 5.8l-1.4-1.4M19.8 12.2l-1.4 1.4M9 15l6-6M5 19l4-4M2 22l3-3" />
              </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Artificial Intelligence</h3>
              <p className="text-lg">
                I'm interested in the upcoming technology and the applications of Artificial Intelligence for the betterment of society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full flex items-center justify-center">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="text-lg font-medium">azeempinjari30@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full flex items-center justify-center">
                      <Linkedin size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-muted-foreground">LinkedIn</p>
                      <Link href="https://linkedin.com/in/azeem-pinjari" className="text-lg font-medium hover:text-primary">
                        linkedin.com/in/azeem-pinjari
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full flex items-center justify-center">
                      <Code size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-muted-foreground">Codeforces</p>
                      <Link href="https://codeforces.com/profile/azeem" className="text-lg font-medium hover:text-primary">
                        codeforces.com/profile/azeem
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 shadow-lg border border-primary/10"
            >
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 transition-opacity"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
                {submissionStatus === "success" && (
                  <p className="text-green-500 text-center mt-2">Message sent successfully!</p>
                )}
                {submissionStatus === "error" && (
                  <p className="text-red-500 text-center mt-2">Failed to send message. Please try again.</p>
                )}
              </form>
            </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-bold">Azeem Pinjari</p>
              <p className="text-sm text-muted-foreground">Frontend Developer</p>
            </div>

            <div className="flex space-x-4">
              <Link
                href="https://github.com/azeem30"
                className="w-10 h-10 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Github size={20} className="text-white" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/azeem-pinjari"
                className="w-10 h-10 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Linkedin size={20} className="text-white" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://codeforces.com/profile/azeem"
                className="w-10 h-10 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Code size={20} className="text-white" />
                <span className="sr-only">Codeforces</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Azeem Pinjari. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}