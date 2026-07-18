import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";

export const metadata: Metadata = { title: "Hosting for Developers" };

export default function DevelopersPage() {
  return (
    <SolutionPage
      badge="💻 For Developers"
      title="Built for"
      highlight="Developers"
      description="Full API access, Git integration, Docker support, and infrastructure designed for developers who demand control."
      features={[
        { title: "Full API Access", desc: "RESTful API for complete automation of server management, deployments, and scaling.", icon: "code" },
        { title: "Docker Support", desc: "Deploy custom Docker containers directly on our infrastructure with one command.", icon: "rocket" },
        { title: "Git Integration", desc: "Push-to-deploy workflows with automatic builds from GitHub, GitLab, or Bitbucket.", icon: "code" },
        { title: "Staging Environments", desc: "Duplicate production servers instantly for safe testing of updates and changes.", icon: "shield" },
      ]}
      benefits={["Complete REST API with 99.9% endpoint availability", "SSH access with full root privileges on VPS plans", "Custom startup scripts and environment variables", "Automated backups with webhooks and API triggers", "Multi-server management from a single dashboard", "Infrastructure as Code support (Terraform coming soon)"]}
    />
  );
}
