import { Instagram, Github, Linkedin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="mt-12 pb-6 px-4">
            <div className="max-w-7xl mx-auto border-t border-border/50 pt-6">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                    {/* Copyright Text */}
                    <p className="text-muted-foreground/70 font-body text-sm">
                        © 2024 Created by <span className="font-semibold text-violet-400">Ifwad</span>. All rights reserved.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.instagram.com/mfwd.docx/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground/60 hover:text-violet-400 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="https://github.com/Iwadss"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground/60 hover:text-violet-400 transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ifwad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground/60 hover:text-violet-400 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};