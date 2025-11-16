import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import projects from "../projects.json";

export default function Home() {
 return (
  <div className="min-h-screen bg-gray-50 text-gray-900">
   {/* Hero Section */}
   <section
    id="hero"
    className="relative flex items-center justify-center min-h-screen bg-linear-to-br from-gray-100 to-gray-200 text-gray-900 overflow-hidden pt-16"
   >
    {/* Floating gradient bubbles */}
    <div className="absolute inset-0 overflow-hidden">
     <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
     <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-linear-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
     <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-linear-to-r from-pink-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
    <div className="relative z-10 text-center">
     <h1 className="text-5xl font-bold mb-4">Eko Supriyono</h1>
     <p className="text-xl mb-8 text-gray-600">
      Full Stack Developer | Designer | Innovator
     </p>
     <Button asChild>
      <a href="#about">Learn More</a>
     </Button>
    </div>
   </section>

   {/* About Section */}
   <section id="about" className="py-20 px-10 max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
    <Card>
     <CardContent className="pt-6">
      <p className="text-lg leading-relaxed">
       Hi, I'm Eko Supriyono, a passionate full stack developer with a love for
       creating innovative solutions. I specialize in web development, UI/UX
       design, and bringing ideas to life through code. With years of experience
       in various technologies, I strive to build user-friendly and efficient
       applications.
      </p>
     </CardContent>
    </Card>
   </section>

   {/* Skills Section */}
   <section id="skills" className="py-20 bg-gray-100 px-10">
    <div className="max-w-4xl mx-auto">
     <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Badge>JavaScript</Badge>
      <Badge>TypeScript</Badge>
      <Badge>React</Badge>
      <Badge>Next.js</Badge>
      <Badge>Node.js</Badge>
      <Badge>Python</Badge>
      <Badge>Tailwind CSS</Badge>
      <Badge>Git</Badge>
     </div>
    </div>
   </section>

   {/* Blogs Section */}
   <section id="blogs" className="py-20 px-10 max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-8 text-center">Latest Blogs</h2>
    <div className="space-y-4">
     <Card>
      <CardHeader>
       <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
       <p className="mb-4">My first blog post</p>
       <Button asChild variant="outline">
        <a href="/blogs/hello-world">Read More</a>
       </Button>
      </CardContent>
     </Card>
     <Card>
      <CardHeader>
       <CardTitle>M1: IT Enterprise</CardTitle>
      </CardHeader>
      <CardContent>
       <p className="mb-4">
        Ringkasan 7 bab utama Modul 1 yang memetakan konsep kunci dalam IT
        Enterprise.
       </p>
       <Button asChild variant="outline">
        <a href="/blogs/modul-1-it-enterprise">Read More</a>
       </Button>
      </CardContent>
     </Card>
     <Card>
      <CardHeader>
       <CardTitle>M2: Manajemen Layanan TI</CardTitle>
      </CardHeader>
      <CardContent>
       <p className="mb-4">
        Ringkasan 4 bab utama Modul 2 yang mengikuti Siklus Hidup Layanan
        (ITIL).
       </p>
       <Button asChild variant="outline">
        <a href="/blogs/modul-2-manajemen-layanan-ti">Read More</a>
       </Button>
      </CardContent>
     </Card>
    </div>
    <div className="text-center mt-8">
     <Button asChild>
      <a href="/blogs">View All Blogs</a>
     </Button>
    </div>
   </section>

   {/* Projects Section */}
   <section id="projects" className="py-20 bg-gray-100 px-10">
    <div className="max-w-4xl mx-auto">
     <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
     <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project) => (
       <Card key={project.id}>
        <CardHeader>
         <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
         <p className="mb-4">{project.description}</p>
         <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
           <Badge key={tech} variant="secondary">
            {tech}
           </Badge>
          ))}
         </div>
         <div className="flex space-x-2">
          <Button asChild size="sm">
           <a href={project.demo} target="_blank" rel="noopener noreferrer">
            View Demo
           </a>
          </Button>
          <Button asChild variant="outline" size="sm">
           <a href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub
           </a>
          </Button>
         </div>
        </CardContent>
       </Card>
      ))}
     </div>
    </div>
   </section>

   {/* Contact Section */}
   <section id="contact" className="py-20 px-10">
    <div className="max-w-4xl mx-auto text-center">
     <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
     <p className="text-lg mb-8">I'd love to hear from you. Let's connect!</p>
     <div className="flex justify-center space-x-6">
      <Button asChild>
       <a href="mailto:eko@example.com">Email</a>
      </Button>
      <Button asChild variant="outline">
       <a href="https://linkedin.com/in/eko">LinkedIn</a>
      </Button>
      <Button asChild variant="outline">
       <a href="https://github.com/eko">GitHub</a>
      </Button>
     </div>
    </div>
   </section>
  </div>
 );
}
